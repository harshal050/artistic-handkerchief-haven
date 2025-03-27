
import { IReview } from '../models/Review';

export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    return window.cachedData?.reviews || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const getReviewsByProductId = async (productId: string): Promise<IReview[]> => {
  try {
    const reviews = await getAllReviews();
    return reviews.filter(review => review.productId === productId);
  } catch (error) {
    console.error(`Error fetching reviews for product with id ${productId}:`, error);
    throw error;
  }
};

export const createReview = async (reviewData: any): Promise<IReview> => {
  try {
    console.log('Creating review:', reviewData);
    return {
      _id: Date.now().toString(),
      ...reviewData,
      date: new Date(),
      createdAt: new Date()
    };
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const deleteReview = async (id: string): Promise<IReview | null> => {
  try {
    console.log(`Deleting review with id ${id}`);
    return null;
  } catch (error) {
    console.error(`Error deleting review with id ${id}:`, error);
    throw error;
  }
};
