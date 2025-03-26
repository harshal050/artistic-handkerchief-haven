
import axios from 'axios';
import { getSettings } from './settings.service';

// Browser-friendly image upload service
export const uploadImageToCloudinary = async (imageBase64: string): Promise<string> => {
  try {
    // First, check environment variables
    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    let apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    let uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // If not in env variables, try to get from settings
    if (!cloudName || !apiKey) {
      const settings = await getSettings();
      if (settings) {
        cloudName = settings.cloudinaryCloudName;
        apiKey = settings.cloudinaryApiKey;
        
        // Note: For browser uploads without API secret, we need an unsigned upload preset
        // This needs to be configured in the Cloudinary dashboard
        uploadPreset = 'ml_default'; // Default upload preset name, should be changed in Cloudinary
      }
    }

    if (!cloudName) {
      throw new Error('Cloudinary cloud name not configured');
    }

    // Using the Cloudinary Upload API directly instead of the Node SDK
    const formData = new FormData();
    formData.append('file', imageBase64);
    formData.append('upload_preset', uploadPreset || 'ml_default');
    formData.append('folder', 'products');

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
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
