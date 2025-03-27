
import { IReview } from '../../models/Review';

export const sampleReviews: IReview[] = [
  {
    _id: '1',
    productId: '1',
    userName: "Raj Patel",
    rating: 5,
    comment: "Beautiful design and excellent quality!",
    date: new Date("2023-12-15"),
    createdAt: new Date("2023-12-15")
  },
  {
    _id: '2',
    productId: '1',
    userName: "Priya Sharma",
    rating: 4,
    comment: "Lovely handkerchief, perfect for my wedding.",
    date: new Date("2023-11-20"),
    createdAt: new Date("2023-11-20")
  },
  {
    _id: '3',
    productId: '2',
    userName: "Amit Kumar",
    rating: 5,
    comment: "Exceptional craftsmanship and beautiful design!",
    date: new Date("2023-10-15"),
    createdAt: new Date("2023-10-15")
  }
];
