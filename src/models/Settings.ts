
export interface ISettings {
  _id: string;
  siteName?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  whatsappNumber?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  features?: {
    enableReviews?: boolean;
    enableQueries?: boolean;
    enableNewsletter?: boolean;
  };
}
