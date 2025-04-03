
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IProduct } from '../models/Product';
import { ICategory } from '../models/Category';
import { IReview } from '../models/Review';
import { IQuery } from '../models/Query';
import { ISettings } from '../models/Settings';
import { initializeApi } from '../frontend/api/api';
import { toast } from 'sonner';

// Declare global window with cached data property
declare global {
  interface Window {
    cachedData?: {
      products: IProduct[];
      categories: ICategory[];
      reviews: IReview[];
      queries: IQuery[];
      settings: ISettings | null;
    };
  }
}

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
      
      // Initialize API and fetch all data
      const data = await initializeApi();
      
      if (!data) {
        throw new Error('Failed to initialize API');
      }
      
      // Update state
      setProducts(data.products || []);
      setCategories(data.categories || []);
      setReviews(data.reviews || []);
      setQueries(data.queries || []);
      setSettings(data.settings || null);
      
      // Cache data for service layer
      window.cachedData = {
        products: data.products || [],
        categories: data.categories || [],
        reviews: data.reviews || [],
        queries: data.queries || [],
        settings: data.settings || null
      };
      
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      toast.error('Failed to connect to database. Using sample data instead.');
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
