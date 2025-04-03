
import axios from 'axios';
import { connectToDatabase, getConnectionStatus } from '../../backend/config/db';
import { sampleProducts } from '../data/sampleProducts';
import { sampleCategories } from '../data/sampleCategories';
import { sampleReviews } from '../data/sampleReviews';
import { sampleQueries } from '../data/sampleQueries';
import { defaultSettings } from '../data/defaultSettings';

// API base URL
const API_BASE_URL = process.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize DB and get data
export const initializeApi = async () => {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Check if connection is successful
    const connectionStatus = getConnectionStatus();
    
    if (connectionStatus === 1) {
      try {
        // Try to fetch real data from API endpoints
        const [
          productsResponse, 
          categoriesResponse, 
          reviewsResponse, 
          queriesResponse, 
          settingsResponse
        ] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
          api.get('/reviews'),
          api.get('/queries'),
          api.get('/settings')
        ]);
        
        console.log('API initialized with database data');
        
        // Return real data from the database
        return {
          products: productsResponse.data || sampleProducts,
          categories: categoriesResponse.data || sampleCategories,
          reviews: reviewsResponse.data || sampleReviews,
          queries: queriesResponse.data || sampleQueries,
          settings: settingsResponse.data || defaultSettings
        };
      } catch (fetchError) {
        console.error('Error fetching data from API:', fetchError);
        throw fetchError;
      }
    } else {
      throw new Error('Database connection failed');
    }
  } catch (error) {
    console.error('API initialization error:', error);
    
    // Fallback to sample data
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

// Export the axios instance for direct API calls
export default api;
