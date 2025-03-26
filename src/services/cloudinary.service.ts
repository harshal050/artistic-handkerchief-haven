
import { v2 as cloudinary } from 'cloudinary';
import Settings from '../models/Settings';

// Initialize with environment variables or default values
cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY || '123456789012345',
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET || 'your-api-secret'
});

export const initializeCloudinary = async () => {
  try {
    // If environment variables are set, we're already initialized
    if (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && 
        import.meta.env.VITE_CLOUDINARY_API_KEY && 
        import.meta.env.VITE_CLOUDINARY_API_SECRET) {
      console.log('Cloudinary initialized with environment variables');
      return;
    }
    
    // Fallback to database settings if environment variables aren't set
    const settings = await Settings.findOne({});
    
    if (settings && settings.cloudinaryCloudName) {
      cloudinary.config({
        cloud_name: settings.cloudinaryCloudName,
        api_key: settings.cloudinaryApiKey,
        api_secret: settings.cloudinaryApiSecret
      });
      console.log('Cloudinary initialized with settings from database');
    } else {
      console.log('Using default Cloudinary settings (demo account)');
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
