
import { IReview } from "@/models/Review";
import axios from "axios";

const API_URL = "/api/reviews";

export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const getReviewsByProductId = async (productId: string): Promise<IReview[]> => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product with id ${productId}:`, error);
    throw error;
  }
};

export const createReview = async (reviewData: Partial<IReview>): Promise<IReview> => {
  try {
    const response = await axios.post(API_URL, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const updateReview = async (id: string, reviewData: Partial<IReview>): Promise<IReview> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, reviewData);
    return response.data;
  } catch (error) {
    console.error(`Error updating review with id ${id}:`, error);
    throw error;
  }
};

export const deleteReview = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting review with id ${id}:`, error);
    throw error;
  }
};
