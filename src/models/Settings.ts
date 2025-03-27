
export interface ISettings {
  _id?: string;
  storeName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  aboutShort?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  adminUsername?: string;
  adminPassword?: string;
}
