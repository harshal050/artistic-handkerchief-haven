
import { ICategory } from '../models/Category';

export const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    // For now, we'll use the data from the context instead of making actual API calls
    return window.cachedData?.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (name: string): Promise<ICategory> => {
  try {
    console.log('Creating category:', name);
    return {
      _id: Date.now().toString(),
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  try {
    console.log(`Deleting category with id ${id}`);
    return null;
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};
