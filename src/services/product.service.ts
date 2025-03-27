
import axios from 'axios';
import { IProduct } from '../models/Product';

// Backend API URL (placeholder for now)
const API_URL = '/api';

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    // For now, we'll use the data from the context instead of making actual API calls
    return window.cachedData?.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    const products = await getAllProducts();
    return products.find(product => product._id === id) || null;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData: any): Promise<IProduct> => {
  try {
    // This would normally be an API call
    console.log('Creating product:', productData);
    // Return a mock response
    return {
      _id: Date.now().toString(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: any): Promise<IProduct | null> => {
  try {
    console.log(`Updating product with id ${id}:`, productData);
    return {
      _id: id,
      ...productData,
      updatedAt: new Date()
    };
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    console.log(`Deleting product with id ${id}`);
    return null;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

export const uploadProductImage = async (base64Image: string): Promise<string> => {
  try {
    console.log('Uploading product image');
    return 'https://placeholder.com/image.jpg';
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
};
