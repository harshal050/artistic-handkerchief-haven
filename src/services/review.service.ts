
import { IReview } from '../models/Review';

// Get all reviews
export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    return window.cachedData?.reviews || [];
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
};

// Get reviews by product ID
export const getReviewsByProductId = async (productId: string): Promise<IReview[]> => {
  try {
    const reviews = window.cachedData?.reviews || [];
    return reviews.filter(review => review.productId === productId);
  } catch (error) {
    console.error(`Error fetching reviews for product with id ${productId}:`, error);
    throw error;
  }
};

// Create a new review
export const createReview = async (reviewData: any): Promise<IReview> => {
  try {
    const reviews = window.cachedData?.reviews || [];
    
    // Create a new review with an ID
    const newReview: IReview = {
      _id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date(),
    };
    
    // Update cached data
    if (window.cachedData) {
      window.cachedData.reviews = [...reviews, newReview];
    } else {
      console.warn('No cached data found, review will not persist');
    }
    
    return newReview;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (id: string): Promise<IReview | null> => {
  try {
    if (!window.cachedData?.reviews) {
      console.warn('No cached reviews found, cannot delete');
      return null;
    }
    
    const reviews = window.cachedData.reviews;
    
    // Find review to delete
    const reviewToDelete = reviews.find(r => r._id === id);
    
    if (!reviewToDelete) {
      throw new Error(`Review with ID ${id} not found`);
    }
    
    // Update cached data
    window.cachedData.reviews = reviews.filter(r => r._id !== id);
    
    return reviewToDelete;
  } catch (error) {
    console.error(`Error deleting review with ID ${id}:`, error);
    throw error;
  }
};
