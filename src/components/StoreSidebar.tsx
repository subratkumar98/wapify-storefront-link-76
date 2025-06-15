
import React from 'react';
import { 
  Home, 
  Palette, 
  Package, 
  CreditCard, 
  Megaphone, 
  MessageCircle, 
  Share2, 
  BarChart, 
  Settings 
} from 'lucide-react';
import { Button } from './ui/button';

interface StoreSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userPlan: 'free' | 'pro';
}

const StoreSidebar: React.FC<StoreSidebarProps> = ({ activeSection, onSectionChange, userPlan }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Home / Dashboard', icon: Home },
    { id: 'customizer', label: 'Store Customizer', icon: Palette },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'payments', label: 'Payments & Delivery', icon: CreditCard },
    { id: 'promotions', label: 'Offers & Promotions', icon: Megaphone },
    { id: 'whatsapp', label: 'WhatsApp Integration', icon: MessageCircle },
    { id: 'share', label: 'Share Store', icon: Share2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 sticky top-0 overflow-y-auto">
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
      
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className="w-full justify-start text-left"
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              <span className="text-sm">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default StoreSidebar;
