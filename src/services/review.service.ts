
import { IReview } from '../models/Review';
import api from '../frontend/api/api';

// Get all reviews
export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }
};

// Get reviews by product ID
export const getReviewsByProductId = async (productId: string): Promise<IReview[]> => {
  try {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product with id ${productId}:`, error);
    return [];
  }
};

// Create a new review
export const createReview = async (reviewData: any): Promise<IReview> => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Update a review
export const updateReview = async (id: string, reviewData: any): Promise<IReview | null> => {
  try {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  } catch (error) {
    console.error(`Error updating review with ID ${id}:`, error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (id: string): Promise<IReview | null> => {
  try {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting review with ID ${id}:`, error);
    throw error;
  }
};
