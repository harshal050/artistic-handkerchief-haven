
export interface ISettings {
  _id?: string;
  whatsappNumber: string;
  instagramId: string;
  phoneNumber: string;
  location: string;
  adminUsername: string;
  adminPassword: string;
  mongoDbUrl: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
  cloudinaryCloudName: string;
  // Add missing fields
  logo?: string;
  siteName?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  aboutShort?: string;
  storeName?: string;
}
