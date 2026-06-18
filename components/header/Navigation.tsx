"use client"
import { ArrowRight, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShoppingBag from "./ShoppingBag";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [offCanvasType, setOffCanvasType] = useState<'favorites' | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shopping bag state with 3 mock items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Pantheon",
      price: "€2,850",
      image: "/placeholder-image.png",
      quantity: 1,
      category: "Earrings"
    },
    {
      id: 2,
      name: "Eclipse",
      price: "€3,200",
      image: "/placeholder-image.png",
      quantity: 1,
      category: "Bracelets"
    },
    {
      id: 3,
      name: "Halo",
      price: "€1,950",
      image: "/placeholder-image.png",
      quantity: 1,
      category: "Earrings"
    }
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Preload dropdown images for faster display
  useEffect(() => {
    const imagesToPreload = [
      "/rings-collection.png",
      "/earrings-collection.png",
      "/arcus-bracelet.png",
      "/span-bracelet.png",
      "/founders.png"
    ];

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const popularSearches = [
    "Gold Rings",
    "Silver Necklaces",
    "Pearl Earrings",
    "Designer Bracelets",
    "Wedding Rings",
    "Vintage Collection"
  ];

  const navItems = [
    {
      name: "Home",
      href: "/",
      submenuItems: [],
      images: [],
    },
    {
      name: "About Us",
      href: "/about-us",
      submenuItems: [],
      images: [],
    },
    {
      name: "Women",
      href: "/women",
      submenuItems: [],
      images: [],
    },
    {
      name: "Categories / Silhouettes",
      href: "/categories",
      submenuItems: [
        {
          name: "Flaired Lehngas Sets",
          href: "/categories/flaired-lehngas-sets",
        },
        {
          name: "Mermaid Lehngas Sets",
          href: "/categories/mermaid-lehngas-sets",
        },
        {
          name: "Fish Cut Lehnga Sets",
          href: "/categories/fish-cut-lehnga-sets",
        },
        {
          name: "Straight Cut Lehnga Sets",
          href: "/categories/straight-cut-lehnga-sets",
        },
        {
          name: "Gowns",
          href: "/categories/gowns",
        },
        {
          name: "Co-Ord Sets",
          href: "/categories/co-ord-sets",
        },
      ],
      images: [],
    },
    {
      name: "Men",
      href: "/men",
      submenuItems: [],
      images: [],
    },
    {
      name: "Collections",
      href: "/collections",
      submenuItems: [
        { name: "Collection 2022", href: "/collections/2022" },
        { name: "Collection 2023", href: "/collections/2023" },
        { name: "Collection 2024", href: "/collections/2024" },
        { name: "Collection 2025", href: "/collections/2025" },
        { name: "Collection 2026", href: "/collections/2026" },
      ],
      images: [],
    },
    {
      name: "Contact Us / Payment",
      href: "/contact-us",
      submenuItems: [
        {
          name: "Client Information Form",
          href: "/contact-us#form",
        },
        {
          name: "Phone Number",
          href: "/contact-us#phone",
        },
        {
          name: "Email",
          href: "/contact-us#email",
        },
      ],
      images: [],
    },
    {
      name: "Terms & Policies",
      href: "/terms-and-policies",
      submenuItems: [],
      images: [],
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${isScrolled ? "bg-background/60 backdrop-blur-sm" : "bg-transparent"}`}>
      {/* Mobile layout: absolute positioned elements */}
      <div className="lg:hidden flex items-center justify-between h-16 px-6 relative">
        {/* Mobile hamburger button */}
        <button
          className="p-2 mt-0.5 text-foreground hover:text-primary transition-colors duration-200 relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 relative">
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1.5'
              }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 top-2.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-3.5'
              }`}></span>
          </div>
        </button>

        {/* Centered logo on mobile */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="block">
            <img
              src="/logo.png"
              alt="Bora Honey's"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Right icons on mobile */}
        <div className="flex items-center space-x-2 relative z-10">
          <button
            className="p-2 text-foreground hover:text-primary transition-colors duration-200"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button
            className="p-2 text-foreground hover:text-primary transition-colors duration-200 relative"
            aria-label="Shopping bag"
            onClick={() => setIsShoppingBagOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-30%] text-[0.5rem] font-semibold text-primary-foreground pointer-events-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex items-center justify-start h-16 px-12">
        {/* Logo - Left */}
        <div className="shrink-0 mr-16">
          <Link href="/" className="block">
            <img
              src="/logo.png"
              alt="Bora Honey's"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Center navigation */}
        <div className="flex flex-1 justify-center space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="text-foreground uppercase hover:text-primary transition-colors duration-200 text-xs font-light py-6 block"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-2 ml-8">
          <button
            className="p-2 text-foreground hover:text-primary transition-colors duration-200"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button
            className="p-2 text-foreground hover:text-primary transition-colors duration-200 relative"
            aria-label="Shopping bag"
            onClick={() => setIsShoppingBagOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-30%] text-[0.5rem] font-semibold text-primary-foreground pointer-events-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Full width dropdown */}
      {activeDropdown && navItems.find(item => item.name === activeDropdown)?.submenuItems.length ? (
        <div
          className={`
    absolute top-full left-0 right-0
    bg-foreground text-background border-b border-border z-40
    animate-in fade-in slide-in-from-top-2 duration-300 ease-out
  `}
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8">
            <div className="flex justify-between w-full">
              {/* Left side - Menu items */}
              <div className="flex-1">
                <ul className="space-y-2">
                  {navItems
                    .find(item => item.name === activeDropdown)
                    ?.submenuItems.map((subItem, index) => (
                      <li key={index}>
                        <Link
                          href={subItem.href}
                          className="text-background uppercase hover:text-primary transition-colors duration-200 text-sm font-light block py-2"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Right side - Images */}
              <div className="flex space-x-6">
                {navItems
                  .find(item => item.name === activeDropdown)
                  ?.images?.map((image: any, index) => (
                    <Link
                      key={index}
                      href={image.href}
                      className="w-96 h-72 cursor-pointer group relative overflow-hidden block"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                      />
                      <div className="absolute bottom-2 left-2 text-white text-xs font-light flex items-center gap-1">
                        <span>{image.label}</span>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Search overlay */}
      {isSearchOpen && (
        <div
          className={`
    absolute top-full left-0 right-0
    bg-card border-b border-border z-40
    animate-in fade-in slide-in-from-top-2 duration-300 ease-out
  `}
        >
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Search input */}
              <div className="relative mb-8">
                <div className="flex items-center border-b border-border pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-nav-foreground mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for jewelry..."
                    className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg"
                    autoFocus
                  />
                </div>
              </div>

              {/* Popular searches */}
              <div>
                <h3 className="text-nav-foreground text-sm font-light mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="text-foreground hover:text-primary text-sm font-light py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-nav-hover"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile navigation menu - slide from left */}
      <div
        className={`
          lg:hidden fixed top-0 left-0 h-screen w-6/7 max-w-sm
          z-50 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ backgroundColor: '#f0ebe3' }}
      >
        {/* Close button */}
        <div className="flex items-center h-14 px-6">
          <button
            className="transition-opacity duration-200 hover:opacity-60"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ color: '#6a8a8a' }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav items */}
        <div className="px-6">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.submenuItems && item.submenuItems.length > 0 ? (
                <div>
                  <button
                    className="w-full flex items-center text-background text-base justify-between py-4 uppercase transition-opacity duration-200 hover:opacity-60"
                    onClick={() => setOpenAccordion(openAccordion === item.name ? null : item.name)}
                  >
                    <span>{item.name}</span>
                    <Plus
                      size={14}
                      strokeWidth={1.5}
                      className={`shrink-0 transition-transform duration-300 ${openAccordion === item.name ? 'rotate-45' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === item.name ? 'max-h-96 pb-3' : 'max-h-0'
                      }`}
                  >
                    <div className="pl-3 space-y-0">
                      {item.submenuItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block py-2 text-background/60 text-xs font-semibold uppercase transition-opacity duration-200 hover:opacity-60"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block py-4 text-background text-lg uppercase transition-opacity duration-200 hover:opacity-60"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
              <div style={{ borderBottom: '1px solid #e0d8ce' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Bag Component */}
      <ShoppingBag
        isOpen={isShoppingBagOpen}
        onClose={() => setIsShoppingBagOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        onViewFavorites={() => {
          setIsShoppingBagOpen(false);
          setOffCanvasType('favorites');
        }}
      />

    </nav>
  );
};

export default Navigation;