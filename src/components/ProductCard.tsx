
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image: string;
}

export const ProductCard = ({ name, price, discount, image }: ProductCardProps) => {
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium truncate">{name}</h3>
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
    </motion.div>
  );
};
