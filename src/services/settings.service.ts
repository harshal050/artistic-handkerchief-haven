
import { ISettings } from '../models/Settings';

// Get settings
export const getSettings = async (): Promise<ISettings | null> => {
  try {
    return window.cachedData?.settings || null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

// Update settings
export const updateSettings = async (settingsData: any): Promise<ISettings | null> => {
  try {
    if (!window.cachedData) {
      console.warn('No cached data found, cannot update settings');
      return null;
    }
    
    // Create updated settings
    const updatedSettings = {
      ...window.cachedData.settings,
      ...settingsData
    };
    
    // Update cached data
    window.cachedData.settings = updatedSettings;
    
    return updatedSettings;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
