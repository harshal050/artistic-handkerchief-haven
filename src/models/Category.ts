
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
