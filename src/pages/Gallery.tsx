
import { useState, useEffect } from "react";
import { Layout, LayoutHeader, LayoutContent } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
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
import { useDatabase } from "@/context/DatabaseContext";
import { Skeleton } from "@/components/ui/skeleton";

const priceRanges = [
  { label: "All Prices", min: 0, max: 9999999 },
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 - ₹1,500", min: 1000, max: 1500 },
  { label: "Over ₹1,500", min: 1501, max: 9999999 }
];

const Gallery = () => {
  const { products, categories: dbCategories, loading } = useDatabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(priceRanges[0]);
  const [filteredProducts, setFilteredProducts] = useState(products);
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
    if (!products) return;
    
    let result = [...products];
    
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
        // In the real app, we would sort by actual ratings
        // For now, we'll just use a simple sort
        result = [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // featured - no sorting
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategory, activePriceRange, showDiscount, searchTerm, sortBy, products]);
  
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

  // Add "All" to categories
  const categories = ["All", ...(dbCategories?.map(c => c.name) || [])];
  
  return (
    <Layout>
      {/* Gallery Header */}
      <LayoutHeader
        title="Product Gallery"
        description="Browse our collection of handcrafted handkerchiefs and fabric paintings. Each piece is uniquely designed and meticulously created by artist Krishna Chhayani."
      />
      
      {/* Search & Filter Bar */}
      <LayoutContent>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch mb-6">
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
      
        {/* Category Filters */}
        <div className="mb-8">
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
      
        {/* Active Filters */}
        {(activePriceRange !== priceRanges[0] || showDiscount || sortBy !== "featured" || searchTerm) && (
          <div className="mb-6">
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
        )}
      
        {/* Product Gallery */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id?.toString()}
                id={product._id?.toString() || ""}
                name={product.name}
                price={product.price}
                discount={product.discount}
                image={product.images[0]}
                rating={4.5} // We'll implement actual ratings in the future
                reviewCount={10} // We'll implement actual review counts in the future
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
      </LayoutContent>
      
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
    </Layout>
  );
};

export default Gallery;
