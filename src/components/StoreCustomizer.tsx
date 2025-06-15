
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, Palette, Monitor, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreCustomizerProps {
  userPlan: 'free' | 'pro';
  onSave: (settings: any) => void;
}

const StoreCustomizer: React.FC<StoreCustomizerProps> = ({ userPlan, onSave }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    logo: null as File | null,
    coverBanner: null as File | null,
    theme: 'grid',
    backgroundColor: '#ffffff',
    cardLayout: 'rounded',
    font: 'Inter',
    showReviews: true,
    showTestimonials: true,
    showOffers: true,
    ctaButtonText: 'Buy Now'
  });

  const handleFileUpload = (field: 'logo' | 'coverBanner', file: File | null) => {
    setSettings(prev => ({ ...prev, [field]: file }));
  };

  const handleSave = () => {
    onSave(settings);
    toast({
      title: "Settings Saved!",
      description: "Your store customization has been updated",
    });
  };

  const isPaidFeature = (feature: string) => {
    const paidFeatures = ['coverBanner', 'theme', 'backgroundColor', 'cardLayout', 'font'];
    return paidFeatures.includes(feature) && userPlan === 'free';
  };

  const showUpgradeMessage = (feature: string) => {
    toast({
      title: "Upgrade Required",
      description: `${feature} is available in Pro plan`,
      variant: "destructive"
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🎨 Store Customizer</h2>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Store Logo</Label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      Upload logo
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFileUpload('logo', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </div>
              {settings.logo && (
                <p className="text-sm text-green-600 mt-2">✓ {settings.logo.name}</p>
              )}
            </div>

            <div>
              <Label>Cover Banner {userPlan === 'free' && <Crown className="inline h-4 w-4 text-orange-500" />}</Label>
              <div className={`mt-2 ${isPaidFeature('coverBanner') ? 'opacity-50' : ''}`}>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className={`cursor-pointer bg-white rounded-md font-medium ${
                        isPaidFeature('coverBanner') ? 'text-gray-400' : 'text-indigo-600 hover:text-indigo-500'
                      }`}>
                        Upload cover banner
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          disabled={isPaidFeature('coverBanner')}
                          onChange={(e) => {
                            if (isPaidFeature('coverBanner')) {
                              showUpgradeMessage('Cover Banner');
                              return;
                            }
                            handleFileUpload('coverBanner', e.target.files?.[0] || null);
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">Recommended: 1200x400px</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Theme & Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Store Theme {userPlan === 'free' && <Crown className="inline h-4 w-4 text-orange-500" />}</Label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={settings.theme}
                disabled={isPaidFeature('theme')}
                onChange={(e) => {
                  if (isPaidFeature('theme')) {
                    showUpgradeMessage('Advanced Themes');
                    return;
                  }
                  setSettings(prev => ({ ...prev, theme: e.target.value }));
                }}
              >
                <option value="grid">Grid Layout</option>
                {userPlan === 'pro' && (
                  <>
                    <option value="list">List Layout</option>
                    <option value="showcase">Showcase Layout</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <Label>Background Color {userPlan === 'free' && <Crown className="inline h-4 w-4 text-orange-500" />}</Label>
              <div className="flex mt-1">
                <input
                  type="color"
                  className="w-16 h-10 border rounded-l-md"
                  value={settings.backgroundColor}
                  disabled={isPaidFeature('backgroundColor')}
                  onChange={(e) => {
                    if (isPaidFeature('backgroundColor')) {
                      showUpgradeMessage('Custom Colors');
                      return;
                    }
                    setSettings(prev => ({ ...prev, backgroundColor: e.target.value }));
                  }}
                />
                <Input
                  className="rounded-l-none"
                  value={settings.backgroundColor}
                  disabled={isPaidFeature('backgroundColor')}
                  onChange={(e) => {
                    if (isPaidFeature('backgroundColor')) {
                      showUpgradeMessage('Custom Colors');
                      return;
                    }
                    setSettings(prev => ({ ...prev, backgroundColor: e.target.value }));
                  }}
                />
              </div>
            </div>

            <div>
              <Label>Card Layout {userPlan === 'free' && <Crown className="inline h-4 w-4 text-orange-500" />}</Label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={settings.cardLayout}
                disabled={isPaidFeature('cardLayout')}
                onChange={(e) => {
                  if (isPaidFeature('cardLayout')) {
                    showUpgradeMessage('Card Layouts');
                    return;
                  }
                  setSettings(prev => ({ ...prev, cardLayout: e.target.value }));
                }}
              >
                <option value="rounded">Rounded Corners</option>
                {userPlan === 'pro' && <option value="square">Square Corners</option>}
              </select>
            </div>

            <div>
              <Label>Font {userPlan === 'free' && <Crown className="inline h-4 w-4 text-orange-500" />}</Label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={settings.font}
                disabled={isPaidFeature('font')}
                onChange={(e) => {
                  if (isPaidFeature('font')) {
                    showUpgradeMessage('Custom Fonts');
                    return;
                  }
                  setSettings(prev => ({ ...prev, font: e.target.value }));
                }}
              >
                <option value="Inter">Inter</option>
                {userPlan === 'pro' && (
                  <>
                    <option value="Poppins">Poppins</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                  </>
                )}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Section Toggles */}
        <Card>
          <CardHeader>
            <CardTitle>Section Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showReviews}
                  onChange={(e) => setSettings(prev => ({ ...prev, showReviews: e.target.checked }))}
                />
                <span>Show Reviews Section</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showTestimonials}
                  onChange={(e) => setSettings(prev => ({ ...prev, showTestimonials: e.target.checked }))}
                />
                <span>Show Testimonials</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showOffers}
                  onChange={(e) => setSettings(prev => ({ ...prev, showOffers: e.target.checked }))}
                />
                <span>Show Offers Section</span>
              </label>
            </div>

            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={settings.ctaButtonText}
                onChange={(e) => setSettings(prev => ({ ...prev, ctaButtonText: e.target.value }))}
                placeholder="Buy Now"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="border rounded-lg p-4 min-h-64"
              style={{ backgroundColor: settings.backgroundColor }}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <h3 className="text-lg font-bold">Your Store Name</h3>
                <p className="text-sm text-gray-600">Store preview</p>
              </div>
              
              <div className={`grid grid-cols-2 gap-2 ${settings.theme === 'list' ? 'grid-cols-1' : ''}`}>
                {[1,2,3,4].map((i) => (
                  <div 
                    key={i} 
                    className={`aspect-square bg-white border ${
                      settings.cardLayout === 'rounded' ? 'rounded-lg' : 'rounded-none'
                    } p-2 flex flex-col items-center justify-center`}
                  >
                    <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                    <p className="text-xs font-medium">Product {i}</p>
                    <p className="text-xs text-green-600">₹999</p>
                    <button className="text-xs bg-green-500 text-white px-2 py-1 rounded mt-1">
                      {settings.ctaButtonText}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreCustomizer;
