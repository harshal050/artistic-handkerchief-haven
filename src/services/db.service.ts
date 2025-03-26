
import mongoose from 'mongoose';

// Use environment variable with fallback for MongoDB connection
// We're now using a local MongoDB connection as the fallback
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || "mongodb://localhost:27017/gwokdatabase";

export const connectToDatabase = async () => {
  try {
    // Check if already connected
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};
