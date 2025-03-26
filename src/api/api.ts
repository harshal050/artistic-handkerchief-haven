
import axios from 'axios';
import { connectToDatabase } from '../services/db.service';
import { initializeDatabase } from '../services/init.service';
import { getAllProducts } from '../services/product.service';
import { getAllCategories } from '../services/category.service';
import { getAllReviews } from '../services/review.service';
import { getAllQueries } from '../services/query.service';
import { getSettings } from '../services/settings.service';

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
