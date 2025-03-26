
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDatabase } from "@/context/DatabaseContext";
import { toast } from "sonner";
import { updateSettings } from '@/services/settings.service';

const SettingsPanel = () => {
  const { settings, refreshData } = useDatabase();
  const [localSettings, setLocalSettings] = useState<any>(settings || {});

  // Update local settings when database settings change
  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      await updateSettings(localSettings);
      await refreshData();
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error("Failed to update settings");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Configure the general settings for your store.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Store Name</label>
              <Input 
                value={localSettings?.storeName || ""} 
                onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                placeholder="RK.Creation"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Store Email</label>
              <Input 
                value={localSettings?.email || ""} 
                onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                placeholder="contact@rkcreation.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone Number</label>
              <Input 
                value={localSettings?.phone || ""} 
                onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                placeholder="+91 1234567890"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">WhatsApp Number</label>
              <Input 
                value={localSettings?.whatsapp || ""} 
                onChange={(e) => setLocalSettings({ ...localSettings, whatsapp: e.target.value })}
                placeholder="+91 1234567890"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Store Address</label>
            <Textarea 
              value={localSettings?.address || ""} 
              onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
              placeholder="123 Main Street, City, State, ZIP"
              rows={3}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">About Us (Short)</label>
            <Textarea 
              value={localSettings?.aboutShort || ""} 
              onChange={(e) => setLocalSettings({ ...localSettings, aboutShort: e.target.value })}
              placeholder="Short description about your store"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            <Save size={16} className="mr-2" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Configure your social media profiles.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Facebook</label>
              <Input 
                value={localSettings?.socialLinks?.facebook || ""} 
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { 
                    ...(localSettings?.socialLinks || {}), 
                    facebook: e.target.value 
                  } 
                })}
                placeholder="https://facebook.com/rkcreation"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Instagram</label>
              <Input 
                value={localSettings?.socialLinks?.instagram || ""} 
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { 
                    ...(localSettings?.socialLinks || {}), 
                    instagram: e.target.value 
                  } 
                })}
                placeholder="https://instagram.com/rkcreation"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Twitter</label>
              <Input 
                value={localSettings?.socialLinks?.twitter || ""} 
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { 
                    ...(localSettings?.socialLinks || {}), 
                    twitter: e.target.value 
                  } 
                })}
                placeholder="https://twitter.com/rkcreation"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">YouTube</label>
              <Input 
                value={localSettings?.socialLinks?.youtube || ""} 
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { 
                    ...(localSettings?.socialLinks || {}), 
                    youtube: e.target.value 
                  } 
                })}
                placeholder="https://youtube.com/rkcreation"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            <Save size={16} className="mr-2" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
          <CardDescription>
            Configure admin login credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Admin Username</label>
              <Input 
                value={localSettings?.adminUsername || ""} 
                onChange={(e) => setLocalSettings({ ...localSettings, adminUsername: e.target.value })}
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Admin Password</label>
              <Input 
                type="password"
                value={localSettings?.adminPassword || ""} 
                onChange={(e) => setLocalSettings({ ...localSettings, adminPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>
            <Save size={16} className="mr-2" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPanel;
