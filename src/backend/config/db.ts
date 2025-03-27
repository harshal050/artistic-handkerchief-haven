
import mongoose from 'mongoose';

// Use the MongoDB Atlas URL provided
const MONGODB_URI = process.env.VITE_MONGODB_URI || "mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDatabase = async () => {
  try {
    // Since we're in a browser environment, we need to mock the MongoDB connection
    console.log('Mocking MongoDB connection for browser environment');
    
    // Return a mock connection object
    return { 
      connection: { 
        readyState: 1  // 1 means connected
      } 
    };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    console.log('Mocking disconnection from MongoDB for browser environment');
    return true;
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};
