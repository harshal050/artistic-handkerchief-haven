
import { getSettings } from './settings.service';

// Upload an image to Cloudinary (mock in browser)
export const uploadImageToCloudinary = async (file: string): Promise<string> => {
  try {
    // Check if the string is already a URL
    if (file.startsWith('http') || file.startsWith('/')) {
      return file;
    }

    // In a real backend environment, we would use cloudinary SDK
    // For now, in the browser, we'll simulate the upload by generating a unique URL
    
    // Get cloudinary settings (will be used in real backend)
    const settings = await getSettings();
    
    // For base64 images, generate a mock Cloudinary URL
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    
    // Return a mock URL that looks like a Cloudinary URL
    return `https://res.cloudinary.com/${settings?.cloudinaryCloudName || 'demo'}/image/upload/v${timestamp}/${randomString}`;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Upload multiple images
export const uploadImages = async (imageFiles: string[]): Promise<string[]> => {
  try {
    const uploadPromises = imageFiles.map(file => uploadImageToCloudinary(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};
