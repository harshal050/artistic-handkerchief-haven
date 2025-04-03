
import { ISettings } from '../models/Settings';
import api from '../frontend/api/api';

// Get settings
export const getSettings = async (): Promise<ISettings | null> => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

// Update settings
export const updateSettings = async (settingsData: any): Promise<ISettings | null> => {
  try {
    const response = await api.put('/settings', settingsData);
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
