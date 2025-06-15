
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Store, 
  Plus, 
  Settings, 
  Eye, 
  Share2, 
  QrCode,
  Crown,
  Palette,
  ShoppingCart,
  Star,
  Upload,
  Heart,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  title: string;
  price: number;
  mrp?: number;
  description: string;
  images: string[];
  video?: string;
  tags: string[];
  inventory: number;
  reviews: Array<{rating: number; comment: string; user: string}>;
}

const StorefrontBuilder: React.FC = () => {
  const { toast } = useToast();
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('free');
  const [userData, setUserData] = useState<any>({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [storeTheme, setStoreTheme] = useState({
    layout: 'grid',
    backgroundColor: '#ffffff',
    cardStyle: 'rounded',
    font: 'Inter'
  });

  useEffect(() => {
    const plan = localStorage.getItem('userPlan') as 'free' | 'pro' || 'free';
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    setUserPlan(plan);
    setUserData(user);
  }, []);

  const addProduct = () => {
    if (userPlan === 'free' && products.length >= 3) {
      toast({
        title: "Upgrade Required",
        description: "Free plan allows only 3 products. Upgrade to Pro for unlimited products!",
        variant: "destructive"
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      title: 'New Product',
      price: 0,
      description: '',
      images: [],
      tags: [],
      inventory: 1,
      reviews: []
    };
    setProducts([...products, newProduct]);
  };

  const upgradeDialog = () => {
    toast({
      title: "Upgrade to Pro",
      description: "Unlock unlimited products, themes, payments & more for just ₹9/month",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Store className="h-8 w-8 text-whatsapp" />
              <div>
                <h1 className="text-xl font-bold">GetWapify Dashboard</h1>
                <p className="text-sm text-gray-500">
                  {userData.storeName ? `@${userData.storeName}` : 'Store Setup'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant={userPlan === 'pro' ? 'default' : 'secondary'} className="flex items-center gap-1">
                {userPlan === 'pro' && <Crown className="h-3 w-3" />}
                {userPlan === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </Badge>
              
              {userPlan === 'free' && (
                <Button onClick={upgradeDialog} className="bg-whatsapp hover:bg-whatsapp-dark">
                  Upgrade to Pro - ₹9/month
                </Button>
              )}
              
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview Store
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Free Plan Upgrade Banner */}
      {userPlan === 'free' && (
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-semibold">
              🚀 Upgrade to Pro to unlock unlimited products, advanced themes, payment integration & more! 
              <Button variant="outline" size="sm" className="ml-4 text-orange-600 border-white hover:bg-white">
                Upgrade Now - ₹9/month
              </Button>
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products ({products.length}{userPlan === 'free' ? '/3' : ''})</TabsTrigger>
            <TabsTrigger value="design">Store Design</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="share">Share & Promote</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Store Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Store Link</p>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                        getwapify.com/@{userData.storeName || 'yourstore'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Products</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={addProduct} className="w-full flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Store Settings
                  </Button>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Store
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userPlan === 'free' ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Products</span>
                          <span className="text-sm font-semibold">{products.length}/3</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${(products.length / 3) * 100}%`}}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">Basic themes, Razorpay only</p>
                      </>
                    ) : (
                      <>
                        <div className="text-green-600 space-y-1">
                          <p className="text-sm font-semibold">✓ Unlimited Products</p>
                          <p className="text-sm font-semibold">✓ All Payment Methods</p>
                          <p className="text-sm font-semibold">✓ Advanced Themes</p>
                          <p className="text-sm font-semibold">✓ Analytics & Reports</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Products</h2>
              <Button onClick={addProduct} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>

            {products.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
                  <p className="text-gray-600 mb-4">Start by adding your first product to your store</p>
                  <Button onClick={addProduct}>Add Your First Product</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{product.title}</h3>
                      <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Store Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Store Theme
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userPlan === 'free' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-orange-800">
                        🔒 Advanced themes available in Pro plan. <button className="underline">Upgrade now</button>
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <Label>Layout Style</Label>
                    <select className="w-full mt-1 p-2 border rounded-md" disabled={userPlan === 'free'}>
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
                    <Label>Background Color</Label>
                    <input 
                      type="color" 
                      className="w-full h-10 mt-1 border rounded-md"
                      disabled={userPlan === 'free'}
                      value={storeTheme.backgroundColor}
                      onChange={(e) => setStoreTheme({...storeTheme, backgroundColor: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label>Card Style</Label>
                    <select className="w-full mt-1 p-2 border rounded-md" disabled={userPlan === 'free'}>
                      <option value="rounded">Rounded Corners</option>
                      {userPlan === 'pro' && <option value="square">Square Corners</option>}
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold">{userData.businessName || 'Your Business'}</h3>
                      <p className="text-sm text-gray-600">@{userData.storeName || 'yourstore'}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Product {i}</span>
                        </div>
                      ))}
                    </div>
                    
                    {userPlan === 'free' && (
                      <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">Powered by GetWapify</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-gray-600">Orders will appear here once customers start purchasing</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Share Tab */}
          <TabsContent value="share" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share Your Store
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Store Link</Label>
                    <div className="flex mt-1">
                      <Input 
                        value={`getwapify.com/@${userData.storeName || 'yourstore'}`}
                        readOnly
                      />
                      <Button variant="outline" className="ml-2">Copy</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Share on WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full">Share on Instagram</Button>
                    <Button variant="outline" className="w-full">Share on Facebook</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    QR Code & Poster
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userPlan === 'free' ? (
                    <div className="text-center py-8">
                      <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">QR codes & promotional posters available in Pro plan</p>
                      <Button onClick={upgradeDialog}>Upgrade to Pro</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <QrCode className="h-24 w-24 text-gray-400" />
                      </div>
                      <Button className="w-full">Download QR Code</Button>
                      <Button variant="outline" className="w-full">Generate Poster</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StorefrontBuilder;
