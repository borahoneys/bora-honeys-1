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
  color?: string
  styleCode?: string
  numberOfPieces?: number
  composition?: string
  categories: CategoryRef[]
  stock: number
}

const ProductInfo = ({ name, price, compareAtPrice, color, styleCode, numberOfPieces, composition, categories, stock }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const primaryCategory = categories[0]

  const hasDetails = color || styleCode || numberOfPieces || composition

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
            <p className="text-xl font-light text-foreground">₹{price.toLocaleString('en-IN')}</p>
            {compareAtPrice && (
              <p className="text-sm font-light text-muted-foreground line-through">₹{compareAtPrice.toLocaleString('en-IN')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Product quick details */}
      {hasDetails && (
        <div className="space-y-2 py-4 border-b border-border">
          {styleCode && (
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Style Code</span>
              <span className="text-sm font-light text-foreground">{styleCode}</span>
            </div>
          )}
          {color && (
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Colour</span>
              <span className="text-sm font-light text-foreground">{color}</span>
            </div>
          )}
          {numberOfPieces && (
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">No. of Pieces</span>
              <span className="text-sm font-light text-foreground">{numberOfPieces}</span>
            </div>
          )}
          {composition && (
            <div className="flex justify-between gap-8">
              <span className="text-sm font-light text-muted-foreground shrink-0">Includes</span>
              <span className="text-sm font-light text-foreground text-right">{composition}</span>
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
