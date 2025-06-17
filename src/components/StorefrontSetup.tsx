
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Eye,
  Check,
  X,
  Edit,
  Sparkles,
  Package,
  CreditCard,
  Truck,
  Share2,
  ExternalLink,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CustomizeStorefrontSection from './StorefrontSetup/CustomizeStorefrontSection';
import ProductsSetupSection from './StorefrontSetup/ProductsSetupSection';
import PaymentMethodsSection from './StorefrontSetup/PaymentMethodsSection';
import DeliverySetupSection from './StorefrontSetup/DeliverySetupSection';
import ShareStoreSection from './StorefrontSetup/ShareStoreSection';

interface StorefrontSetupProps {
  userPlan: 'free' | 'pro';
}

const StorefrontSetup: React.FC<StorefrontSetupProps> = ({ userPlan }) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [setupProgress, setSetupProgress] = useState({
    customize: false,
    products: false,
    payments: false,
    delivery: false,
    share: false
  });

  const storeName = "Your Store"; // This would come from user data
  const storeHandle = "yourstore"; // This would come from user data
  const storeUrl = `getwapify.com/@${storeHandle}`;

  const sections = [
    {
      id: 'customize',
      title: '🛠️ Customize Your Storefront',
      description: 'Set up your store branding, colors, and layout',
      icon: Sparkles,
      component: CustomizeStorefrontSection
    },
    {
      id: 'products',
      title: '📦 Add Your Products',
      description: 'Create product listings with images and details',
      icon: Package,
      component: ProductsSetupSection
    },
    {
      id: 'payments',
      title: '💳 Setup Payment Methods',
      description: 'Configure payment options for your customers',
      icon: CreditCard,
      component: PaymentMethodsSection
    },
    {
      id: 'delivery',
      title: '🚚 Choose Delivery Partner',
      description: 'Set up shipping and delivery options',
      icon: Truck,
      component: DeliverySetupSection
    },
    {
      id: 'share',
      title: '📢 Share Your Store',
      description: 'Get your store link and promotional materials',
      icon: Share2,
      component: ShareStoreSection,
      requiresCompletion: ['customize', 'products', 'payments', 'delivery']
    }
  ];

  const completedSections = Object.entries(setupProgress).filter(([_, completed]) => completed).length;
  const progressPercentage = (completedSections / 5) * 100;

  const handleSectionSave = (sectionId: string) => {
    setSetupProgress(prev => ({ ...prev, [sectionId]: true }));
    setActiveSection(null);
    toast({
      title: "✅ Section Completed!",
      description: `${sections.find(s => s.id === sectionId)?.title} has been saved successfully`,
    });
  };

  const handleCopyStoreLink = () => {
    navigator.clipboard.writeText(`https://${storeUrl}`);
    toast({
      title: "Link Copied!",
      description: "Store link has been copied to clipboard",
    });
  };

  const canAccessSection = (section: any) => {
    if (!section.requiresCompletion) return true;
    return section.requiresCompletion.every((reqId: string) => setupProgress[reqId as keyof typeof setupProgress]);
  };

  if (activeSection) {
    const section = sections.find(s => s.id === activeSection);
    if (section) {
      const SectionComponent = section.component;
      return (
        <SectionComponent
          onSave={() => handleSectionSave(activeSection)}
          onBack={() => setActiveSection(null)}
          userPlan={userPlan}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                👋 Welcome, {storeName} – Let's Build Your Storefront!
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <span className="text-gray-600">🔗 Unique Store Link:</span>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{storeUrl}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyStoreLink}
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex items-center gap-2"
              onClick={() => window.open(`https://${storeUrl}`, '_blank')}
            >
              <Eye className="h-4 w-4" />
              👁️ View My Store
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Setup Progress</span>
              <span>{completedSections}/5 Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            const isCompleted = setupProgress[section.id as keyof typeof setupProgress];
            const canAccess = canAccessSection(section);
            
            return (
              <Card 
                key={section.id}
                className={`border-2 transition-all duration-300 hover:shadow-lg ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50 shadow-sm' 
                    : canAccess
                    ? 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    : 'border-gray-100 bg-gray-50 opacity-60'
                } ${canAccess ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => canAccess && setActiveSection(section.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : canAccess
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg lg:text-xl">{section.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={isCompleted ? "default" : canAccess ? "secondary" : "outline"}
                            className={
                              isCompleted 
                                ? "bg-green-100 text-green-800 border-green-200" 
                                : canAccess
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-gray-100 text-gray-500"
                            }
                          >
                            {isCompleted ? '✅ Complete' : canAccess ? '⏳ Pending' : '🔒 Locked'}
                          </Badge>
                          {!canAccess && section.requiresCompletion && (
                            <span className="text-xs text-gray-500">
                              Complete previous sections first
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {canAccess && (
                      <Edit className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    className={`w-full ${
                      !canAccess ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    disabled={!canAccess}
                  >
                    {isCompleted ? '✏️ Edit' : '🚀 Start Setup'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completion Celebration */}
        {completedSections === 5 && (
          <Card className="mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Your Storefront is Ready!
              </h2>
              <p className="text-lg text-green-700 mb-6">
                Start sharing, selling, and growing 🚀
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(`https://${storeUrl}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Store
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveSection('share')}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Your Store
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating View Store Button (Mobile) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button 
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg rounded-full p-4"
          onClick={() => window.open(`https://${storeUrl}`, '_blank')}
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default StorefrontSetup;
