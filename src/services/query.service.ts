
import { IQuery } from '../models/Query';

// Get all queries
export const getAllQueries = async (): Promise<IQuery[]> => {
  try {
    // Use the cached data from window object
    if (!window.cachedData?.queries) {
      console.warn('No cached queries found, returning empty array');
      return [];
    }
    return window.cachedData.queries;
  } catch (error) {
    console.error('Error fetching all queries:', error);
    throw error;
  }
};

// Create a new query
export const createQuery = async (queryData: any): Promise<IQuery> => {
  try {
    const queries = window.cachedData?.queries || [];
    
    // Create a new query with an ID
    const newQuery: IQuery = {
      _id: Date.now().toString(), // Generate a unique ID
      ...queryData,
      status: "pending",
      createdAt: new Date(),
      date: new Date(),
    };
    
    // Update the cached data
    if (window.cachedData) {
      window.cachedData.queries = [...queries, newQuery];
    } else {
      console.warn('No cached data found, query will not persist');
    }
    
    return newQuery;
  } catch (error) {
    console.error('Error creating query:', error);
    throw error;
  }
};

// Update query status
export const updateQueryStatus = async (id: string, status: 'pending' | 'done'): Promise<IQuery | null> => {
  try {
    if (!window.cachedData?.queries) {
      console.warn('No cached queries found, cannot update');
      return null;
    }
    
    const queries = window.cachedData.queries;
    
    // Find the query to update
    const queryIndex = queries.findIndex(q => q._id === id);
    
    if (queryIndex === -1) {
      throw new Error(`Query with ID ${id} not found`);
    }
    
    // Create the updated query
    const updatedQuery = {
      ...queries[queryIndex],
      status,
    };
    
    // Update the cached data
    const updatedQueries = [...queries];
    updatedQueries[queryIndex] = updatedQuery;
    window.cachedData.queries = updatedQueries;
    
    return updatedQuery;
  } catch (error) {
    console.error(`Error updating query status with ID ${id}:`, error);
    throw error;
  }
};

// Delete a query
export const deleteQuery = async (id: string): Promise<IQuery | null> => {
  try {
    if (!window.cachedData?.queries) {
      console.warn('No cached queries found, cannot delete');
      return null;
    }
    
    const queries = window.cachedData.queries;
    
    // Find the query to delete
    const queryToDelete = queries.find(q => q._id === id);
    
    if (!queryToDelete) {
      throw new Error(`Query with ID ${id} not found`);
    }
    
    // Update the cached data
    window.cachedData.queries = queries.filter(q => q._id !== id);
    
    return queryToDelete;
  } catch (error) {
    console.error(`Error deleting query with ID ${id}:`, error);
    throw error;
  }
};
