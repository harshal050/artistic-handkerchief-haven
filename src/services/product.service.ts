
import Product, { IProduct } from '../models/Product';
import { uploadImageToCloudinary } from './image-upload.service';

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    return await Product.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findById(id);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData: any): Promise<IProduct> => {
  try {
    // If no images are provided, use a placeholder
    if (!productData.images || productData.images.length === 0) {
      productData.images = ['/placeholder.svg'];
    }
    
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: any): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

export const uploadProductImage = async (base64Image: string): Promise<string> => {
  try {
    return await uploadImageToCloudinary(base64Image);
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
};
