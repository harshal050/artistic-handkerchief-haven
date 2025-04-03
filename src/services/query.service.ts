
import { IQuery } from '../models/Query';
import api from '../frontend/api/api';

// Get all queries
export const getAllQueries = async (): Promise<IQuery[]> => {
  try {
    const response = await api.get('/queries');
    return response.data;
  } catch (error) {
    console.error('Error fetching all queries:', error);
    // Return cached data if available, otherwise empty array
    return [];
  }
};

// Create a new query
export const createQuery = async (queryData: any): Promise<IQuery> => {
  try {
    const response = await api.post('/queries', queryData);
    return response.data;
  } catch (error) {
    console.error('Error creating query:', error);
    throw error;
  }
};

// Update query status
export const updateQueryStatus = async (id: string, status: 'pending' | 'done'): Promise<IQuery | null> => {
  try {
    const response = await api.patch(`/queries/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating query status with ID ${id}:`, error);
    throw error;
  }
};

// Delete a query
export const deleteQuery = async (id: string): Promise<IQuery | null> => {
  try {
    const response = await api.delete(`/queries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting query with ID ${id}:`, error);
    throw error;
  }
};
