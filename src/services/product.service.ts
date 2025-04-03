
import { IProduct } from '../models/Product';
import { uploadImageToCloudinary } from './cloudinary.service';

// Get all products
export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    return window.cachedData?.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    const products = window.cachedData?.products || [];
    return products.find(product => product._id === id) || null;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData: any): Promise<IProduct> => {
  try {
    const products = window.cachedData?.products || [];
    
    // Upload images if they are base64
    let processedImages = [...productData.images];
    if (productData.images && productData.images.length > 0) {
      const imagePromises = productData.images.map(async (image: string) => {
        if (image.startsWith('data:')) {
          return await uploadImageToCloudinary(image);
        }
        return image;
      });
      processedImages = await Promise.all(imagePromises);
    }
    
    // Create a new product with an ID
    const newProduct: IProduct = {
      _id: Date.now().toString(),
      ...productData,
      images: processedImages,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Update cached data
    if (window.cachedData) {
      window.cachedData.products = [...products, newProduct];
    } else {
      console.warn('No cached data found, product will not persist');
    }
    
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: string, productData: any): Promise<IProduct | null> => {
  try {
    if (!window.cachedData?.products) {
      console.warn('No cached products found, cannot update');
      return null;
    }
    
    const products = window.cachedData.products;
    
    // Find product index
    const productIndex = products.findIndex(p => p._id === id);
    
    if (productIndex === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    // Process images if needed
    let processedImages = [...productData.images];
    if (productData.images && productData.images.length > 0) {
      const imagePromises = productData.images.map(async (image: string) => {
        if (image.startsWith('data:')) {
          return await uploadImageToCloudinary(image);
        }
        return image;
      });
      processedImages = await Promise.all(imagePromises);
    }
    
    // Create updated product
    const updatedProduct = {
      ...products[productIndex],
      ...productData,
      images: processedImages,
      updatedAt: new Date()
    };
    
    // Update cached data
    const updatedProducts = [...products];
    updatedProducts[productIndex] = updatedProduct;
    window.cachedData.products = updatedProducts;
    
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    if (!window.cachedData?.products) {
      console.warn('No cached products found, cannot delete');
      return null;
    }
    
    const products = window.cachedData.products;
    
    // Find product to delete
    const productToDelete = products.find(p => p._id === id);
    
    if (!productToDelete) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    // Update cached data
    window.cachedData.products = products.filter(p => p._id !== id);
    
    return productToDelete;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
