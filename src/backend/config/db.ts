
import mongoose from 'mongoose';

// Use the MongoDB Atlas URL provided
const MONGODB_URI = process.env.VITE_MONGODB_URI || "mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a connection state tracking variable
let isConnected = false;

export const connectToDatabase = async () => {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      console.log('Attempting MongoDB connection from browser environment');
      
      try {
        // Make an API call to check database connection
        const response = await fetch('/api/db-check');
        if (!response.ok) {
          throw new Error('Database connection check failed');
        }
        
        isConnected = true;
        console.log('MongoDB connection check successful');
        
        return { 
          connection: { 
            readyState: 1  // 1 means connected
          } 
        };
      } catch (error) {
        console.error('Could not verify database connection:', error);
        isConnected = false;
        
        // Return a mock connection for browser fallback
        return { 
          connection: { 
            readyState: 0  // 0 means disconnected
          } 
        };
      }
    } else {
      // This would run in a Node.js environment
      console.log('Connecting to MongoDB...');
      
      if (mongoose.connections[0].readyState) {
        console.log('Using existing MongoDB connection');
        isConnected = true;
        return mongoose;
      }
      
      const connection = await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected successfully');
      isConnected = true;
      return connection;
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    if (typeof window !== 'undefined') {
      console.log('Disconnection from MongoDB in browser environment');
      isConnected = false;
      return true;
    } else {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully');
      isConnected = false;
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
    return isConnected ? 1 : 0;
  } else {
    return mongoose.connection.readyState;
  }
};
