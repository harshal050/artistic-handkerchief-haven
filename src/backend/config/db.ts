
import mongoose from 'mongoose';

// Use the MongoDB Atlas URL provided
const MONGODB_URI = process.env.VITE_MONGODB_URI || "mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDatabase = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
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
