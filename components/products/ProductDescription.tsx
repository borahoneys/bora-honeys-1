"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewProduct from "./ReviewProduct";

const CustomStar = ({ filled, className }: { filled: boolean; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-3 h-3 ${filled ? 'text-foreground' : 'text-muted-foreground/30'} ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
      clipRule="evenodd"
    />
  </svg>
);

interface ProductDescriptionProps {
  description?: string
  sku?: string
  keyFeatures?: string
  careInstructions?: string
  deliveryTimeline?: string
  silhouette?: string
  craftsmanship?: string
  perfectFor?: string
  bespokeCustomisation?: string
  collectionName?: string
  collectionStory?: string
}

const BulletSection = ({
  title, items, isOpen, onToggle, emptyLabel,
}: { title: string; items: string; isOpen: boolean; onToggle: () => void; emptyLabel: string }) => (
  <div className="border-b border-border">
    <Button
      variant="ghost"
      onClick={onToggle}
      className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
    >
      <span>{title}</span>
      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
    {isOpen && (
      <div className="pb-6">
        {items ? (
          <ul className="space-y-2">
            {items.split('\n').filter(Boolean).map((line, i) => (
              <li key={i} className="text-sm font-light text-foreground flex gap-2">
                <span className="shrink-0">•</span>
                <span>{line.replace(/^[•\-]\s*/, '')}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm font-light text-muted-foreground/50 italic">{emptyLabel}</p>
        )}
      </div>
    )}
  </div>
)

const ProductDescription = ({
  description, sku, keyFeatures, careInstructions, deliveryTimeline,
  silhouette, craftsmanship, perfectFor, bespokeCustomisation, collectionName, collectionStory,
}: ProductDescriptionProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isSilhouetteOpen, setIsSilhouetteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCraftsmanshipOpen, setIsCraftsmanshipOpen] = useState(false);
  const [isPerfectForOpen, setIsPerfectForOpen] = useState(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  return (
    <div className="space-y-0 mt-8 border-t border-border">
      {/* Description */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Description</span>
          {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDescriptionOpen && (
          <div className="pb-6">
            {description ? (
              <p className="text-sm font-light text-foreground leading-relaxed whitespace-pre-line">
                {description}
              </p>
            ) : (
              <p className="text-sm font-light text-muted-foreground/50 italic">No description available.</p>
            )}
          </div>
        )}
      </div>

      {/* Silhouette */}
      {silhouette && (
        <BulletSection
          title="Silhouette"
          items={silhouette}
          isOpen={isSilhouetteOpen}
          onToggle={() => setIsSilhouetteOpen(!isSilhouetteOpen)}
          emptyLabel="No silhouette details available."
        />
      )}

      {/* Product Details / Key Features */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Product Details</span>
          {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDetailsOpen && (
          <div className="pb-6 space-y-3">
            {sku && (
              <div className="flex justify-between">
                <span className="text-sm font-light text-muted-foreground">Style Code</span>
                <span className="text-sm font-light text-foreground">{sku}</span>
              </div>
            )}
            {keyFeatures ? (
              <ul className="space-y-2 mt-1">
                {keyFeatures.split('\n').filter(Boolean).map((line, i) => (
                  <li key={i} className="text-sm font-light text-foreground flex gap-2">
                    <span className="shrink-0">•</span>
                    <span>{line.replace(/^[•\-]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-light text-muted-foreground/50 italic">No product details available.</p>
            )}
          </div>
        )}
      </div>

      {/* Craftsmanship */}
      {craftsmanship && (
        <BulletSection
          title="Craftsmanship"
          items={craftsmanship}
          isOpen={isCraftsmanshipOpen}
          onToggle={() => setIsCraftsmanshipOpen(!isCraftsmanshipOpen)}
          emptyLabel="No craftsmanship details available."
        />
      )}

      {/* Perfect For */}
      {perfectFor && (
        <BulletSection
          title="Perfect For"
          items={perfectFor}
          isOpen={isPerfectForOpen}
          onToggle={() => setIsPerfectForOpen(!isPerfectForOpen)}
          emptyLabel="No occasion details available."
        />
      )}

      {/* Bespoke Customisation */}
      {bespokeCustomisation && (
        <div className="border-b border-border">
          <Button
            variant="ghost"
            onClick={() => setIsBespokeOpen(!isBespokeOpen)}
            className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
          >
            <span>Bespoke Customisation</span>
            {isBespokeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {isBespokeOpen && (
            <div className="pb-6">
              <p className="text-sm font-light text-foreground leading-relaxed whitespace-pre-line">
                {bespokeCustomisation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Care Instructions */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsCareOpen(!isCareOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Care Instructions</span>
          {isCareOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isCareOpen && (
          <div className="pb-6">
            {careInstructions ? (
              <ul className="space-y-2">
                {careInstructions.split('\n').filter(Boolean).map((line, i) => (
                  <li key={i} className="text-sm font-light text-foreground flex gap-2">
                    <span className="shrink-0">•</span>
                    <span>{line.replace(/^[•\-]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-light text-muted-foreground/50 italic">No care instructions available.</p>
            )}
          </div>
        )}
      </div>

      {/* Delivery Timeline */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Delivery Timeline</span>
          {isDeliveryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDeliveryOpen && (
          <div className="pb-6">
            {deliveryTimeline ? (
              <ul className="space-y-2">
                {deliveryTimeline.split('\n').filter(Boolean).map((line, i) => (
                  <li key={i} className="text-sm font-light text-foreground flex gap-2">
                    <span className="shrink-0">•</span>
                    <span>{line.replace(/^[•\-]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-light text-muted-foreground/50 italic">No delivery information available.</p>
            )}
          </div>
        )}
      </div>

      {/* Collection Story */}
      {collectionStory && (
        <div className="border-b border-border">
          <Button
            variant="ghost"
            onClick={() => setIsStoryOpen(!isStoryOpen)}
            className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
          >
            <span>{collectionName ? `Discover ${collectionName}` : 'The Collection'}</span>
            {isStoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {isStoryOpen && (
            <div className="pb-6">
              <p className="text-sm font-light text-foreground leading-relaxed whitespace-pre-line">
                {collectionStory}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Customer Reviews */}
      <div className="border-b border-border lg:mb-16">
        <Button
          variant="ghost"
          onClick={() => setIsReviewsOpen(!isReviewsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <div className="flex items-center gap-3">
            <span>Customer Reviews</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <CustomStar key={star} filled={star <= 4.8} />
              ))}
              <span className="text-sm font-light text-foreground ml-1">4.8</span>
            </div>
          </div>
          {isReviewsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isReviewsOpen && (
          <div className="pb-6 space-y-6">
            <ReviewProduct />
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CustomStar key={star} filled={true} />
                    ))}
                  </div>
                  <span className="text-sm font-light text-foreground">Sarah M.</span>
                </div>
                <p className="text-sm font-light text-foreground leading-relaxed">
                  "Absolutely stunning! The quality is exceptional and the craftsmanship is breathtaking.
                  I received so many compliments at the event."
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CustomStar key={star} filled={star <= 4} />
                    ))}
                  </div>
                  <span className="text-sm font-light text-foreground">Emma T.</span>
                </div>
                <p className="text-sm font-light text-foreground leading-relaxed">
                  "Beautiful craftsmanship and the fit was perfect. The embroidery work is incredibly detailed. Highly recommend!"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
