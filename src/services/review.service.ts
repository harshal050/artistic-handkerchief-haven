
import { IReview } from '../models/Review';

// Get all reviews
export const getAllReviews = async (): Promise<IReview[]> => {
  try {
    // Use the cached data from window object
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
    };
    
    // Update the cached data
    if (window.cachedData) {
      window.cachedData.reviews = [...reviews, newReview];
    }
    
    return newReview;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Update an existing review
export const updateReview = async (id: string, reviewData: Partial<IReview>): Promise<IReview> => {
  try {
    const reviews = window.cachedData?.reviews || [];
    
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
    if (window.cachedData) {
      const updatedReviews = [...reviews];
      updatedReviews[reviewIndex] = updatedReview;
      window.cachedData.reviews = updatedReviews;
    }
    
    return updatedReview;
  } catch (error) {
    console.error(`Error updating review with ID ${id}:`, error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (id: string): Promise<IReview | null> => {
  try {
    const reviews = window.cachedData?.reviews || [];
    
    // Find the review to delete
    const reviewToDelete = reviews.find(r => r._id === id);
    
    if (!reviewToDelete) {
      throw new Error(`Review with ID ${id} not found`);
    }
    
    // Update the cached data
    if (window.cachedData) {
      window.cachedData.reviews = reviews.filter(r => r._id !== id);
    }
    
    return reviewToDelete;
  } catch (error) {
    console.error(`Error deleting review with ID ${id}:`, error);
    throw error;
  }
};
