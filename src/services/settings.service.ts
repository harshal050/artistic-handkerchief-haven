
import { ISettings } from "@/models/Settings";
import axios from "axios";

const API_URL = "/api/settings";

export const getSettings = async (): Promise<ISettings> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settingsData: Partial<ISettings>): Promise<ISettings> => {
  try {
    const response = await axios.put(API_URL, settingsData);
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
