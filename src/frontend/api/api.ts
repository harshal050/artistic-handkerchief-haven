
import axios from 'axios';
import { connectToDatabase } from '../../backend/config/db';
import { initializeDatabase } from '../../backend/services/init.service';
import { sampleProducts } from '../data/sampleProducts';
import { sampleCategories } from '../data/sampleCategories';
import { sampleReviews } from '../data/sampleReviews';
import { sampleQueries } from '../data/sampleQueries';
import { defaultSettings } from '../data/defaultSettings';

// Initialize DB and get data
export const initializeApi = async () => {
  try {
    // Connect to the database (this is now mocked)
    await connectToDatabase();
    
    console.log('API initialized with sample data');
    
    // Return sample data instead of trying to fetch from MongoDB
    return {
      products: sampleProducts,
      categories: sampleCategories,
      reviews: sampleReviews,
      queries: sampleQueries,
      settings: defaultSettings
    };
  } catch (error) {
    console.error('API initialization error:', error);
    throw error;
  }
};
