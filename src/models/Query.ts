
export interface IQuery {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'done';
  date?: Date;
  createdAt?: Date;
}
