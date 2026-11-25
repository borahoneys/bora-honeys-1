"use client"
import { useState, useRef } from "react";
import ImageZoom from "./ImageZoom";
import SmartImage from "@/components/ui/SmartImage";

interface Props {
  images: string[]
  altText?: string
}

const ProductImageGallery = ({ images, altText }: Props) => {
  const displayImages = images.length > 0 ? images : ['/placeholder-image.png']
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomInitialIndex, setZoomInitialIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % displayImages.length)
  const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + displayImages.length) % displayImages.length)

  const handleImageClick = (index: number) => {
    setZoomInitialIndex(index);
    setIsZoomOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX }
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) difference > 0 ? nextImage() : prevImage()
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full">
      {/* Desktop: Vertical scrolling gallery */}
      <div className="hidden lg:block">
        <div className="space-y-4">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-square overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <SmartImage
                src={image}
                fill
                sizes="50vw"
                priority={index === 0}
                alt={altText ? `${altText}, view ${index + 1}` : `Product view ${index + 1}`}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet/Mobile: Image slider */}
      <div className="lg:hidden">
        <div className="relative">
          <div
            className="relative w-full h-[80vh] overflow-hidden cursor-pointer group touch-pan-y"
            onClick={() => handleImageClick(currentImageIndex)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <SmartImage
              key={currentImageIndex}
              src={displayImages[currentImageIndex]}
              fill
              sizes="100vw"
              priority={currentImageIndex === 0}
              alt={altText ? `${altText}, view ${currentImageIndex + 1}` : `Product view ${currentImageIndex + 1}`}
              className="object-contain transition-transform duration-300 group-hover:scale-105 select-none"
            />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-foreground' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ImageZoom
        images={displayImages}
        initialIndex={zoomInitialIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
};

export default ProductImageGallery;
