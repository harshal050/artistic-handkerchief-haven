
import mongoose from 'mongoose';

// Use the MongoDB Atlas URL provided
const MONGODB_URI = process.env.VITE_MONGODB_URI || "mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mock connection object for browser environment
const mockConnection = {
  readyState: 1 // 1 means connected
};

export const connectToDatabase = async () => {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      console.log('Mocking MongoDB connection for browser environment');
      
      // Return the mock connection for browser
      return { 
        connection: mockConnection
      };
    } else {
      // This would run in a Node.js environment
      console.log('Connecting to MongoDB...');
      const connection = await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected successfully');
      return connection;
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    if (typeof window !== 'undefined') {
      console.log('Mocking disconnection from MongoDB for browser environment');
      return true;
    } else {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully');
      return true;
    }
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};

// Expose a function to check connection status
export const getConnectionStatus = () => {
  if (typeof window !== 'undefined') {
    return mockConnection.readyState;
  } else {
    return mongoose.connection.readyState;
  }
};
