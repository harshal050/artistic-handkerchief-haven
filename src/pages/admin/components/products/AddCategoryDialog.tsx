
import { useState } from "react";
import { toast } from "sonner";
import { createCategory } from '@/services/category.service';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICategory } from "@/models/Category";

interface AddCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategory[];
  refreshData: () => Promise<void>;
}

export const AddCategoryDialog = ({ isOpen, onClose, categories, refreshData }: AddCategoryDialogProps) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") {
      toast.error("Please enter a category name");
      return;
    }
    
    if (categories.some(c => c.name === newCategory)) {
      toast.error("This category already exists");
      return;
    }
    
    try {
      await createCategory(newCategory);
      await refreshData();
      setNewCategory("");
      onClose();
      toast.success("Category added successfully");
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error("Failed to add category");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setNewCategory("");
        onClose();
      }
    }}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add New Category</SheetTitle>
          <SheetDescription>
            Create a new category for your products.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category-name" className="text-right text-sm">Category Name</label>
            <Input
              id="category-name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="col-span-3"
              placeholder="Enter category name"
            />
          </div>
        </div>
        
        <SheetFooter>
          <Button variant="outline" onClick={() => {
            setNewCategory("");
            onClose();
          }}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory}>
            Add Category
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
