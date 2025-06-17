
import React, { useState, useEffect } from 'react';
import StoreSidebar from './StoreSidebar';
import StoreDashboardHeader from './StoreDashboardHeader';
import Dashboard from './Dashboard';
import StorefrontSetupFlow from './StorefrontSetupFlow';
import StoreCustomizer from './StoreCustomizer';
import ProductForm from './ProductForm';
import ProductsSection from './ProductsSection';
import PaymentsSection from './PaymentsSection';
import PromotionsSection from './PromotionsSection';
import WhatsAppSection from './WhatsAppSection';
import ShareSection from './ShareSection';
import AnalyticsSection from './AnalyticsSection';
import SettingsSection from './SettingsSection';
import FreePlanDashboard from './FreePlanDashboard';
import CustomizeStorefrontSection from './StorefrontSetup/CustomizeStorefrontSection';
import ProductsSetupSection from './StorefrontSetup/ProductsSetupSection';
import PaymentMethodsSection from './StorefrontSetup/PaymentMethodsSection';
import DeliverySetupSection from './StorefrontSetup/DeliverySetupSection';
import ShareStoreSection from './StorefrontSetup/ShareStoreSection';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';

const StorefrontBuilder: React.FC = () => {
  const { toast } = useToast();
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('pro');
  const [userData, setUserData] = useState<any>({});
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showFreeDashboard, setShowFreeDashboard] = useState(false);
  const [setupProgress, setSetupProgress] = useState({
    customize: false,
    products: false,
    payments: false,
    delivery: false,
    share: false
  });

  useEffect(() => {
    const plan = localStorage.getItem('userPlan') as 'free' | 'pro' || 'pro';
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    const isNewFreeUser = localStorage.getItem('isNewFreeUser') === 'true';
    
    setUserPlan(plan);
    setUserData(user);
    
    // Show free dashboard for new free users
    if (plan === 'free' && isNewFreeUser) {
      setShowFreeDashboard(true);
      localStorage.removeItem('isNewFreeUser');
    }
  }, []);

  // If we should show the free dashboard, render it instead
  if (showFreeDashboard && userPlan === 'free') {
    return <FreePlanDashboard />;
  }

  const handleSaveCustomizer = (settings: any) => {
    console.log('Saving customizer settings:', settings);
  };

  const handleSaveProduct = (product: any) => {
    console.log('Saving product:', product);
    setShowProductForm(false);
    toast({
      title: "Product Added!",
      description: "Your product has been added to the store",
    });
  };

  const handleSetupSectionSave = (sectionId: string) => {
    const section = sectionId.replace('setup-', '');
    setSetupProgress(prev => ({ ...prev, [section]: true }));
    toast({
      title: "✅ Section Completed!",
      description: `${section} setup has been saved successfully`,
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
          <Dashboard
            userPlan={userPlan}
            onAddProduct={() => setShowProductForm(true)}
            onNavigateToSection={setActiveSection}
          />
        );

      case 'setup-customize':
        return (
          <CustomizeStorefrontSection
            onSave={() => handleSetupSectionSave('setup-customize')}
            onBack={() => setActiveSection('dashboard')}
            userPlan={userPlan}
          />
        );

      case 'setup-products':
        return (
          <ProductsSetupSection
            onSave={() => handleSetupSectionSave('setup-products')}
            onBack={() => setActiveSection('dashboard')}
            userPlan={userPlan}
          />
        );

      case 'setup-payments':
        return (
          <PaymentMethodsSection
            onSave={() => handleSetupSectionSave('setup-payments')}
            onBack={() => setActiveSection('dashboard')}
            userPlan={userPlan}
          />
        );

      case 'setup-delivery':
        return (
          <DeliverySetupSection
            onSave={() => handleSetupSectionSave('setup-delivery')}
            onBack={() => setActiveSection('dashboard')}
            userPlan={userPlan}
          />
        );

      case 'setup-share':
        return (
          <ShareStoreSection
            onSave={() => handleSetupSectionSave('setup-share')}
            onBack={() => setActiveSection('dashboard')}
            userPlan={userPlan}
          />
        );

      case 'setup':
        return <StorefrontSetupFlow userPlan={userPlan} />;

      case 'customizer':
        return <StoreCustomizer userPlan={userPlan} onSave={handleSaveCustomizer} />;

      case 'products':
        return <ProductsSection onAddProduct={() => setShowProductForm(true)} />;

      case 'payments':
        return <PaymentsSection userPlan={userPlan} />;

      case 'promotions':
        return <PromotionsSection userPlan={userPlan} />;

      case 'whatsapp':
        return <WhatsAppSection userPlan={userPlan} />;

      case 'share':
        return (
          <ShareSection 
            userPlan={userPlan} 
            storeHandle={userData.storeName || 'yourstore'} 
          />
        );

      case 'analytics':
        return <AnalyticsSection userPlan={userPlan} />;

      case 'settings':
        return <SettingsSection userPlan={userPlan} />;

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
