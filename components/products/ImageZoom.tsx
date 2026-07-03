"use client"
import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageZoomProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

const ImageZoom = ({ images, initialIndex, isOpen, onClose }: ImageZoomProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % images.length) + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const nextImage = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prevImage = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      resetZoom();
    }
  }, [isOpen, initialIndex, resetZoom]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") nextImage();
      else if (event.key === "ArrowLeft") prevImage();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, nextImage, prevImage]);

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const zoomIn = () => setScale(prev => clampScale(prev + 0.5));
  const zoomOut = () => setScale(prev => {
    const next = clampScale(prev - 0.5);
    if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
    return next;
  });

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.5);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const offsetX = (rect.width / 2 - (e.clientX - rect.left)) * 1.5;
        const offsetY = (rect.height / 2 - (e.clientY - rect.top)) * 1.5;
        setPosition({ x: offsetX, y: offsetY });
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale(prev => {
      const next = clampScale(prev - e.deltaY * 0.01);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    positionStart.current = position;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      x: positionStart.current.x + (e.clientX - dragStart.current.x),
      y: positionStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const stopDragging = () => { isDragging.current = false; };

  const getTouchDistance = (touches: React.TouchList) => {
    const [t1, t2] = [touches[0], touches[1]];
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchStartDistance.current = getTouchDistance(e.touches);
      pinchStartScale.current = scale;
    } else if (e.touches.length === 1) {
      if (scale > 1) {
        isDragging.current = true;
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        positionStart.current = position;
      } else {
        touchStartX.current = e.touches[0].clientX;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistance.current) {
      const distance = getTouchDistance(e.touches);
      const nextScale = clampScale(pinchStartScale.current * (distance / pinchStartDistance.current));
      setScale(nextScale);
    } else if (e.touches.length === 1 && isDragging.current) {
      setPosition({
        x: positionStart.current.x + (e.touches[0].clientX - dragStart.current.x),
        y: positionStart.current.y + (e.touches[0].clientY - dragStart.current.y),
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      isDragging.current = false;
      pinchStartDistance.current = null;
      if (scale === MIN_SCALE) setPosition({ x: 0, y: 0 });

      if (touchStartX.current !== null && scale <= 1) {
        const touchEndX = e.changedTouches[0]?.clientX ?? touchStartX.current;
        const difference = touchStartX.current - touchEndX;
        if (Math.abs(difference) > 50) difference > 0 ? nextImage() : prevImage();
      }
      touchStartX.current = null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black/80 text-white border border-white/40 rounded-full p-2 shadow-lg"
      >
        <X className="h-8 w-8" />
      </Button>

      {/* Zoom controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 border border-white/40 rounded-full px-3 py-2 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          className="text-white hover:bg-white/10 rounded-full p-2 disabled:opacity-40"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <span className="text-white text-sm w-12 text-center select-none">{Math.round(scale * 100)}%</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          className="text-white hover:bg-white/10 rounded-full p-2 disabled:opacity-40"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
      </div>

      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white border border-white/40 rounded-full p-2 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white border border-white/40 rounded-full p-2 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden select-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="h-full w-full shrink-0 flex justify-center items-center px-4">
              <img
                src={image}
                alt={`Product view ${index + 1}`}
                draggable={false}
                onDoubleClick={handleDoubleClick}
                className={`max-w-full max-h-full object-contain transition-transform duration-150 ${
                  index === activeIndex && scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                }`}
                style={
                  index === activeIndex
                    ? { transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)` }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
