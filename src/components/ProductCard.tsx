
import { motion } from 'framer-motion';
import { Star, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  discount, 
  image, 
  rating = 0, 
  reviewCount = 0 
}: ProductCardProps) => {
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/product/${id}`} className="block">
        <div className="aspect-square w-full overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium truncate">{name}</h3>
          
          {/* Rating stars */}
          {rating > 0 && (
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < Math.round(rating) 
                      ? 'text-amber-500 fill-amber-500' 
                      : 'text-muted-foreground'
                    } 
                  />
                ))}
              </div>
              {reviewCount > 0 && (
                <span className="text-xs text-muted-foreground ml-2">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}
          
          <div className="mt-2 flex items-end gap-2">
            <p className="text-base font-semibold">₹{discountedPrice.toFixed(0)}</p>
            {discount && (
              <p className="text-sm text-muted-foreground line-through">₹{price.toFixed(0)}</p>
            )}
            {discount && (
              <span className="ml-auto text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
