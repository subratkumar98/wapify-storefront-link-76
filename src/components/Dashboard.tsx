
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface DashboardProps {
  userPlan: 'free' | 'pro';
  onAddProduct: () => void;
  onNavigateToSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userPlan, onAddProduct, onNavigateToSection }) => {
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
              onClick={onAddProduct} 
              className="w-full bg-[#25D366] hover:bg-[#128C7E]"
            >
              📦 Add Product
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigateToSection('customizer')}
            >
              🎨 Customize Store
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigateToSection('share')}
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
};

export default Dashboard;
