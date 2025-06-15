
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Palette, Monitor, Crown, Sparkles, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';

interface StoreCustomizerProps {
  userPlan: 'free' | 'pro';
  onSave: (settings: any) => void;
}

const StoreCustomizer: React.FC<StoreCustomizerProps> = ({ userPlan, onSave }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    logo: '',
    coverBanner: '',
    theme: 'modern',
    backgroundColor: '#ffffff',
    accentColor: '#25D366',
    cardLayout: 'modern',
    font: 'Inter',
    showReviews: true,
    showTestimonials: true,
    showOffers: true,
    ctaButtonText: 'Buy Now',
    storeName: 'Your Store',
    storeDescription: 'Welcome to our amazing store!'
  });

  const handleSave = () => {
    onSave(settings);
    toast({
      title: "🎉 Settings Saved!",
      description: "Your store has been customized successfully",
    });
  };

  const themes = [
    { id: 'modern', name: 'Modern Minimal', preview: 'Clean & Professional' },
    { id: 'vibrant', name: 'Vibrant', preview: 'Bold & Colorful', pro: true },
    { id: 'elegant', name: 'Elegant', preview: 'Sophisticated', pro: true },
    { id: 'playful', name: 'Playful', preview: 'Fun & Friendly', pro: true }
  ];

  const colorPresets = [
    { name: 'WhatsApp Green', color: '#25D366' },
    { name: 'Instagram Pink', color: '#E1306C' },
    { name: 'Facebook Blue', color: '#1877F2' },
    { name: 'YouTube Red', color: '#FF0000' },
    { name: 'Twitter Blue', color: '#1DA1F2' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-purple-600" />
            Store Customizer
          </h2>
          <p className="text-gray-600 mt-2">Make your store stand out with professional customization</p>
        </div>
        <Button onClick={handleSave} size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Sparkles className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Identity */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-600" />
                Brand Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Store Name</Label>
                  <Input
                    value={settings.storeName}
                    onChange={(e) => setSettings(prev => ({ ...prev, storeName: e.target.value }))}
                    placeholder="Enter your store name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Store Description</Label>
                  <Input
                    value={settings.storeDescription}
                    onChange={(e) => setSettings(prev => ({ ...prev, storeDescription: e.target.value }))}
                    placeholder="Brief description of your store"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  label="Store Logo"
                  onImageUpload={(url) => setSettings(prev => ({ ...prev, logo: url }))}
                  currentImage={settings.logo}
                  aspectRatio="aspect-square"
                />
                
                <ImageUpload
                  label={`Cover Banner ${userPlan === 'free' ? '(Pro Feature)' : ''}`}
                  onImageUpload={(url) => {
                    if (userPlan === 'free') {
                      toast({
                        title: "Upgrade Required",
                        description: "Cover banner is available in Pro plan",
                        variant: "destructive"
                      });
                      return;
                    }
                    setSettings(prev => ({ ...prev, coverBanner: url }));
                  }}
                  currentImage={settings.coverBanner}
                  aspectRatio="aspect-[3/1]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Choose Your Theme</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      settings.theme === theme.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${theme.pro && userPlan === 'free' ? 'opacity-60' : ''}`}
                    onClick={() => {
                      if (theme.pro && userPlan === 'free') {
                        toast({
                          title: "Upgrade Required",
                          description: `${theme.name} theme is available in Pro plan`,
                          variant: "destructive"
                        });
                        return;
                      }
                      setSettings(prev => ({ ...prev, theme: theme.id }));
                    }}
                  >
                    {theme.pro && userPlan === 'free' && (
                      <Crown className="absolute top-2 right-2 h-4 w-4 text-orange-500" />
                    )}
                    <h4 className="font-semibold">{theme.name}</h4>
                    <p className="text-sm text-gray-600">{theme.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Color Customization */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Colors & Styling</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label>Accent Color</Label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        settings.accentColor === preset.color
                          ? 'border-gray-800 scale-110'
                          : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: preset.color }}
                      onClick={() => setSettings(prev => ({ ...prev, accentColor: preset.color }))}
                      title={preset.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <Label>CTA Button Text</Label>
                <Input
                  value={settings.ctaButtonText}
                  onChange={(e) => setSettings(prev => ({ ...prev, ctaButtonText: e.target.value }))}
                  placeholder="Buy Now"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <Card className="border-0 shadow-lg sticky top-6">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-gray-100 p-4">
              <div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                style={{ backgroundColor: settings.backgroundColor }}
              >
                {/* Header */}
                <div className="p-4 border-b text-center" style={{ borderColor: settings.accentColor + '20' }}>
                  {settings.logo ? (
                    <img src={settings.logo} alt="Logo" className="w-12 h-12 mx-auto rounded-full mb-2" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
                  )}
                  <h3 className="font-bold text-lg">{settings.storeName}</h3>
                  <p className="text-sm text-gray-600">{settings.storeDescription}</p>
                </div>

                {/* Cover Banner */}
                {settings.coverBanner && (
                  <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${settings.coverBanner})` }}></div>
                )}

                {/* Products Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`bg-white border rounded-lg p-3 ${settings.theme === 'modern' ? 'shadow-sm' : 'shadow-md'}`}>
                        <div className="aspect-square bg-gray-200 rounded mb-2"></div>
                        <p className="text-xs font-medium">Product {i}</p>
                        <p className="text-xs text-green-600">₹999</p>
                        <button 
                          className="w-full text-xs text-white py-1 px-2 rounded mt-1 transition-colors"
                          style={{ backgroundColor: settings.accentColor }}
                        >
                          {settings.ctaButtonText}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreCustomizer;
