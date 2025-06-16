
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Palette, 
  Package, 
  CreditCard, 
  Truck, 
  Share2, 
  BarChart,
  ArrowLeft,
  Check,
  ChevronRight
} from 'lucide-react';
import StoreCustomizer from './StoreCustomizer';
import ProductForm from './ProductForm';
import PaymentsSection from './PaymentsSection';
import DeliveryPartnerSection from './DeliveryPartnerSection';
import ShareSection from './ShareSection';
import AnalyticsSection from './AnalyticsSection';

interface StorefrontSetupFlowProps {
  userPlan: 'free' | 'pro';
}

const StorefrontSetupFlow: React.FC<StorefrontSetupFlowProps> = ({ userPlan }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const sections = [
    {
      id: 'customize',
      title: 'Customize your storefront',
      description: 'Design your store with colors, themes, and branding',
      icon: Palette,
      status: completedSections.includes('customize') ? 'completed' : 'pending'
    },
    {
      id: 'products',
      title: 'Add your first product',
      description: 'Upload products with images, descriptions, and pricing',
      icon: Package,
      status: completedSections.includes('products') ? 'completed' : 'pending'
    },
    {
      id: 'payments',
      title: 'Set up payment methods',
      description: 'Configure payment options for your customers',
      icon: CreditCard,
      status: completedSections.includes('payments') ? 'completed' : 'pending'
    },
    {
      id: 'delivery',
      title: 'Choose Delivery partner',
      description: 'Set up shipping and delivery options',
      icon: Truck,
      status: completedSections.includes('delivery') ? 'completed' : 'pending'
    },
    {
      id: 'share',
      title: 'Share your store',
      description: 'Get your store link and start sharing with customers',
      icon: Share2,
      status: completedSections.includes('share') ? 'completed' : 'pending'
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'View detailed insights and performance metrics',
      icon: BarChart,
      status: 'available'
    }
  ];

  const handleSectionSave = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
    setActiveSection(null);
  };

  const handleBackToOverview = () => {
    setActiveSection(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'customize':
        return (
          <StoreCustomizer 
            userPlan={userPlan}
            onSave={() => handleSectionSave('customize')}
            onBack={handleBackToOverview}
          />
        );
      case 'products':
        return (
          <ProductForm
            userPlan={userPlan}
            onSave={() => handleSectionSave('products')}
            onCancel={handleBackToOverview}
          />
        );
      case 'payments':
        return (
          <PaymentsSection 
            userPlan={userPlan}
            onSave={() => handleSectionSave('payments')}
            onBack={handleBackToOverview}
          />
        );
      case 'delivery':
        return (
          <DeliveryPartnerSection
            userPlan={userPlan}
            onSave={() => handleSectionSave('delivery')}
            onBack={handleBackToOverview}
          />
        );
      case 'share':
        return (
          <ShareSection
            userPlan={userPlan}
            storeHandle="yourstore"
            onSave={() => handleSectionSave('share')}
            onBack={handleBackToOverview}
          />
        );
      case 'analytics':
        return (
          <AnalyticsSection 
            userPlan={userPlan}
            onBack={handleBackToOverview}
          />
        );
      default:
        return null;
    }
  };

  if (activeSection) {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderSectionContent()}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Build Your Dream Store
        </h1>
        <p className="text-xl text-gray-600">
          Follow these steps to create your professional online store
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-500">Progress:</span>
          <div className="flex items-center gap-1">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedSections.length / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {completedSections.length}/5 Complete
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const isCompleted = section.status === 'completed';
          const isAvailable = section.status === 'available';
          
          return (
            <Card 
              key={section.id}
              className={`border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isCompleted 
                  ? 'border-green-500 bg-green-50' 
                  : isAvailable
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isAvailable
                        ? 'bg-blue-500 text-white'
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      {isCompleted && (
                        <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      )}
                      {isAvailable && (
                        <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
                          Available
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{section.description}</p>
                <div className="mt-4">
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    className="w-full"
                  >
                    {isCompleted ? 'Edit' : isAvailable ? 'View' : 'Start'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {completedSections.length > 0 && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Check className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-green-800">
                Great Progress!
              </h3>
            </div>
            <p className="text-green-700 mb-4">
              You've completed {completedSections.length} out of 5 setup steps. 
              {completedSections.length === 5 && " Your store is ready to go live!"}
            </p>
            {completedSections.length === 5 && (
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setActiveSection('share')}
              >
                🚀 Launch Your Store
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StorefrontSetupFlow;
