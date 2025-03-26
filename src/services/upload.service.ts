
import { v2 as cloudinary } from 'cloudinary';
import { getSettings } from './settings.service';

let isInitialized = false;

export const initializeCloudinary = async () => {
  try {
    if (!isInitialized) {
      const settings = await getSettings();
      
      if (settings && settings.cloudinaryCloudName) {
        cloudinary.config({
          cloud_name: settings.cloudinaryCloudName,
          api_key: settings.cloudinaryApiKey,
          api_secret: settings.cloudinaryApiSecret
        });
        console.log('Cloudinary initialized');
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
