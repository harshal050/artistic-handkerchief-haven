
import { IQuery } from '../../models/Query';

export const sampleQueries: IQuery[] = [
  {
    _id: '1',
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "9876543210",
    message: "Do you customize designs for weddings?",
    status: "pending",
    date: new Date("2023-12-10"),
    createdAt: new Date("2023-12-10")
  },
  {
    _id: '2',
    name: "Meera Singh",
    email: "meera@example.com",
    phone: "8765432109",
    message: "What's the delivery time for orders?",
    status: "done",
    date: new Date("2023-12-05"),
    createdAt: new Date("2023-12-05")
  }
];
