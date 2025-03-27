
import { IQuery } from "@/models/Query";
import axios from "axios";

const API_URL = "/api/queries";

export const getAllQueries = async (): Promise<IQuery[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching queries:', error);
    throw error;
  }
};

export const createQuery = async (queryData: Partial<IQuery>): Promise<IQuery> => {
  try {
    const response = await axios.post(API_URL, queryData);
    return response.data;
  } catch (error) {
    console.error('Error creating query:', error);
    throw error;
  }
};

export const updateQueryStatus = async (id: string, status: 'pending' | 'done'): Promise<IQuery> => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating query status with id ${id}:`, error);
    throw error;
  }
};

export const deleteQuery = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting query with id ${id}:`, error);
    throw error;
  }
};
