
import { ISettings } from '../models/Settings';

export const getSettings = async (): Promise<ISettings | null> => {
  try {
    return window.cachedData?.settings || null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settingsData: any): Promise<ISettings | null> => {
  try {
    console.log('Updating settings:', settingsData);
    return {
      _id: '1',
      ...settingsData
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
