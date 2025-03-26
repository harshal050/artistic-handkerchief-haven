
import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

const ReviewSchema: Schema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
