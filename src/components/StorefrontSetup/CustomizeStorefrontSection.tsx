
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft, Save, Palette, Upload, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '../ImageUpload';

interface CustomizeStorefrontSectionProps {
  onSave: () => void;
  onBack: () => void;
  userPlan: 'free' | 'pro';
}

const CustomizeStorefrontSection: React.FC<CustomizeStorefrontSectionProps> = ({ onSave, onBack, userPlan }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    storeLogo: '',
    coverImage: '',
    promoBanner: '',
    colorTheme: '#25D366',
    fontFamily: 'Inter',
    layoutView: 'grid',
    cardDesign: 'rounded',
    showTestimonials: true,
    showRatings: true,
    animatedDiscountGraphic: ''
  });

  const colorPresets = [
    { name: 'WhatsApp Green', color: '#25D366' },
    { name: 'Instagram Pink', color: '#E1306C' },
    { name: 'Facebook Blue', color: '#1877F2' },
    { name: 'YouTube Red', color: '#FF0000' },
    { name: 'Twitter Blue', color: '#1DA1F2' },
    { name: 'Purple', color: '#8B5CF6' }
  ];

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins'
  ];

  const handleSave = () => {
    toast({
      title: "🎨 Storefront Customized!",
      description: "Your store branding has been saved successfully",
    });
    onSave();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              🔙 Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Palette className="h-8 w-8 text-purple-600" />
                🛠️ Customize Your Storefront
              </h2>
              <p className="text-gray-600 mt-1">Make your store stand out with professional branding</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            💾 Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Uploads */}
            <Card>
              <CardHeader>
                <CardTitle>📷 Store Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload
                    label="Store Logo"
                    onImageUpload={(url) => setSettings(prev => ({ ...prev, storeLogo: url }))}
                    currentImage={settings.storeLogo}
                    aspectRatio="aspect-square"
                  />
                  
                  <ImageUpload
                    label="Store Cover Image"
                    onImageUpload={(url) => setSettings(prev => ({ ...prev, coverImage: url }))}
                    currentImage={settings.coverImage}
                    aspectRatio="aspect-[3/1]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload
                    label="Promotional Banner (e.g., Flat ₹999 OFF)"
                    onImageUpload={(url) => setSettings(prev => ({ ...prev, promoBanner: url }))}
                    currentImage={settings.promoBanner}
                    aspectRatio="aspect-[4/1]"
                  />
                  
                  <ImageUpload
                    label="🔥 Animated Discount Graphic"
                    onImageUpload={(url) => setSettings(prev => ({ ...prev, animatedDiscountGraphic: url }))}
                    currentImage={settings.animatedDiscountGraphic}
                    aspectRatio="aspect-square"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Design Settings */}
            <Card>
              <CardHeader>
                <CardTitle>🎨 Design & Theme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Theme */}
                <div>
                  <Label className="text-base font-medium">Store Color Theme</Label>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        className={`w-12 h-12 rounded-xl border-2 transition-all flex items-center justify-center ${
                          settings.colorTheme === preset.color
                            ? 'border-gray-800 scale-110 shadow-lg'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: preset.color }}
                        onClick={() => setSettings(prev => ({ ...prev, colorTheme: preset.color }))}
                        title={preset.name}
                      >
                        {settings.colorTheme === preset.color && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={settings.colorTheme}
                        onChange={(e) => setSettings(prev => ({ ...prev, colorTheme: e.target.value }))}
                        className="w-12 h-12 rounded-xl border-2 border-gray-300 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Font Selection */}
                <div>
                  <Label htmlFor="fontFamily" className="text-base font-medium">Font Selection</Label>
                  <select 
                    id="fontFamily"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                    value={settings.fontFamily}
                    onChange={(e) => setSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Layout Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium">Layout View</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { id: 'grid', label: 'Grid', icon: '⊞' },
                        { id: 'list', label: 'List', icon: '☰' },
                        { id: 'showcase', label: 'Showcase', icon: '◐' }
                      ].map(layout => (
                        <button
                          key={layout.id}
                          className={`p-3 border rounded-lg text-center transition-all ${
                            settings.layoutView === layout.id
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setSettings(prev => ({ ...prev, layoutView: layout.id }))}
                        >
                          <div className="text-lg mb-1">{layout.icon}</div>
                          <div className="text-xs">{layout.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Card Design</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        { id: 'rounded', label: 'Rounded', icon: '▢' },
                        { id: 'square', label: 'Square', icon: '▣' },
                        { id: 'minimal', label: 'Minimal', icon: '▭' }
                      ].map(design => (
                        <button
                          key={design.id}
                          className={`p-3 border rounded-lg text-center transition-all ${
                            settings.cardDesign === design.id
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setSettings(prev => ({ ...prev, cardDesign: design.id }))}
                        >
                          <div className="text-lg mb-1">{design.icon}</div>
                          <div className="text-xs">{design.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toggle Sections */}
                <div>
                  <Label className="text-base font-medium">Toggle Sections</Label>
                  <div className="space-y-3 mt-3">
                    <label className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Show Testimonials</span>
                      <input 
                        type="checkbox" 
                        checked={settings.showTestimonials}
                        onChange={(e) => setSettings(prev => ({ ...prev, showTestimonials: e.target.checked }))}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Show Star Ratings</span>
                      <input 
                        type="checkbox" 
                        checked={settings.showRatings}
                        onChange={(e) => setSettings(prev => ({ ...prev, showRatings: e.target.checked }))}
                        className="rounded"
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gray-100 p-4">
                <div 
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                  style={{ fontFamily: settings.fontFamily }}
                >
                  {/* Header */}
                  <div className="p-4 text-center" style={{ borderBottom: `2px solid ${settings.colorTheme}20` }}>
                    {settings.storeLogo ? (
                      <img src={settings.storeLogo} alt="Logo" className="w-16 h-16 mx-auto rounded-full mb-2 object-cover" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                        🏪
                      </div>
                    )}
                    <h3 className="font-bold text-lg">Your Store</h3>
                    {settings.promoBanner && (
                      <div className="mt-2">
                        <img src={settings.promoBanner} alt="Promo" className="w-full h-8 object-cover rounded" />
                      </div>
                    )}
                  </div>

                  {/* Cover Image */}
                  {settings.coverImage && (
                    <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${settings.coverImage})` }}></div>
                  )}

                  {/* Products Preview */}
                  <div className="p-4">
                    <div className={`grid ${settings.layoutView === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                      {[1,2].map((i) => (
                        <div 
                          key={i} 
                          className={`bg-white border p-3 ${
                            settings.cardDesign === 'rounded' ? 'rounded-lg' : 
                            settings.cardDesign === 'square' ? 'rounded-none' : 'rounded-sm'
                          } shadow-sm`}
                        >
                          <div className="aspect-square bg-gray-200 rounded mb-2"></div>
                          <p className="text-xs font-medium">Sample Product {i}</p>
                          <p className="text-xs text-green-600">₹999</p>
                          <button 
                            className="w-full text-xs text-white py-1 px-2 rounded mt-1 transition-colors"
                            style={{ backgroundColor: settings.colorTheme }}
                          >
                            Buy Now
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
    </div>
  );
};

export default CustomizeStorefrontSection;
