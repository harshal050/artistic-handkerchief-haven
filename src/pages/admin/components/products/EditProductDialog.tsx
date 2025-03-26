
import { useState, useRef, useEffect } from "react";
import { Check, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { updateProduct } from '@/services/product.service';
import { uploadImages } from '@/services/image-upload.service';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/models/Category";
import { IProduct } from "@/models/Product";

interface EditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct | null;
  categories: ICategory[];
  refreshData: () => Promise<void>;
}

export const EditProductDialog = ({ isOpen, onClose, product, categories, refreshData }: EditProductDialogProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      // Add discountPrice for UI if needed
      const discountPrice = product.discount 
        ? product.price - (product.price * (product.discount / 100))
        : "";
        
      setSelectedProduct({
        ...product,
        discountPrice: discountPrice ? discountPrice.toString() : ""
      });
    }
  }, [product]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !selectedProduct) return;
    
    const files = Array.from(event.target.files);
    setUploading(true);
    
    try {
      // Convert files to base64 for Cloudinary upload
      const base64Files = await Promise.all(
        files.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      );
      
      // Upload to Cloudinary
      const uploadedUrls = await uploadImages(base64Files);
      
      setSelectedProduct({
        ...selectedProduct,
        images: [...selectedProduct.images, ...uploadedUrls]
      });
      
      toast.success(`${files.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveEditedProduct = async () => {
    try {
      if (!selectedProduct || !selectedProduct._id) {
        toast.error("Product not found");
        return;
      }

      // Calculate discount if discountPrice is provided
      let productData = { ...selectedProduct };
      if (typeof selectedProduct.discountPrice === 'string' && selectedProduct.discountPrice.trim() !== '') {
        const originalPrice = parseFloat(selectedProduct.price);
        const discountPrice = parseFloat(selectedProduct.discountPrice);
        
        if (!isNaN(originalPrice) && !isNaN(discountPrice) && discountPrice < originalPrice) {
          productData.discount = calculateDiscount(originalPrice, discountPrice);
        }
      }
      
      // Remove discountPrice as it's not in our schema
      delete productData.discountPrice;

      await updateProduct(selectedProduct._id, productData);
      await refreshData();
      onClose();
      toast.success("Product updated successfully");
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Failed to update product");
    }
  };

  const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
    if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!selectedProduct) return;
    
    const updatedImages = selectedProduct.images.filter((_: any, index: number) => index !== indexToRemove);
    setSelectedProduct({
      ...selectedProduct,
      images: updatedImages
    });
    toast.success("Image removed");
  };

  if (!selectedProduct) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>
            Update the product details.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-name" className="text-right text-sm">Name</label>
            <Input
              id="edit-name"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              className="col-span-3"
              placeholder="Product name"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-category" className="text-right text-sm">Category</label>
            <select
              id="edit-category"
              value={selectedProduct.category}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id?.toString()} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-price" className="text-right text-sm">Price (₹)</label>
            <Input
              id="edit-price"
              type="number"
              value={selectedProduct.price}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              className="col-span-3"
              placeholder="Regular price"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-discountPrice" className="text-right text-sm">Discount Price</label>
            <Input
              id="edit-discountPrice"
              type="number"
              value={selectedProduct.discountPrice}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, discountPrice: e.target.value })}
              className="col-span-3"
              placeholder="Sale price (optional)"
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="edit-description" className="text-right text-sm">Description</label>
            <Textarea
              id="edit-description"
              value={selectedProduct.description}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
              className="col-span-3"
              placeholder="Product description"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm">Images</label>
            <div className="col-span-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Upload Additional Images
                  </>
                )}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {selectedProduct.images.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <SheetFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveEditedProduct}>
            <Check size={16} className="mr-2" />
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
