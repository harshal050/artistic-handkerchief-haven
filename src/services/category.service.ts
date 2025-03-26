
import Category, { ICategory } from '../models/Category';

export const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    return await Category.find().sort({ name: 1 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (name: string): Promise<ICategory> => {
  try {
    const category = new Category({ name });
    return await category.save();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};
