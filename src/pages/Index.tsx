
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Temporary product data
const featuredProducts = [
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
    name: "Hastmelap Design",
    price: 950,
    discount: 5,
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Hastmelap Handkerchief"
  },
  {
    id: "3",
    name: "Astar Part Special",
    price: 850,
    image: "https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Astar Part Handkerchief"
  },
  {
    id: "4",
    name: "Mindhol Handkerchief",
    price: 1100,
    discount: 15,
    image: "https://images.unsplash.com/photo-1517401575718-99deca622520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Mindhol Handkerchief"
  },
];

const categories = [
  "Wedding Collection",
  "Hastmelap Handkerchief",
  "Astar Part Handkerchief",
  "Mindhol Handkerchief",
  "Chedachedi Handkerchief"
];

const Index = () => {
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
              src="/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png"
              alt="RK.Creation Logo" 
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="heading-md mb-8 text-center">Our Collections</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
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
            ))}
          </div>
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
