
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
      
      // Convert backend types to frontend types
      const frontendProducts: IProduct[] = data.products.map((p: any) => ({
        ...p,
        _id: p._id?.toString() || '',
        categoryId: p.categoryId?.toString() || '',
      }));
      
      const frontendCategories: ICategory[] = data.categories.map((c: any) => ({
        ...c,
        _id: c._id?.toString() || '',
      }));
      
      const frontendReviews: IReview[] = data.reviews.map((r: any) => ({
        ...r,
        _id: r._id?.toString() || '',
        productId: r.productId?.toString() || '',
      }));
      
      const frontendQueries: IQuery[] = data.queries.map((q: any) => ({
        ...q,
        _id: q._id?.toString() || '',
      }));
      
      const frontendSettings: ISettings | null = data.settings ? {
        ...data.settings,
        _id: data.settings._id?.toString() || '',
      } : null;
      
      // Update state
      setProducts(frontendProducts);
      setCategories(frontendCategories);
      setReviews(frontendReviews);
      setQueries(frontendQueries);
      setSettings(frontendSettings);
      
      // Cache data for service layer
      window.cachedData = {
        products: frontendProducts,
        categories: frontendCategories,
        reviews: frontendReviews,
        queries: frontendQueries,
        settings: frontendSettings
      };
      
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
