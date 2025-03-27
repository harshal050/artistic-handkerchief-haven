
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDatabase } from "@/context/DatabaseContext";

const Index = () => {
  const { products, categories, settings, loading } = useDatabase();
  
  // Get up to 4 featured products
  const featuredProducts = products.slice(0, 4);
  
  // Extract unique category names
  const categoryNames = categories.map(cat => cat.name);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <img 
              src={settings?.logo || "/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png"}
              alt={`${settings?.siteName || 'RK.Creation'} Logo`} 
              className="w-24 h-24 md:w-32 md:h-32 mb-6"
            />
            <h1 className="heading-xl mb-4 text-balance">
              Handcrafted Elegance
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
              Exquisite custom handkerchiefs and fabric paintings for your special moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/gallery"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              >
                Explore Collection
              </Link>
              <Link 
                to="/about"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              >
                About the Artist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-secondary/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-md">Featured Creations</h2>
            <Link 
              to="/gallery"
              className="text-sm font-medium flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    discount={product.discount}
                    image={product.images[0]}
                  />
                ))
              ) : (
                <div className="col-span-4 text-center py-8">
                  No products available. Check back soon!
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="heading-md mb-8 text-center">Our Collections</h2>
          
          {loading ? (
            <div className="text-center py-12">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryNames.length > 0 ? (
                categoryNames.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-xl p-6 text-center hover:translate-y-[-5px] transition-transform duration-300"
                  >
                    <h3 className="text-lg font-medium mb-2">{category}</h3>
                    <Link 
                      to={`/gallery?category=${encodeURIComponent(category)}`}
                      className="text-sm text-primary/80 hover:text-primary transition-colors"
                    >
                      Browse Collection
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  No categories available. Check back soon!
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Artist Quote */}
      <section className="py-16 bg-primary/5">
        <div className="container-custom">
          <motion.blockquote 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl italic mb-6 text-muted-foreground">
              "Every handkerchief tells a story, every stitch carries an emotion. I create not just fabric art, but memories to hold onto."
            </p>
            <footer className="text-sm text-muted-foreground">
              — Krishna Chhayani, Founder & Artist
            </footer>
          </motion.blockquote>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
