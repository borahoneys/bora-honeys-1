"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="space-y-0 mt-8 lg:mb-16 border-t border-border">
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
    </div>
  );
};

export default ProductDescription;
