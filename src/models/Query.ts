
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuery extends Document {
  name: string;
  phone: string;
  message: string;
  status: 'pending' | 'done';
  date: Date;
}

const QuerySchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'done'], default: 'pending' },
  date: { type: Date, default: Date.now }
});

const Query = mongoose.model<IQuery>('Query', QuerySchema);

export default Query;
