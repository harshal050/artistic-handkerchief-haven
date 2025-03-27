
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IProduct } from '../backend/models/Product';
import { ICategory } from '../backend/models/Category';
import { IReview } from '../backend/models/Review';
import { IQuery } from '../backend/models/Query';
import { ISettings } from '../backend/models/Settings';
import { initializeApi } from '../frontend/api/api';
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
      
      // Initialize API and fetch all data
      const data = await initializeApi();
      
      // Update state
      setProducts(data.products);
      setCategories(data.categories);
      setReviews(data.reviews);
      setQueries(data.queries);
      setSettings(data.settings);
      
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
