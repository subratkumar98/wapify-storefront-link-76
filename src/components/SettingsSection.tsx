
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Settings, User, Bell, Shield, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsSectionProps {
  userPlan: 'free' | 'pro';
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ userPlan }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    businessName: 'Your Store',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    notifications: {
      orderUpdates: true,
      promotionalEmails: false,
      analyticsReports: false
    },
    privacy: {
      showOwnerInfo: false,
      allowReviews: true,
      indexBySearshEngines: true
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved!",
      description: "Your store settings have been updated",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Store Settings
        </h2>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                value={settings.ownerName}
                onChange={(e) => setSettings(prev => ({ ...prev, ownerName: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="address">Business Address</Label>
              <textarea
                id="address"
                className="w-full p-3 border rounded-md resize-none"
                rows={3}
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter your business address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Order Updates</span>
                <p className="text-sm text-gray-600">Get notified about new orders</p>
              </div>
              <Switch
                checked={settings.notifications.orderUpdates}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, orderUpdates: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Promotional Emails</span>
                <p className="text-sm text-gray-600">Receive marketing tips and offers</p>
              </div>
              <Switch
                checked={settings.notifications.promotionalEmails}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, promotionalEmails: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">Analytics Reports</span>
                {userPlan === 'free' && <Crown className="h-4 w-4 text-orange-500" />}
                <p className="text-sm text-gray-600">Weekly analytics summary</p>
              </div>
              <Switch
                checked={settings.notifications.analyticsReports}
                disabled={userPlan === 'free'}
                onCheckedChange={(checked) => {
                  if (userPlan === 'free') {
                    toast({
                      title: "Upgrade Required",
                      description: "Analytics reports available in Pro plan",
                      variant: "destructive"
                    });
                    return;
                  }
                  setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, analyticsReports: checked }
                  }));
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Visibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Show Owner Information</span>
                <p className="text-sm text-gray-600">Display owner name publicly</p>
              </div>
              <Switch
                checked={settings.privacy.showOwnerInfo}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, showOwnerInfo: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Allow Customer Reviews</span>
                <p className="text-sm text-gray-600">Let customers leave reviews</p>
              </div>
              <Switch
                checked={settings.privacy.allowReviews}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, allowReviews: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Search Engine Indexing</span>
                <p className="text-sm text-gray-600">Allow Google to find your store</p>
              </div>
              <Switch
                checked={settings.privacy.indexBySearshEngines}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, indexBySearshEngines: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Information */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {userPlan === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </h3>
              <p className="text-gray-600">
                {userPlan === 'pro' 
                  ? 'Unlimited products, advanced analytics, and premium features'
                  : 'Up to 3 products, basic features'
                }
              </p>
            </div>
            {userPlan === 'free' && (
              <Button className="bg-orange-500 hover:bg-orange-600">
                Upgrade to Pro
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
