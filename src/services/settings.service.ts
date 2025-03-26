
import Settings, { ISettings } from '../models/Settings';

export const getSettings = async (): Promise<ISettings | null> => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings exist, create default settings
    if (!settings) {
      settings = await createDefaultSettings();
    }
    
    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settingsData: any): Promise<ISettings | null> => {
  try {
    let settings = await Settings.findOne();
    
    if (settings) {
      // Update existing settings
      return await Settings.findByIdAndUpdate(settings._id, settingsData, { new: true });
    } else {
      // Create new settings if they don't exist
      const newSettings = new Settings(settingsData);
      return await newSettings.save();
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

const createDefaultSettings = async (): Promise<ISettings> => {
  try {
    const defaultSettings = new Settings({
      whatsappNumber: "917434902998",
      instagramId: "_rk.creation1",
      phoneNumber: "917434902998",
      location: "Vadodara, Gujarat, India",
      adminUsername: "rkcreation",
      adminPassword: "Krishna@2232",
      mongoDbUrl: "mongodb+srv://harshal_050:Harshal%402772@cluster0.hchtgxj.mongodb.net/gwokdatabase?retryWrites=true&w=majority",
      cloudinaryApiKey: "",
      cloudinaryApiSecret: "",
      cloudinaryCloudName: ""
    });
    
    return await defaultSettings.save();
  } catch (error) {
    console.error('Error creating default settings:', error);
    throw error;
  }
};
