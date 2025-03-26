
import { useState } from "react";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { useDatabase } from "@/context/DatabaseContext";
import { toast } from "sonner";
import { deleteProduct } from '@/services/product.service';
import { deleteCategory } from '@/services/category.service';
import { AddProductDialog } from "./products/AddProductDialog";
import { EditProductDialog } from "./products/EditProductDialog";
import { AddCategoryDialog } from "./products/AddCategoryDialog";

const ProductsManagement = () => {
  const { products, categories, refreshData } = useDatabase();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      await refreshData();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      toast.error("Failed to delete product");
    }
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const filteredProducts = products
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-card p-4 md:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">Products Management</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsAddProductOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add Product
            </Button>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Discount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id?.toString()}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.discount 
                        ? `${product.discount}% off` 
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit size={14} />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product._id?.toString() || "")}>
                          <Trash size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No products found. Add your first product!</p>
          </div>
        )}
      </div>
      
      <div className="bg-card p-4 md:p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button onClick={() => setIsAddCategoryOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <div key={category._id?.toString()} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm">
              {category.name}
            </div>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <AddProductDialog 
        isOpen={isAddProductOpen} 
        onClose={() => setIsAddProductOpen(false)} 
        categories={categories}
        refreshData={refreshData}
      />
      
      <EditProductDialog 
        isOpen={isEditProductOpen} 
        onClose={() => setIsEditProductOpen(false)} 
        product={selectedProduct}
        categories={categories}
        refreshData={refreshData}
      />
      
      <AddCategoryDialog 
        isOpen={isAddCategoryOpen} 
        onClose={() => setIsAddCategoryOpen(false)} 
        categories={categories}
        refreshData={refreshData}
      />
    </div>
  );
};

export default ProductsManagement;
