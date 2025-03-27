
export interface IProduct {
  _id?: string;
  name: string;
  category: string;
  price: number;
  discount?: number;
  description: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
