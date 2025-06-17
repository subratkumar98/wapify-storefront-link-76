
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Eye, 
  Copy, 
  Settings, 
  Bell,
  ShoppingCart,
  Star,
  Heart,
  Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreDashboardHeaderProps {
  storeName: string;
  storeHandle: string;
  userPlan: 'free' | 'pro';
}

const StoreDashboardHeader: React.FC<StoreDashboardHeaderProps> = ({ 
  storeName, 
  storeHandle, 
  userPlan 
}) => {
  const { toast } = useToast();
  const [showStorePreview, setShowStorePreview] = useState(false);
  const [storeCustomization, setStoreCustomization] = useState<any>(null);
  const storeUrl = `getwapify.com/@${storeHandle}`;

  useEffect(() => {
    // Load store customization from localStorage
    const savedCustomization = localStorage.getItem('storeCustomization');
    if (savedCustomization) {
      setStoreCustomization(JSON.parse(savedCustomization));
    }
  }, [showStorePreview]);

  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://${storeUrl}`);
    toast({
      title: "Link Copied!",
      description: "Store link has been copied to clipboard",
    });
  };

  // Enhanced Store Preview Component
  const StorePreview = () => {
    const defaultSettings = {
      storeLogo: '',
      coverImages: [],
      promoBanners: [],
      colorTheme: '#25D366',
      fontFamily: 'Inter',
      layoutView: 'grid',
      cardDesign: 'rounded',
      showTestimonials: true,
      showRatings: true
    };

    const settings = storeCustomization || defaultSettings;
    
    return (
      <div className="bg-white rounded-lg border overflow-hidden max-w-sm mx-auto">
        {/* Store Header */}
        <div 
          className="text-white p-4 text-center"
          style={{ 
            background: settings.coverImages.length > 0 
              ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${settings.coverImages[0]})` 
              : `linear-gradient(to right, ${settings.colorTheme}, ${settings.colorTheme}dd)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontFamily: settings.fontFamily
          }}
        >
          {settings.storeLogo ? (
            <img 
              src={settings.storeLogo} 
              alt="Store Logo" 
              className="w-16 h-16 mx-auto rounded-full mb-2 object-cover border-2 border-white" 
            />
          ) : (
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl">🏪</span>
            </div>
          )}
          <h3 className="font-bold text-lg">{storeName}</h3>
          <p className="text-sm opacity-90">Welcome to our store! 🛍️</p>
          
          {/* Promotional Banners */}
          {settings.promoBanners.length > 0 && (
            <div className="mt-3 space-y-1">
              {settings.promoBanners.slice(0, 2).map((banner: string, index: number) => (
                <div key={index} className="bg-white bg-opacity-20 rounded p-1">
                  <img src={banner} alt="Promo" className="w-full h-8 object-cover rounded" />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Additional Cover Images */}
        {settings.coverImages.length > 1 && (
          <div className="p-2">
            <div className="flex gap-1 overflow-x-auto">
              {settings.coverImages.slice(1, 4).map((image: string, index: number) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Cover ${index + 2}`}
                  className="w-16 h-10 object-cover rounded flex-shrink-0" 
                />
              ))}
              {settings.coverImages.length > 4 && (
                <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600 flex-shrink-0">
                  +{settings.coverImages.length - 4}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Product Grid */}
        <div className="p-4 space-y-4" style={{ fontFamily: settings.fontFamily }}>
          <div className={`grid ${settings.layoutView === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
            {/* Sample Product 1 */}
            <div className={`border overflow-hidden ${
              settings.cardDesign === 'rounded' ? 'rounded-lg' : 
              settings.cardDesign === 'square' ? 'rounded-none' : 'rounded-sm'
            }`}>
              <div className="bg-gray-200 h-24 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <div className="p-2">
                <h4 className="font-medium text-sm">Sample Product</h4>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-600 font-bold text-sm">₹999</span>
                  <span className="text-gray-400 line-through text-xs">₹1299</span>
                </div>
                {settings.showRatings && (
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
                <button 
                  className="w-full text-xs text-white py-1 px-2 rounded mt-2 transition-colors"
                  style={{ backgroundColor: settings.colorTheme }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            
            {/* Sample Product 2 */}
            <div className={`border overflow-hidden ${
              settings.cardDesign === 'rounded' ? 'rounded-lg' : 
              settings.cardDesign === 'square' ? 'rounded-none' : 'rounded-sm'
            }`}>
              <div className="bg-gray-200 h-24 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <div className="p-2">
                <h4 className="font-medium text-sm">Another Product</h4>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-600 font-bold text-sm">₹1499</span>
                </div>
                {settings.showRatings && (
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4].map(i => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="h-3 w-3 text-gray-300" />
                  </div>
                )}
                <button 
                  className="w-full text-xs text-white py-1 px-2 rounded mt-2 transition-colors"
                  style={{ backgroundColor: settings.colorTheme }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              className="w-full text-white text-sm"
              style={{ backgroundColor: settings.colorTheme }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              View All Products
            </Button>
            <Button variant="outline" className="w-full text-sm">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
          </div>
          
          {/* Payment Options Preview */}
          <div className="border-t pt-3">
            <p className="text-xs text-gray-600 mb-2">Payment Options:</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">💳 Cards</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">📱 UPI</span>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">💵 COD</span>
            </div>
          </div>

          {/* Testimonials Section */}
          {settings.showTestimonials && (
            <div className="border-t pt-3">
              <p className="text-xs text-gray-600 mb-2">Customer Reviews:</p>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">"Great products and fast delivery!"</p>
                <p className="text-gray-500 text-xs mt-1">- Happy Customer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">
              {storeName}
            </h1>
            <Badge 
              variant={userPlan === 'pro' ? 'default' : 'secondary'}
              className={userPlan === 'pro' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
            >
              {userPlan === 'pro' ? 'Pro Plan' : 'Free Plan'}
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm text-gray-600">🔗 Store Link:</span>
            <div className="flex items-center gap-2 min-w-0">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm break-all">
                {storeUrl}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyStoreLink}
                className="flex items-center gap-1 shrink-0"
              >
                <Copy className="h-3 w-3" />
                <span className="hidden sm:inline">Copy</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Dialog open={showStorePreview} onOpenChange={setShowStorePreview}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                👁️ Preview Store
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Store Preview - {storeName}
                </DialogTitle>
              </DialogHeader>
              <StorePreview />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboardHeader;
