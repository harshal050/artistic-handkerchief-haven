
import axios from 'axios';
import { connectToDatabase, getConnectionStatus } from '../../backend/config/db';
import { sampleProducts } from '../data/sampleProducts';
import { sampleCategories } from '../data/sampleCategories';
import { sampleReviews } from '../data/sampleReviews';
import { sampleQueries } from '../data/sampleQueries';
import { defaultSettings } from '../data/defaultSettings';

// Initialize DB and get data
export const initializeApi = async () => {
  try {
    // Connect to the database (this will be mocked in browser)
    await connectToDatabase();
    
    // Check if connection is successful
    const connectionStatus = getConnectionStatus();
    
    if (connectionStatus !== 1) {
      throw new Error('Database connection failed');
    }
    
    console.log('API initialized with sample data');
    
    // Return sample data for the browser environment
    return {
      products: sampleProducts,
      categories: sampleCategories,
      reviews: sampleReviews,
      queries: sampleQueries,
      settings: defaultSettings
    };
  } catch (error) {
    console.error('API initialization error:', error);
    
    // Even if there's an error, return sample data for the browser
    console.log('Falling back to sample data');
    return {
      products: sampleProducts,
      categories: sampleCategories,
      reviews: sampleReviews,
      queries: sampleQueries,
      settings: defaultSettings
    };
  }
};
