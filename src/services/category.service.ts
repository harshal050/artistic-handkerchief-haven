
import { ICategory } from "@/models/Category";
import axios from "axios";

const API_URL = "/api/categories";

export const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (name: string): Promise<ICategory> => {
  try {
    const response = await axios.post(API_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};
