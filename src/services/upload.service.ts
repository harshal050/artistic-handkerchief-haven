
import { v2 as cloudinary } from 'cloudinary';
import { getSettings } from './settings.service';

let isInitialized = false;

export const initializeCloudinary = async () => {
  try {
    if (!isInitialized) {
      // First try to use environment variables
      if (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && 
          import.meta.env.VITE_CLOUDINARY_API_KEY && 
          import.meta.env.VITE_CLOUDINARY_API_SECRET) {
        
        cloudinary.config({
          cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
          api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET
        });
        console.log('Cloudinary initialized from environment variables');
        isInitialized = true;
        return;
      }
      
      // Fallback to database settings
      const settings = await getSettings();
      
      if (settings && settings.cloudinaryCloudName) {
        cloudinary.config({
          cloud_name: settings.cloudinaryCloudName,
          api_key: settings.cloudinaryApiKey,
          api_secret: settings.cloudinaryApiSecret
        });
        console.log('Cloudinary initialized from database settings');
        isInitialized = true;
      } else {
        console.warn('Cloudinary settings not found, using defaults');
      }
    }
  } catch (error) {
    console.error('Failed to initialize Cloudinary:', error);
  }
};

export const uploadImageToCloudinary = async (imageBuffer: string): Promise<string> => {
  try {
    await initializeCloudinary();
    
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        imageBuffer,
        { folder: 'products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const uploadImages = async (imageFiles: string[]): Promise<string[]> => {
  try {
    const uploadPromises = imageFiles.map(file => uploadImageToCloudinary(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};
