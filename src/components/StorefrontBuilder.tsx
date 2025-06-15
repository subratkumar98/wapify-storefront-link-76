
import React, { useState, useEffect } from 'react';
import StoreSidebar from './StoreSidebar';
import StoreDashboardHeader from './StoreDashboardHeader';
import StoreCustomizer from './StoreCustomizer';
import ProductForm from './ProductForm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const StorefrontBuilder: React.FC = () => {
  const { toast } = useToast();
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('free');
  const [userData, setUserData] = useState<any>({});
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    const plan = localStorage.getItem('userPlan') as 'free' | 'pro' || 'free';
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    setUserPlan(plan);
    setUserData(user);
  }, []);

  const handleSaveCustomizer = (settings: any) => {
    console.log('Saving customizer settings:', settings);
    // Here you would save to database/localStorage
  };

  const handleSaveProduct = (product: any) => {
    console.log('Saving product:', product);
    setShowProductForm(false);
    toast({
      title: "Product Added!",
      description: "Your product has been added to the store",
    });
  };

  const renderMainContent = () => {
    if (showProductForm) {
      return (
        <ProductForm
          userPlan={userPlan}
          onSave={handleSaveProduct}
          onCancel={() => setShowProductForm(false)}
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Products</p>
                      <p className="text-2xl font-bold">3{userPlan === 'free' ? '/3' : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Orders</p>
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
                  <Button 
                    onClick={() => setShowProductForm(true)} 
                    className="w-full bg-[#25D366] hover:bg-[#128C7E]"
                  >
                    📦 Add Product
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveSection('customizer')}
                  >
                    🎨 Customize Store
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveSection('share')}
                  >
                    📤 Share Store
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Setup Progress</span>
                      <span className="text-sm font-semibold">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#25D366] h-2 rounded-full w-3/5"></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Complete your store setup to start selling
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Welcome Tips */}
            <Card>
              <CardHeader>
                <CardTitle>🚀 Getting Started Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">✅ Complete Your Store</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Upload your store logo</li>
                      <li>• Add your first 3 products</li>
                      <li>• Set up payment methods</li>
                      <li>• Configure WhatsApp integration</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">📈 Grow Your Business</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Share your store link on social media</li>
                      <li>• Create attractive product photos</li>
                      <li>• Respond quickly to customer messages</li>
                      <li>• Use offers and promotions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'customizer':
        return <StoreCustomizer userPlan={userPlan} onSave={handleSaveCustomizer} />;

      case 'products':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">📦 Manage Products</h2>
              <Button 
                onClick={() => setShowProductForm(true)}
                className="bg-[#25D366] hover:bg-[#128C7E]"
              >
                Add Product
              </Button>
            </div>
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first product</p>
                <Button onClick={() => setShowProductForm(true)}>Add Your First Product</Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600">This section is under development</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StoreSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userPlan={userPlan}
      />
      
      <div className="flex-1 flex flex-col">
        <StoreDashboardHeader
          storeName={userData.businessName || 'Your Store'}
          storeHandle={userData.storeName || 'yourstore'}
          userPlan={userPlan}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default StorefrontBuilder;
