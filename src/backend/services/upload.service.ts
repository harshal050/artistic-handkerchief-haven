
import { getSettings } from './settings.service';

// Local image upload service
export const initializeCloudinary = async () => {
  console.log('Local storage initialized for images');
};

export const uploadImageToCloudinary = async (imageBase64: string): Promise<string> => {
  try {
    // Check if the string is already a URL
    if (imageBase64.startsWith('http')) {
      return imageBase64;
    }

    // For base64 images, extract the data part (remove the prefix like 'data:image/jpeg;base64,')
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    
    // Generate a unique filename
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const filename = `${timestamp}-${randomString}.jpg`;
    
    // In a browser environment, we'll just return a reference to the local path
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error processing local image:', error);
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
