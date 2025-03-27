
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Share2, ChevronLeft, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useDatabase } from "@/context/DatabaseContext";
import { getReviewsByProductId, createReview } from "@/services/review.service";
import { IReview } from "@/models/Review";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useDatabase();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [productReviews, setProductReviews] = useState<IReview[]>([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [loadingReviews, setLoadingReviews] = useState(true);
  
  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(p => p._id === id);
      setProduct(foundProduct || null);
    }
  }, [products, id]);
  
  useEffect(() => {
    const loadReviews = async () => {
      if (id) {
        try {
          setLoadingReviews(true);
          const reviews = await getReviewsByProductId(id);
          setProductReviews(reviews);
        } catch (error) {
          console.error("Error loading reviews:", error);
          toast.error("Failed to load reviews");
        } finally {
          setLoadingReviews(false);
        }
      }
    };
    
    loadReviews();
  }, [id]);
  
  const discountedPrice = product?.discount 
    ? product.price - (product.price * product.discount / 100) 
    : product?.price;
  
  const handleShareOnWhatsApp = () => {
    if (!product) return;
    
    const text = `Check out this product: ${product.name} - ₹${discountedPrice}\n${product.description}\n\nView it here: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Ready to share on WhatsApp!");
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      const reviewData = {
        productId: id,
        userName: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date()
      };
      
      const savedReview = await createReview(reviewData);
      setProductReviews([...productReviews, savedReview]);
      setNewReview({ name: "", rating: 5, comment: "" });
      toast.success("Thank you for your review!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-8 text-center">
          Loading product details...
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-sm bg-primary text-primary-foreground px-4 py-2 rounded"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Gallery
          </Link>
        </div>
      </Layout>
    );
  }

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
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.images.map((image: string, index: number) => (
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
            )}
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
            
            {/* Ratings Summary */}
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                  const averageRating = productReviews.length > 0 
                    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length 
                    : 0;
                  
                  return (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.round(averageRating) 
                        ? 'text-amber-500 fill-amber-500' 
                        : 'text-muted-foreground'
                      } 
                    />
                  );
                })}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {productReviews.length > 0 
                  ? `${(productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length).toFixed(1)} (${productReviews.length} reviews)`
                  : "No reviews yet"}
              </span>
            </div>
            
            {/* Price */}
            <div className="mt-6 flex items-end gap-2">
              <span className="text-3xl font-bold">₹{discountedPrice?.toFixed(0)}</span>
              {product.discount && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.price?.toFixed(0)}
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
          
          {loadingReviews ? (
            <div className="text-center py-4">Loading reviews...</div>
          ) : productReviews.length > 0 ? (
            <div className="space-y-6">
              {productReviews.map(review => (
                <div key={review._id} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{review.userName}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
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
