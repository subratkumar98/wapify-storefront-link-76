
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
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
  Copy,
  ShoppingCart,
  Star,
  Heart
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
  const [showStorePreview, setShowStorePreview] = useState(false);

  const storeName = "Your Store";
  const storeHandle = "yourstore";
  const storeUrl = `getwapify.com/@${storeHandle}`;

  const sections = [
    {
      id: 'customize',
      title: '🎨 Customize Storefront',
      description: 'Design your store with colors, logo, and branding',
      icon: Sparkles,
      component: CustomizeStorefrontSection
    },
    {
      id: 'products',
      title: '📦 Add Products',
      description: 'Upload product images, set prices, and descriptions',
      icon: Package,
      component: ProductsSetupSection
    },
    {
      id: 'payments',
      title: '💳 Payment Setup',
      description: 'Configure UPI, cards, and payment gateways',
      icon: CreditCard,
      component: PaymentMethodsSection
    },
    {
      id: 'delivery',
      title: '🚚 Delivery Options',
      description: 'Set shipping rates and delivery partners',
      icon: Truck,
      component: DeliverySetupSection
    },
    {
      id: 'share',
      title: '📢 Share Store',
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
                  👋 Welcome! Let's Build Your Store
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                  <span className="text-sm sm:text-base text-gray-600">🔗 Store Link:</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm break-all">{storeUrl}</code>
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
              
              <Dialog open={showStorePreview} onOpenChange={setShowStorePreview}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex items-center gap-2 w-full sm:w-auto"
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
            </div>

            {/* Progress Bar */}
            <div>
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`p-2 sm:p-3 rounded-xl shrink-0 ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : canAccess
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? <Check className="h-5 w-5 sm:h-6 sm:w-6" /> : <Icon className="h-5 w-5 sm:h-6 sm:w-6" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg lg:text-xl break-words">{section.title}</CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                          <Badge 
                            variant={isCompleted ? "default" : canAccess ? "secondary" : "outline"}
                            className={`text-xs shrink-0 ${
                              isCompleted 
                                ? "bg-green-100 text-green-800 border-green-200" 
                                : canAccess
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {isCompleted ? '✅ Complete' : canAccess ? '⏳ Pending' : '🔒 Locked'}
                          </Badge>
                          {!canAccess && section.requiresCompletion && (
                            <span className="text-xs text-gray-500 break-words">
                              Complete previous sections first
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {canAccess && (
                      <Edit className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 break-words">{section.description}</p>
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    className={`w-full text-sm sm:text-base ${
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
          <Card className="mt-6 sm:mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="text-center py-8 sm:py-12 px-4">
              <div className="text-4xl sm:text-6xl mb-4">🎉</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 break-words">
                Your Storefront is Ready!
              </h2>
              <p className="text-base sm:text-lg text-green-700 mb-4 sm:mb-6">
                Start sharing, selling, and growing 🚀
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
                  onClick={() => setShowStorePreview(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Store Preview
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveSection('share')}
                  className="border-green-300 text-green-700 hover:bg-green-50 flex-1 sm:flex-none"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Your Store
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating Preview Button (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Button 
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg rounded-full p-3 sm:p-4"
          onClick={() => setShowStorePreview(true)}
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default StorefrontSetup;
