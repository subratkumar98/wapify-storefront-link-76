
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { ArrowLeft, Save, Truck, MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeliverySetupSectionProps {
  onSave: () => void;
  onBack: () => void;
  userPlan: 'free' | 'pro';
}

const DeliverySetupSection: React.FC<DeliverySetupSectionProps> = ({ onSave, onBack, userPlan }) => {
  const { toast } = useToast();
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [deliverySettings, setDeliverySettings] = useState({
    flatShippingCharge: 0,
    freeShippingAbove: 0,
    estimatedDelivery: '3-5',
    enableManualDelivery: false,
    manualDeliveryLink: ''
  });

  const deliveryPartners = [
    {
      id: 'shiprocket',
      name: 'Shiprocket',
      logo: '🚀',
      description: 'Fast Pan-India delivery with real-time tracking',
      features: ['Real-time tracking', 'Pan-India coverage', 'COD available', 'Multiple courier partners'],
      color: 'from-orange-500 to-red-500',
      setupUrl: 'https://shiprocket.in'
    },
    {
      id: 'delhivery',
      name: 'Delhivery',
      logo: '📦',
      description: 'COD support with 24/7 customer service',
      features: ['COD support', '24/7 support', 'Express delivery', 'Reverse pickup'],
      color: 'from-blue-500 to-purple-500',
      setupUrl: 'https://delhivery.com'
    },
    {
      id: 'xpressbees',
      name: 'Xpressbees',
      logo: '⚡',
      description: 'Hyperlocal delivery options for faster shipping',
      features: ['Hyperlocal delivery', 'Same-day delivery', 'Express shipping', 'Bulk orders'],
      color: 'from-green-500 to-teal-500',
      setupUrl: 'https://xpressbees.com'
    },
    {
      id: 'bluedart',
      name: 'Blue Dart Express',
      logo: '✈️',
      description: 'Nationwide & International shipping solutions',
      features: ['International shipping', 'Premium service', 'Time-definite delivery', 'Secure handling'],
      color: 'from-blue-600 to-indigo-600',
      setupUrl: 'https://bluedart.com'
    }
  ];

  const handlePartnerToggle = (partnerId: string) => {
    setSelectedPartners(prev => 
      prev.includes(partnerId) 
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const handleSave = () => {
    if (selectedPartners.length === 0 && !deliverySettings.enableManualDelivery) {
      toast({
        title: "No Delivery Method Selected",
        description: "Please select at least one delivery partner or enable manual delivery",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🚚 Delivery Setup Complete!",
      description: `${selectedPartners.length} delivery partner(s) configured successfully`,
    });
    onSave();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              🔙 Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Truck className="h-8 w-8 text-blue-600" />
                🚚 Choose Delivery Partner
              </h2>
              <p className="text-gray-600 mt-1">Set up shipping and delivery options for your customers</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            💾 Save Configuration
          </Button>
        </div>

        {/* Delivery Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliveryPartners.map((partner) => (
            <Card 
              key={partner.id}
              className={`border-2 transition-all duration-300 cursor-pointer ${
                selectedPartners.includes(partner.id)
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => handlePartnerToggle(partner.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${partner.color} flex items-center justify-center text-white text-2xl`}>
                      {partner.logo}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{partner.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{partner.description}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPartners.includes(partner.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedPartners.includes(partner.id) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Key Features:</h4>
                  <ul className="space-y-1">
                    {partner.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {selectedPartners.includes(partner.id) && (
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(partner.setupUrl, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        🔗 Connect {partner.name}
                      </Button>
                      <p className="text-xs text-blue-600 mt-2 text-center">
                        Click to set up your account with {partner.name}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manual Delivery Option */}
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Manual Delivery Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Enable Manual Delivery</span>
                <p className="text-sm text-gray-600">Handle deliveries yourself or through local partners</p>
              </div>
              <Switch
                checked={deliverySettings.enableManualDelivery}
                onCheckedChange={(checked) => 
                  setDeliverySettings(prev => ({ ...prev, enableManualDelivery: checked }))
                }
              />
            </div>
            
            {deliverySettings.enableManualDelivery && (
              <div>
                <Label htmlFor="manualDeliveryLink">Delivery Information Link (Optional)</Label>
                <Input
                  id="manualDeliveryLink"
                  placeholder="https://yourwebsite.com/delivery-info"
                  value={deliverySettings.manualDeliveryLink}
                  onChange={(e) => setDeliverySettings(prev => ({ ...prev, manualDeliveryLink: e.target.value }))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Link to a page with your delivery terms and conditions
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delivery Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Charges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Shipping Charges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="flatShipping">Flat Shipping Charge (₹)</Label>
                <Input
                  id="flatShipping"
                  type="number"
                  value={deliverySettings.flatShippingCharge}
                  onChange={(e) => setDeliverySettings(prev => ({ ...prev, flatShippingCharge: Number(e.target.value) }))}
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">Set to 0 for free shipping</p>
              </div>
              
              <div>
                <Label htmlFor="freeShipping">Free Shipping Above (₹)</Label>
                <Input
                  id="freeShipping"
                  type="number"
                  value={deliverySettings.freeShippingAbove}
                  onChange={(e) => setDeliverySettings(prev => ({ ...prev, freeShippingAbove: Number(e.target.value) }))}
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">Orders above this amount get free shipping</p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Delivery Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="estimatedDelivery">Estimated Delivery Time (Days)</Label>
                <select
                  id="estimatedDelivery"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                  value={deliverySettings.estimatedDelivery}
                  onChange={(e) => setDeliverySettings(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                >
                  <option value="1">Same Day</option>
                  <option value="1-2">1-2 Days</option>
                  <option value="3-5">3-5 Days</option>
                  <option value="5-7">5-7 Days</option>
                  <option value="7-10">7-10 Days</option>
                  <option value="10-15">10-15 Days</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  This will be displayed to customers during checkout
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              Delivery Options Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3">How customers will see delivery options:</h4>
              
              {/* Selected Partners */}
              {selectedPartners.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h5 className="font-medium text-gray-700">Available Delivery Partners:</h5>
                  {selectedPartners.map(partnerId => {
                    const partner = deliveryPartners.find(p => p.id === partnerId);
                    return partner ? (
                      <div key={partnerId} className="flex items-center gap-3 p-2 border rounded">
                        <span className="text-lg">{partner.logo}</span>
                        <span className="font-medium">{partner.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* Manual Delivery */}
              {deliverySettings.enableManualDelivery && (
                <div className="mb-4">
                  <div className="flex items-center gap-3 p-2 border rounded">
                    <span className="text-lg">🏠</span>
                    <span className="font-medium">Manual Delivery Available</span>
                  </div>
                </div>
              )}

              {/* Shipping Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Shipping Charges:</span>
                  <span className="font-medium">
                    {deliverySettings.flatShippingCharge === 0 ? 'Free' : `₹${deliverySettings.flatShippingCharge}`}
                  </span>
                </div>
                {deliverySettings.freeShippingAbove > 0 && (
                  <div className="flex justify-between">
                    <span>Free Shipping Above:</span>
                    <span className="font-medium">₹{deliverySettings.freeShippingAbove}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-medium">{deliverySettings.estimatedDelivery} days</span>
                </div>
              </div>

              {selectedPartners.length === 0 && !deliverySettings.enableManualDelivery && (
                <p className="text-gray-500 italic">No delivery options configured yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliverySetupSection;
