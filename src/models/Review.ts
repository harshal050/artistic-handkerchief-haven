
export interface IReview {
  _id?: string;
  productId?: string;
  userName: string;
  rating: number;
  comment: string;
  date?: Date;
  createdAt?: Date;
}
