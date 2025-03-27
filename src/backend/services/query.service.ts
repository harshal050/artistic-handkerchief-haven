
import Query, { IQuery } from '../models/Query';

export const getAllQueries = async (): Promise<IQuery[]> => {
  try {
    return await Query.find().sort({ date: -1 });
  } catch (error) {
    console.error('Error fetching queries:', error);
    throw error;
  }
};

export const createQuery = async (queryData: any): Promise<IQuery> => {
  try {
    const query = new Query(queryData);
    return await query.save();
  } catch (error) {
    console.error('Error creating query:', error);
    throw error;
  }
};

export const updateQueryStatus = async (id: string, status: 'pending' | 'done'): Promise<IQuery | null> => {
  try {
    return await Query.findByIdAndUpdate(id, { status }, { new: true });
  } catch (error) {
    console.error(`Error updating query status with id ${id}:`, error);
    throw error;
  }
};

export const deleteQuery = async (id: string): Promise<IQuery | null> => {
  try {
    return await Query.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting query with id ${id}:`, error);
    throw error;
  }
};
