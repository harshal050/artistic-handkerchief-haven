
import { IReview } from '../models/Review';

// Get all reviews
export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    if (!window.cachedData?.reviews) {
      console.warn('No cached reviews found, returning empty array');
      return [];
    }
    return window.cachedData.reviews;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
};

// Get reviews by product ID
export const getReviewsByProductId = async (productId: string): Promise<IReview[]> => {
  try {
    if (!window.cachedData?.reviews) {
      console.warn('No cached reviews found, returning empty array');
      return [];
    }
    return window.cachedData.reviews.filter(review => review.productId === productId);
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    throw error;
  }
};

// Create a new review
export const createReview = async (reviewData: any): Promise<IReview> => {
  try {
    const reviews = window.cachedData?.reviews || [];
    
    // Create a new review with an ID
    const newReview: IReview = {
      _id: Date.now().toString(), // Generate a unique ID
      ...reviewData,
      createdAt: new Date(),
      date: new Date(),
    };
    
    // Update the cached data
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

// Update an existing review
export const updateReview = async (id: string, reviewData: Partial<IReview>): Promise<IReview | null> => {
  try {
    if (!window.cachedData?.reviews) {
      console.warn('No cached reviews found, cannot update');
      return null;
    }
    
    const reviews = window.cachedData.reviews;
    
    // Find the review to update
    const reviewIndex = reviews.findIndex(r => r._id === id);
    
    if (reviewIndex === -1) {
      throw new Error(`Review with ID ${id} not found`);
    }
    
    // Create the updated review
    const updatedReview = {
      ...reviews[reviewIndex],
      ...reviewData,
    };
    
    // Update the cached data
    const updatedReviews = [...reviews];
    updatedReviews[reviewIndex] = updatedReview;
    window.cachedData.reviews = updatedReviews;
    
    return updatedReview;
  } catch (error) {
    console.error(`Error updating review with ID ${id}:`, error);
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
    
    // Find the review to delete
    const reviewToDelete = reviews.find(r => r._id === id);
    
    if (!reviewToDelete) {
      throw new Error(`Review with ID ${id} not found`);
    }
    
    // Update the cached data
    window.cachedData.reviews = reviews.filter(r => r._id !== id);
    
    return reviewToDelete;
  } catch (error) {
    console.error(`Error deleting review with ID ${id}:`, error);
    throw error;
  }
};
