"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

interface CategoryRef { _id: string; name: string; slug: string }

interface ProductInfoProps {
  name: string
  price: number
  compareAtPrice?: number
  material?: string
  dimensions?: string
  weight?: string
  editorsNote?: string
  categories: CategoryRef[]
  stock: number
}

const ProductInfo = ({ name, price, compareAtPrice, material, dimensions, weight, editorsNote, categories, stock }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const primaryCategory = categories[0]

  return (
    <div className="space-y-6">
      {/* Breadcrumb - desktop only */}
      <div className="hidden lg:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {primaryCategory ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/category/${primaryCategory.slug}`}>{primaryCategory.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link href="/products">Products</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title and price */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            {primaryCategory && (
              <p className="text-sm font-light text-muted-foreground mb-1">{primaryCategory.name}</p>
            )}
            <h1 className="text-2xl md:text-3xl font-light text-foreground">{name}</h1>
          </div>
          <div className="text-right">
            <p className="text-xl font-light text-foreground">€{price.toLocaleString()}</p>
            {compareAtPrice && (
              <p className="text-sm font-light text-muted-foreground line-through">€{compareAtPrice.toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      {(material || dimensions || weight || editorsNote) && (
        <div className="space-y-4 py-4 border-b border-border">
          {material && (
            <div className="space-y-2">
              <h3 className="text-sm font-light text-foreground">Material</h3>
              <p className="text-sm font-light text-muted-foreground">{material}</p>
            </div>
          )}
          {dimensions && (
            <div className="space-y-2">
              <h3 className="text-sm font-light text-foreground">Dimensions</h3>
              <p className="text-sm font-light text-muted-foreground">{dimensions}</p>
            </div>
          )}
          {weight && (
            <div className="space-y-2">
              <h3 className="text-sm font-light text-foreground">Weight</h3>
              <p className="text-sm font-light text-muted-foreground">{weight}</p>
            </div>
          )}
          {editorsNote && (
            <div className="space-y-2">
              <h3 className="text-sm font-light text-foreground">Editor's notes</h3>
              <p className="text-sm font-light text-muted-foreground italic">"{editorsNote}"</p>
            </div>
          )}
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        {stock === 0 ? (
          <p className="text-sm font-light text-destructive">Out of stock</p>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm font-light text-foreground">Quantity</span>
            <div className="flex items-center border border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="h-10 flex items-center px-4 text-sm font-light min-w-12 justify-center border-l border-r border-border">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(prev => Math.min(stock, prev + 1))}
                className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Button
          disabled={stock === 0}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none disabled:opacity-40"
        >
          {stock === 0 ? 'Out of Stock' : 'Add to Bag'}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
