
import React from 'react';
import { 
  Palette, 
  Package, 
  CreditCard, 
  Megaphone, 
  MessageCircle, 
  Share2, 
  BarChart, 
  Settings,
  Sparkles,
  Truck
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface StoreSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userPlan: 'free' | 'pro';
}

const StoreSidebar: React.FC<StoreSidebarProps> = ({ activeSection, onSectionChange, userPlan }) => {
  const setupProgress = {
    customize: false,
    products: false,
    payments: false,
    delivery: false,
    share: false
  };

  const sidebarItems = [
    { 
      id: 'setup-customize', 
      label: 'Customize Storefront', 
      icon: Sparkles,
      isSetup: true,
      completed: setupProgress.customize
    },
    { 
      id: 'setup-products', 
      label: 'Add Products', 
      icon: Package,
      isSetup: true,
      completed: setupProgress.products
    },
    { 
      id: 'setup-payments', 
      label: 'Payment Setup', 
      icon: CreditCard,
      isSetup: true,
      completed: setupProgress.payments
    },
    { 
      id: 'setup-delivery', 
      label: 'Delivery Options', 
      icon: Truck,
      isSetup: true,
      completed: setupProgress.delivery
    },
    { 
      id: 'setup-share', 
      label: 'Share Store', 
      icon: Share2,
      isSetup: true,
      completed: setupProgress.share
    },
    { id: 'customizer', label: 'Advanced Customizer', icon: Palette },
    { id: 'products', label: 'Manage Products', icon: Package },
    { id: 'promotions', label: 'Offers & Promotions', icon: Megaphone },
    { id: 'whatsapp', label: 'WhatsApp Integration', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`w-64 bg-white h-full border-r border-gray-200 sticky top-0 overflow-y-auto ${
      userPlan === 'pro' ? 'block' : 'hidden md:block'
    }`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Store Builder</h2>
        <div className="mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            userPlan === 'pro' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            {userPlan === 'pro' ? 'Pro Plan' : 'Free Plan'}
          </span>
        </div>
      </div>
      
      <nav className="p-4 space-y-1">
        {/* Setup Section */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Store Setup
          </h3>
          {sidebarItems.filter(item => item.isSetup).map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className="w-full justify-start text-left mb-1"
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="text-sm flex-1">{item.label}</span>
                {item.completed && (
                  <Badge variant="default" className="ml-2 bg-green-100 text-green-800 text-xs">
                    ✓
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* Management Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Store Management
          </h3>
          {sidebarItems.filter(item => !item.isSetup).map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className="w-full justify-start text-left mb-1"
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="text-sm">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default StoreSidebar;
