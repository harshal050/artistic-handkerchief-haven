
import axios from 'axios';
import { connectToDatabase } from '../../backend/config/db';
import { initializeDatabase } from '../../backend/services/init.service';
import { getAllProducts } from '../../backend/services/product.service';
import { getAllCategories } from '../../backend/services/category.service';
import { getAllReviews } from '../../backend/services/review.service';
import { getAllQueries } from '../../backend/services/query.service';
import { getSettings } from '../../backend/services/settings.service';

// Initialize DB and get data
export const initializeApi = async () => {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Initialize the database with sample data if empty
    await initializeDatabase();
    
    // Fetch all data
    const [products, categories, reviews, queries, settings] = await Promise.all([
      getAllProducts(),
      getAllCategories(),
      getAllReviews(),
      getAllQueries(),
      getSettings()
    ]);
    
    return {
      products,
      categories,
      reviews,
      queries,
      settings
    };
  } catch (error) {
    console.error('API initialization error:', error);
    throw error;
  }
};
