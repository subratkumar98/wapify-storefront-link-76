
import React, { useState } from 'react';
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
  const storeUrl = `getwapify.com/@${storeHandle}`;

  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://${storeUrl}`);
    toast({
      title: "Link Copied!",
      description: "Store link has been copied to clipboard",
    });
  };

  // Store Preview Component
  const StorePreview = () => (
    <div className="bg-white rounded-lg border overflow-hidden max-w-sm mx-auto">
      {/* Store Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 text-center">
        <h3 className="font-bold text-lg">{storeName}</h3>
        <p className="text-sm opacity-90">Welcome to our store! 🛍️</p>
      </div>
      
      {/* Product Grid */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Sample Product 1 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-24 flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <div className="p-2">
              <h4 className="font-medium text-sm">Sample Product</h4>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-green-600 font-bold text-sm">₹999</span>
                <span className="text-gray-400 line-through text-xs">₹1299</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sample Product 2 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-24 flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <div className="p-2">
              <h4 className="font-medium text-sm">Another Product</h4>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-green-600 font-bold text-sm">₹1499</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4].map(i => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-3 w-3 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" className="w-full text-sm">
            <Heart className="h-4 w-4 mr-2" />
            Add to Wishlist
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
      </div>
    </div>
  );

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
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Store Preview
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
