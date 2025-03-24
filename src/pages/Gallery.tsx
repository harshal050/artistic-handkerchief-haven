
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";

// Temporary product data
const allProducts = [
  // Wedding Collection
  {
    id: "1",
    name: "Wedding Handkerchief",
    price: 1200,
    discount: 10,
    image: "https://images.unsplash.com/photo-1606293459303-ec4d6a10b829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Wedding Collection",
    rating: 4.7,
    reviewCount: 12
  },
  {
    id: "2",
    name: "Bridal Special",
    price: 1500,
    discount: 8,
    image: "https://images.unsplash.com/photo-1631133961299-4bbfedcac74e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Wedding Collection",
    rating: 4.2,
    reviewCount: 8
  },
  // Hastmelap Handkerchief
  {
    id: "3",
    name: "Hastmelap Design",
    price: 950,
    discount: 5,
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Hastmelap Handkerchief",
    rating: 4.5,
    reviewCount: 10
  },
  {
    id: "4",
    name: "Traditional Hastmelap",
    price: 1050,
    image: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Hastmelap Handkerchief",
    rating: 4.8,
    reviewCount: 15
  },
  // Astar Part Handkerchief
  {
    id: "5",
    name: "Astar Part Special",
    price: 850,
    image: "https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Astar Part Handkerchief",
    rating: 4.3,
    reviewCount: 7
  },
  {
    id: "6",
    name: "Modern Astar Design",
    price: 950,
    discount: 12,
    image: "https://images.unsplash.com/photo-1613274554329-70f997b9d73d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Astar Part Handkerchief",
    rating: 4.1,
    reviewCount: 9
  },
  // Mindhol Handkerchief
  {
    id: "7",
    name: "Mindhol Handkerchief",
    price: 1100,
    discount: 15,
    image: "https://images.unsplash.com/photo-1517401575718-99deca622520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Mindhol Handkerchief",
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: "8",
    name: "Classic Mindhol",
    price: 990,
    image: "https://images.unsplash.com/photo-1594549181132-9045fed330ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Mindhol Handkerchief",
    rating: 4.6,
    reviewCount: 11
  },
  // Chedachedi Handkerchief
  {
    id: "9",
    name: "Chedachedi Design",
    price: 880,
    discount: 7,
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Chedachedi Handkerchief",
    rating: 4.4,
    reviewCount: 13
  },
  {
    id: "10",
    name: "Premium Chedachedi",
    price: 1250,
    image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Chedachedi Handkerchief",
    rating: 4.7,
    reviewCount: 14
  },
];

const categories = [
  "All",
  "Wedding Collection",
  "Hastmelap Handkerchief",
  "Astar Part Handkerchief",
  "Mindhol Handkerchief",
  "Chedachedi Handkerchief"
];

const priceRanges = [
  { label: "All Prices", min: 0, max: 9999999 },
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 - ₹1,500", min: 1000, max: 1500 },
  { label: "Over ₹1,500", min: 1501, max: 9999999 }
];

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(priceRanges[0]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("featured"); // featured, price-low-high, price-high-low, rating
  
  // Get category from URL if available
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);
  
  // Filter products when category/filters change
  useEffect(() => {
    let result = allProducts;
    
    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Apply price range filter
    result = result.filter(product => {
      const discountedPrice = product.discount 
        ? product.price - (product.price * product.discount / 100) 
        : product.price;
      
      return discountedPrice >= activePriceRange.min && discountedPrice <= activePriceRange.max;
    });
    
    // Apply discount filter
    if (showDiscount) {
      result = result.filter(product => product.discount);
    }
    
    // Apply search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercasedSearch) || 
        product.category.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result = [...result].sort((a, b) => {
          const aPrice = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const bPrice = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return aPrice - bPrice;
        });
        break;
      case "price-high-low":
        result = [...result].sort((a, b) => {
          const aPrice = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const bPrice = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return bPrice - aPrice;
        });
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default: // featured - no sorting
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategory, activePriceRange, showDiscount, searchTerm, sortBy]);
  
  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    setActiveCategory(category);
  };
  
  const resetFilters = () => {
    setActivePriceRange(priceRanges[0]);
    setShowDiscount(false);
    setSortBy("featured");
    setSearchTerm("");
    setActiveCategory("All");
    setSearchParams({});
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <WhatsAppButton />
      
      {/* Gallery Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Product Gallery</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of handcrafted handkerchiefs and fabric paintings. Each piece is uniquely designed and meticulously created by artist Krishna Chhayani.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search & Filter Bar */}
      <section className="pb-6">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={16} />
              <span>Filters</span>
            </Button>
            <div className="hidden sm:block">
              <select 
                className="h-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="pb-8">
        <div className="container-custom">
          <div className="flex items-center justify-center flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Active Filters */}
      {(activePriceRange !== priceRanges[0] || showDiscount || sortBy !== "featured" || searchTerm) && (
        <section className="pb-4">
          <div className="container-custom">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {activePriceRange !== priceRanges[0] && (
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">
                  {activePriceRange.label}
                </span>
              )}
              
              {showDiscount && (
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">
                  Discounted Items
                </span>
              )}
              
              {sortBy !== "featured" && (
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">
                  Sorted by: {sortBy === "price-low-high" ? "Price (Low to High)" : 
                             sortBy === "price-high-low" ? "Price (High to Low)" : "Rating"}
                </span>
              )}
              
              {searchTerm && (
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">
                  Search: "{searchTerm}"
                </span>
              )}
              
              <button 
                onClick={resetFilters}
                className="text-xs text-primary hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          </div>
        </section>
      )}
      
      {/* Product Gallery */}
      <section className="py-8 flex-grow">
        <div className="container-custom">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  image={product.image}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Filter Sheet */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="priceRange" 
                      checked={activePriceRange === range}
                      onChange={() => setActivePriceRange(range)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Discount Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3">Discounts</h3>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={showDiscount}
                  onChange={() => setShowDiscount(!showDiscount)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">Show discounted items only</span>
              </label>
            </div>
            
            {/* Sort By Options */}
            <div>
              <h3 className="text-sm font-medium mb-3">Sort By</h3>
              <select 
                className="w-full p-2 border border-input rounded-md bg-background"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          <SheetFooter>
            <Button variant="outline" onClick={resetFilters}>Reset All</Button>
            <SheetClose asChild>
              <Button>Apply Filters</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      <Footer />
    </div>
  );
};

export default Gallery;
