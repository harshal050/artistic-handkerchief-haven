
// This is a mock cloudinary service for the frontend
// In a real application, this would call your backend's cloudinary integration

export const uploadImageToCloudinary = async (file: string): Promise<string> => {
  try {
    // In a real app, we would make a call to the backend
    // For now, just return a mock URL
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `https://res.cloudinary.com/demo/image/upload/v${timestamp}/${randomString}`;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export default {
  uploader: {
    upload: async (file: string) => {
      const url = await uploadImageToCloudinary(file);
      return { secure_url: url };
    }
  }
};
