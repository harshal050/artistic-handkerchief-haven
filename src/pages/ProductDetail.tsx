
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Share2, ChevronLeft, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock product data - this would come from an API in a real app
const mockProduct = {
  id: "1",
  name: "Wedding Handkerchief",
  price: 1200,
  discount: 10,
  description: "Exquisite handcrafted wedding handkerchief with intricate design. Perfect for special occasions and memorable ceremonies.",
  rating: 4.7,
  reviewCount: 12,
  images: [
    "https://images.unsplash.com/photo-1606293459303-ec4d6a10b829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  ],
  category: "Wedding Collection",
  reviews: [
    { id: "1", user: "Raj Patel", rating: 5, comment: "Beautiful design and excellent quality!", date: "2023-12-15" },
    { id: "2", user: "Priya Sharma", rating: 4, comment: "Lovely handkerchief, perfect for my wedding.", date: "2023-11-20" },
  ]
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const product = mockProduct; // In real app, fetch product by ID
  
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : product.price;
  
  const handleShareOnWhatsApp = () => {
    const text = `Check out this product: ${product.name} - ₹${discountedPrice}\n${product.description}\n\nView it here: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Ready to share on WhatsApp!");
  };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <Link 
          to="/gallery" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Gallery
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <motion.div 
              className="aspect-square rounded-xl overflow-hidden bg-secondary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                    selectedImage === index ? 'ring-2 ring-primary' : 'ring-1 ring-border'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            {/* Category Badge */}
            <div className="mt-2">
              <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            
            {/* Ratings */}
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.round(product.rating) 
                      ? 'text-amber-500 fill-amber-500' 
                      : 'text-muted-foreground'
                    } 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mt-6 flex items-end gap-2">
              <span className="text-3xl font-bold">₹{discountedPrice.toFixed(0)}</span>
              {product.discount && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.price.toFixed(0)}
                  </span>
                  <span className="ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded text-sm">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            {/* Share Button */}
            <div className="mt-8">
              <Button 
                onClick={handleShareOnWhatsApp}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white" 
              >
                <Share2 size={18} className="mr-2" />
                Share on WhatsApp
              </Button>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map(review => (
                <div key={review.id} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{review.user}</h3>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'} 
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet for this product.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
