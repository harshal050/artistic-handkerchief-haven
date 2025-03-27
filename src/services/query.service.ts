
import { IQuery } from '../models/Query';

export const getAllQueries = async (): Promise<IQuery[]> => {
  try {
    return window.cachedData?.queries || [];
  } catch (error) {
    console.error('Error fetching queries:', error);
    throw error;
  }
};

export const createQuery = async (queryData: any): Promise<IQuery> => {
  try {
    console.log('Creating query:', queryData);
    return {
      _id: Date.now().toString(),
      ...queryData,
      status: 'pending',
      date: new Date(),
      createdAt: new Date()
    };
  } catch (error) {
    console.error('Error creating query:', error);
    throw error;
  }
};

export const updateQueryStatus = async (id: string, status: 'pending' | 'done'): Promise<IQuery | null> => {
  try {
    console.log(`Updating query status with id ${id} to ${status}`);
    return {
      _id: id,
      name: '',
      email: '',
      phone: '',
      message: '',
      status,
      date: new Date(),
      createdAt: new Date()
    };
  } catch (error) {
    console.error(`Error updating query status with id ${id}:`, error);
    throw error;
  }
};

export const deleteQuery = async (id: string): Promise<IQuery | null> => {
  try {
    console.log(`Deleting query with id ${id}`);
    return null;
  } catch (error) {
    console.error(`Error deleting query with id ${id}:`, error);
    throw error;
  }
};
