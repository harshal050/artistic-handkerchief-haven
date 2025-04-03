
import { ICategory } from '../models/Category';

// Get all categories
export const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    return window.cachedData?.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (name: string): Promise<ICategory> => {
  try {
    const categories = window.cachedData?.categories || [];
    
    // Create a new category
    const newCategory: ICategory = {
      _id: Date.now().toString(),
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Update cached data
    if (window.cachedData) {
      window.cachedData.categories = [...categories, newCategory];
    } else {
      console.warn('No cached data found, category will not persist');
    }
    
    return newCategory;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  try {
    if (!window.cachedData?.categories) {
      console.warn('No cached categories found, cannot delete');
      return null;
    }
    
    const categories = window.cachedData.categories;
    
    // Find category to delete
    const categoryToDelete = categories.find(c => c._id === id);
    
    if (!categoryToDelete) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    // Update cached data
    window.cachedData.categories = categories.filter(c => c._id !== id);
    
    return categoryToDelete;
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    throw error;
  }
};
