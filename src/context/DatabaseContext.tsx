import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectToDatabase } from '../services/db.service';
import { initializeDatabase } from '../services/init.service';
import { getAllProducts } from '../services/product.service';
import { getAllCategories } from '../services/category.service';
import { getAllReviews } from '../services/review.service';
import { getAllQueries } from '../services/query.service';
import { getSettings } from '../services/settings.service';
import { IProduct } from '../models/Product';
import { ICategory } from '../models/Category';
import { IReview } from '../models/Review';
import { IQuery } from '../models/Query';
import { ISettings } from '../models/Settings';
import { toast } from 'sonner';

interface DatabaseContextProps {
  products: IProduct[];
  categories: ICategory[];
  reviews: IReview[];
  queries: IQuery[];
  settings: ISettings | null;
  loading: boolean;
  error: any;
  refreshData: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextProps>({
  products: [],
  categories: [],
  reviews: [],
  queries: [],
  settings: null,
  loading: true,
  error: null,
  refreshData: async () => {}
});

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [queries, setQueries] = useState<IQuery[]>([]);
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Connect to the database
      await connectToDatabase();
      
      // Initialize the database with sample data if empty
      await initializeDatabase();
      
      // Fetch all data
      const [productsData, categoriesData, reviewsData, queriesData, settingsData] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
        getAllReviews(),
        getAllQueries(),
        getSettings()
      ]);
      
      // Update state
      setProducts(productsData);
      setCategories(categoriesData);
      setReviews(reviewsData);
      setQueries(queriesData);
      setSettings(settingsData);
      
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      toast.error('Failed to connect to database. Please check your MongoDB connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <DatabaseContext.Provider
      value={{
        products,
        categories,
        reviews,
        queries,
        settings,
        loading,
        error,
        refreshData
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
