
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Store, 
  Package, 
  CreditCard, 
  Truck, 
  Share2, 
  Crown, 
  Lock, 
  Edit, 
  Save, 
  ArrowLeft,
  Eye,
  Rocket,
  Copy,
  QrCode,
  MessageCircle,
  Facebook,
  Instagram,
  Plus,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FreePlanDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [storeData, setStoreData] = useState({
    storeName: 'My Awesome Store',
    storeHandle: 'mystore',
    tagline: 'Welcome to our amazing store!',
    logo: '',
    theme: 'green',
    layout: 'grid'
  });
  const [products, setProducts] = useState<any[]>([]);

  const handleViewStore = () => {
    window.open(`/store-preview/@${storeData.storeHandle}`, '_blank');
  };

  const handleUpgrade = () => {
    toast({
      title: "🚀 Upgrade to Premium",
      description: "Unlock unlimited products, payments & more for just ₹9/month!",
    });
  };

  const copyStoreLink = () => {
    navigator.clipboard.writeText(`https://getwapify.com/@${storeData.storeHandle}`);
    toast({
      title: "Link Copied!",
      description: "Store link copied to clipboard",
    });
  };

  if (activeSection === 'customize') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h2 className="text-2xl font-bold">🛠️ Customize Your Storefront</h2>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Free Plan Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="storeName">Store Title</Label>
                <Input
                  id="storeName"
                  value={storeData.storeName}
                  onChange={(e) => setStoreData(prev => ({ ...prev, storeName: e.target.value }))}
                  placeholder="Enter your store name"
                />
              </div>

              <div>
                <Label htmlFor="tagline">Short Tagline</Label>
                <Input
                  id="tagline"
                  value={storeData.tagline}
                  onChange={(e) => setStoreData(prev => ({ ...prev, tagline: e.target.value }))}
                  placeholder="Brief description of your store"
                />
              </div>

              <div>
                <Label>Choose Theme (3 options available)</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {['green', 'blue', 'purple'].map((theme) => (
                    <div
                      key={theme}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        storeData.theme === theme ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setStoreData(prev => ({ ...prev, theme }))}
                    >
                      <div className={`w-full h-8 rounded mb-2 ${
                        theme === 'green' ? 'bg-green-500' : 
                        theme === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}></div>
                      <p className="text-sm capitalize font-medium">{theme}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Layout Style</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {['grid', 'list'].map((layout) => (
                    <div
                      key={layout}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        storeData.layout === layout ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setStoreData(prev => ({ ...prev, layout }))}
                    >
                      <p className="text-sm capitalize font-medium">{layout} View</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    toast({ title: "Settings Saved!", description: "Your store customization has been updated" });
                    setActiveSection(null);
                  }}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setActiveSection(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Prompt */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <Lock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Want More Customization?</h3>
              <p className="text-gray-600 mb-4">
                Add banners, animations, promo images, and full color customization!
              </p>
              <Button onClick={handleUpgrade} className="bg-orange-500 hover:bg-orange-600">
                <Rocket className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeSection === 'products') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h2 className="text-2xl font-bold">📦 Add Your Products</h2>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your Products ({products.length}/3)
                {products.length < 3 && (
                  <Button 
                    size="sm" 
                    onClick={() => {
                      if (products.length >= 3) {
                        handleUpgrade();
                        return;
                      }
                      setProducts([...products, { 
                        id: Date.now(), 
                        title: `Product ${products.length + 1}`,
                        description: 'Product description',
                        price: 999,
                        image: ''
                      }]);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No products added yet</p>
                  <Button onClick={() => setProducts([{ 
                    id: Date.now(), 
                    title: 'My First Product',
                    description: 'Amazing product description',
                    price: 999,
                    image: ''
                  }])}>
                    Add Your First Product
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Product Title</Label>
                          <Input value={product.title} placeholder="Product name" />
                        </div>
                        <div>
                          <Label>Price (₹)</Label>
                          <Input value={product.price} type="number" placeholder="999" />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Input placeholder="Electronics, Fashion, etc." />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>Description</Label>
                        <Textarea value={product.description} placeholder="Product description" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {products.length > 0 && (
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={() => {
                      toast({ title: "Products Saved!", description: "Your products have been updated" });
                      setActiveSection(null);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Products
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upgrade Prompt */}
          {products.length >= 3 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <Lock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">You've reached the 3 product limit</h3>
                <p className="text-gray-600 mb-4">
                  Upgrade to add unlimited products with videos, reviews & more!
                </p>
                <Button onClick={handleUpgrade} className="bg-orange-500 hover:bg-orange-600">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Add Unlimited Products
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'share') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h2 className="text-2xl font-bold">📢 Share Your Store</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Share Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">Copy Store Link</span>
                  <Button size="sm" variant="outline" onClick={copyStoreLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">Download QR Code</span>
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Social Media</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#128C7E]">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-[#1877F2] hover:bg-[#166FE5]">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-[#E4405F] hover:bg-[#D73652]">
                      <Instagram className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Share Message</Label>
                  <Textarea 
                    placeholder="Check out my amazing store! 🛍️"
                    className="mt-1"
                  />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upgrade Prompt */}
          <Card className="border-orange-200 bg-orange-50 mt-6">
            <CardContent className="p-6 text-center">
              <Lock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Want Branded Sharing?</h3>
              <p className="text-gray-600 mb-4">
                Create custom branded posters, advanced share designs & more!
              </p>
              <Button onClick={handleUpgrade} className="bg-orange-500 hover:bg-orange-600">
                <Rocket className="h-4 w-4 mr-2" />
                Upgrade for Advanced Sharing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                👋 Welcome, {storeData.storeName} – Start Building Your Free Store!
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  🔗 Unique Store Link: <span className="font-mono bg-gray-100 px-2 py-1 rounded">getwapify.com/@{storeData.storeHandle}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  🔒 Free Plan
                </Badge>
                <Button 
                  size="sm" 
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Rocket className="h-4 w-4 mr-1" />
                  Upgrade to Unlock All Features
                </Button>
              </div>
            </div>
            
            <Button onClick={handleViewStore} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View My Store
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Customize Storefront */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-blue-600" />
                🛠️ Customize Your Storefront
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Upload store logo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>3 pre-made themes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Basic layout options</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  ❌ <span>Custom fonts & banners</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => setActiveSection('customize')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardContent>
          </Card>

          {/* Add Products */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                📦 Add Your Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Up to 3 products</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Basic product fields</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>1 image per product</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  ❌ <span>Videos & reviews</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => setActiveSection('products')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Add/Edit Products
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                💳 Setup Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Cash on Delivery (COD)</span>
                </div>
                <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">Premium Feature</span>
                  </div>
                  <p className="text-xs text-orange-600">Accept online payments like UPI, Razorpay, PayPal & more!</p>
                </div>
              </div>
              <Button 
                onClick={handleUpgrade}
                variant="outline" 
                className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Partner */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-indigo-600" />
                🚚 Delivery Partner Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-3">
                  Free plan does not support third-party delivery integrations like Shiprocket, Delhivery, or Blue Dart.
                </p>
                <p className="text-sm text-gray-600">
                  To enable shipping, upgrade your plan.
                </p>
              </div>
              <Button 
                onClick={handleUpgrade}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Upgrade to Unlock Delivery Options
              </Button>
            </CardContent>
          </Card>

          {/* Share Store */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-pink-600" />
                📢 Share Your Store
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Copy store link</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Download QR code</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  ✅ <span>Social media sharing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  ❌ <span>Branded posters</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => setActiveSection('share')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Customize Share
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Plan Box */}
        <Card className="border-2 border-gradient-to-r from-orange-200 to-red-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🚀 Want More Power?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                ✅ <span>Add Unlimited Products</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                ✅ <span>Accept Online Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                ✅ <span>Premium Themes & Colors</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                ✅ <span>Videos, Reviews & Delivery</span>
              </div>
            </div>
            <Button 
              size="lg" 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-3"
            >
              <Crown className="h-5 w-5 mr-2" />
              Upgrade to Premium – ₹9/month
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sticky View Store Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={handleViewStore}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Eye className="h-5 w-5 mr-2" />
          View My Store
        </Button>
      </div>
    </div>
  );
};

export default FreePlanDashboard;
