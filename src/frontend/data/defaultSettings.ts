
import { ISettings } from '../../models/Settings';

export const defaultSettings: ISettings = {
  _id: '1',
  siteName: "RK Creation",
  logo: "/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png",
  email: "rkcreation@example.com",
  phone: "917434902998",
  address: "Vadodara, Gujarat, India",
  whatsappNumber: "917434902998",
  socialLinks: {
    facebook: "https://facebook.com/rkcreation",
    twitter: "https://twitter.com/rkcreation",
    instagram: "_rk.creation1",
    youtube: "https://youtube.com/rkcreation"
  },
  features: {
    enableReviews: true,
    enableQueries: true,
    enableNewsletter: false
  }
};
