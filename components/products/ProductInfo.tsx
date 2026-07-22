"use client"
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Minus, Plus, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

interface CategoryRef { _id: string; name: string; slug: string }

interface ProductInfoProps {
  productId: string
  name: string
  price?: number
  color?: string
  styleCode?: string
  numberOfPieces?: number
  composition?: string
  collectionName?: string
  categories: CategoryRef[]
  stock: number
  whatsappNumber?: string
}

const ProductInfo = ({ productId, name, price, color, styleCode, numberOfPieces, composition, collectionName, categories, stock, whatsappNumber = "919876543210" }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const { addItem } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const primaryCategory = categories[0]

  const handleAddToBag = async () => {
    setAddError(null);
    setIsAdding(true);
    const result = await addItem(productId, quantity);
    setIsAdding(false);
    if (result.unauthorized) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (!result.ok) {
      setAddError(result.error ?? "Unable to add item to your bag.");
    }
  };

  const hasDetails = color || styleCode || numberOfPieces || composition || collectionName

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
        <div>
          {primaryCategory && (
            <p className="text-sm font-light text-muted-foreground mb-1">{primaryCategory.name}</p>
          )}
          <h1 className="text-2xl md:text-3xl font-light text-foreground">{name}</h1>
        </div>
        <div className="pt-2 flex items-baseline gap-3">
          {price != null ? (
            <p className="text-lg font-light text-foreground">₹{price.toLocaleString('en-IN')}</p>
          ) : (
            <p className="text-lg font-light text-muted-foreground">Price on Request</p>
          )}
        </div>
      </div>

      {/* Product quick details */}
      {hasDetails && (
        <div className="space-y-2 py-4 border-b border-border">
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
          {collectionName && (
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Collection</span>
              <span className="text-sm font-light text-foreground">{collectionName}</span>
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
          disabled={stock === 0 || isAdding}
          onClick={handleAddToBag}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none disabled:opacity-40"
        >
          {stock === 0 ? 'Out of Stock' : isAdding ? 'Adding…' : 'Add to Bag'}
        </Button>

        {addError && (
          <p className="text-xs text-destructive">{addError}</p>
        )}

        <Button
          asChild
          variant="outline"
          className="w-full h-12 font-light rounded-none border-foreground text-foreground hover:bg-foreground/5"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${encodeURIComponent(name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Message on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
