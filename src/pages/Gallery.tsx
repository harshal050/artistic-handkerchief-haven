
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

// Temporary product data
const allProducts = [
  // Wedding Collection
  {
    id: "1",
    name: "Wedding Handkerchief",
    price: 1200,
    discount: 10,
    image: "https://images.unsplash.com/photo-1606293459303-ec4d6a10b829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Wedding Collection"
  },
  {
    id: "2",
    name: "Bridal Special",
    price: 1500,
    discount: 8,
    image: "https://images.unsplash.com/photo-1631133961299-4bbfedcac74e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Wedding Collection"
  },
  // Hastmelap Handkerchief
  {
    id: "3",
    name: "Hastmelap Design",
    price: 950,
    discount: 5,
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Hastmelap Handkerchief"
  },
  {
    id: "4",
    name: "Traditional Hastmelap",
    price: 1050,
    image: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Hastmelap Handkerchief"
  },
  // Astar Part Handkerchief
  {
    id: "5",
    name: "Astar Part Special",
    price: 850,
    image: "https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Astar Part Handkerchief"
  },
  {
    id: "6",
    name: "Modern Astar Design",
    price: 950,
    discount: 12,
    image: "https://images.unsplash.com/photo-1613274554329-70f997b9d73d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Astar Part Handkerchief"
  },
  // Mindhol Handkerchief
  {
    id: "7",
    name: "Mindhol Handkerchief",
    price: 1100,
    discount: 15,
    image: "https://images.unsplash.com/photo-1517401575718-99deca622520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Mindhol Handkerchief"
  },
  {
    id: "8",
    name: "Classic Mindhol",
    price: 990,
    image: "https://images.unsplash.com/photo-1594549181132-9045fed330ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Mindhol Handkerchief"
  },
  // Chedachedi Handkerchief
  {
    id: "9",
    name: "Chedachedi Design",
    price: 880,
    discount: 7,
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Chedachedi Handkerchief"
  },
  {
    id: "10",
    name: "Premium Chedachedi",
    price: 1250,
    image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Chedachedi Handkerchief"
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

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  
  // Get category from URL if available
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);
  
  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(product => product.category === activeCategory));
    }
  }, [activeCategory]);
  
  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    setActiveCategory(category);
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
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Gallery;
