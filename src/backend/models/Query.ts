
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuery extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'done';
  date: Date;
  createdAt: Date;
}

const QuerySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'done'], default: 'pending' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const Query = mongoose.model<IQuery>('Query', QuerySchema);

export default Query;
