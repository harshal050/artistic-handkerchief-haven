
import { v2 as cloudinary } from 'cloudinary';
import Settings from '../models/Settings';

// Initialize with default values
cloudinary.config({
  cloud_name: 'demo',
  api_key: '123456789012345',
  api_secret: 'your-api-secret'
});

export const initializeCloudinary = async () => {
  try {
    // Get settings from database
    const settings = await Settings.findOne({});
    
    if (settings && settings.cloudinaryCloudName) {
      cloudinary.config({
        cloud_name: settings.cloudinaryCloudName,
        api_key: settings.cloudinaryApiKey,
        api_secret: settings.cloudinaryApiSecret
      });
      console.log('Cloudinary initialized with settings from database');
    } else {
      console.log('Using default Cloudinary settings');
    }
  } catch (error) {
    console.error('Failed to initialize Cloudinary:', error);
  }
};

export const uploadImage = async (file: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'products'
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export default cloudinary;
