import { useState, useRef } from "react";
import { Check, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { createProduct } from '@/services/product.service';
import { uploadImages } from '@/services/image-upload.service';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/models/Category";

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategory[];
  refreshData: () => Promise<void>;
}

export const AddProductDialog = ({ isOpen, onClose, categories, refreshData }: AddProductDialogProps) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    description: "",
    images: [] as string[]
  });
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    setUploading(true);
    
    try {
      // Convert files to base64 for local storage reference
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
      
      // Get local file paths
      const uploadedUrls = await uploadImages(base64Files);
      
      setNewProduct({
        ...newProduct,
        images: [...newProduct.images, ...uploadedUrls]
      });
      
      setSelectedFiles([...selectedFiles, ...files]);
      toast.success(`${files.length} image(s) added successfully`);
    } catch (error) {
      console.error('Error processing files:', error);
      toast.error("Failed to process images");
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async () => {
    // Validation
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const productToAdd = {
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        ...(newProduct.discountPrice && { discount: calculateDiscount(parseFloat(newProduct.price), parseFloat(newProduct.discountPrice)) }),
        description: newProduct.description,
        images: newProduct.images.length > 0 ? newProduct.images : ["/placeholder.svg"]
      };

      await createProduct(productToAdd);
      await refreshData();
      
      // Reset form
      resetForm();
      onClose();
      toast.success("Product added successfully");
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("Failed to add product");
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      category: "",
      price: "",
      discountPrice: "",
      description: "",
      images: []
    });
    setSelectedFiles([]);
  };

  const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
    if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = newProduct.images.filter((_, index) => index !== indexToRemove);
    setNewProduct({
      ...newProduct,
      images: updatedImages
    });
    toast.success("Image removed");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription>
            Fill in the details to add a new product to your catalog.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm">Name</label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="col-span-3"
              placeholder="Product name"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right text-sm">Category</label>
            <select
              id="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
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
            <label htmlFor="price" className="text-right text-sm">Price (₹)</label>
            <Input
              id="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="col-span-3"
              placeholder="Regular price"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="discountPrice" className="text-right text-sm">Discount Price</label>
            <Input
              id="discountPrice"
              type="number"
              value={newProduct.discountPrice}
              onChange={(e) => setNewProduct({ ...newProduct, discountPrice: e.target.value })}
              className="col-span-3"
              placeholder="Sale price (optional)"
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="description" className="text-right text-sm">Description</label>
            <Textarea
              id="description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Upload Images
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
              
              {newProduct.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.startsWith('data:') ? image : image}
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
          <Button variant="outline" onClick={() => {
            resetForm();
            onClose();
          }}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct}>
            <Check size={16} className="mr-2" />
            Add Product
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
