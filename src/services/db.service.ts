
import mongoose from 'mongoose';

// Use environment variable with fallback for MongoDB connection
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || "mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/gwokdatabase?retryWrites=true&w=majority";

export const connectToDatabase = async () => {
  try {
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
