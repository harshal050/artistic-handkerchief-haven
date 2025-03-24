
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Share2, ChevronLeft, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

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
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviews, setReviews] = useState(product.reviews);
  
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : product.price;
  
  const handleShareOnWhatsApp = () => {
    const text = `Check out this product: ${product.name} - ₹${discountedPrice}\n${product.description}\n\nView it here: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Ready to share on WhatsApp!");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newReviewObj = {
      id: (reviews.length + 1).toString(),
      user: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([...reviews, newReviewObj]);
    setNewReview({ name: "", rating: 5, comment: "" });
    toast.success("Thank you for your review!");
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
            
            {/* Share Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
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
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map(review => (
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
        
        {/* Add Review Form */}
        <div className="mt-12 bg-card rounded-lg p-6 border border-border">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Your Name *
              </label>
              <Input 
                value={newReview.name} 
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating})}
                    className="p-1"
                    aria-label={`Rate ${rating} stars`}
                  >
                    <Star 
                      size={24} 
                      className={`${
                        rating <= newReview.rating 
                          ? 'text-amber-500 fill-amber-500' 
                          : 'text-muted-foreground'
                      } transition-colors`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Your Review *
              </label>
              <textarea 
                className="w-full p-2 border border-input rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                value={newReview.comment} 
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Share your thoughts about this product"
                required
              />
            </div>
            
            <Button type="submit">
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
