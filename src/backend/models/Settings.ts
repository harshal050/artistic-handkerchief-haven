
import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
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
}

const SettingsSchema: Schema = new Schema({
  whatsappNumber: { type: String, default: "" },
  instagramId: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  location: { type: String, default: "" },
  adminUsername: { type: String, default: "admin" },
  adminPassword: { type: String, default: "admin" },
  mongoDbUrl: { type: String, default: "" },
  cloudinaryApiKey: { type: String, default: "" },
  cloudinaryApiSecret: { type: String, default: "" },
  cloudinaryCloudName: { type: String, default: "" }
});

const Settings = mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
