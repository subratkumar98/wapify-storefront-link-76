
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { 
  Truck, 
  ArrowLeft, 
  Save, 
  MapPin, 
  Clock, 
  DollarSign,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeliveryPartnerSectionProps {
  userPlan: 'free' | 'pro';
  onSave: () => void;
  onBack: () => void;
}

const DeliveryPartnerSection: React.FC<DeliveryPartnerSectionProps> = ({ 
  userPlan, 
  onSave, 
  onBack 
}) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    selfDelivery: true,
    deliveryRadius: 5,
    deliveryTime: '30-45 minutes',
    deliveryCharges: 50,
    freeDeliveryAbove: 500,
    dunzoIntegration: false,
    swiggyIntegration: false,
    zomatoIntegration: false,
    deliveryPartnerApiKey: '',
    enableScheduledDelivery: false,
    enableExpressDelivery: false
  });

  const handleSave = () => {
    toast({
      title: "Delivery Settings Saved!",
      description: "Your delivery partner configuration has been updated successfully.",
    });
    onSave();
  };

  const deliveryPartners = [
    {
      id: 'dunzo',
      name: 'Dunzo',
      description: 'Quick local delivery in major cities',
      features: ['Same day delivery', 'Real-time tracking', 'City-wide coverage'],
      pricing: '₹40-80 per delivery',
      pro: true
    },
    {
      id: 'swiggy',
      name: 'Swiggy Genie',
      description: 'Reliable delivery service',
      features: ['Fast delivery', 'Wide coverage', 'Trusted brand'],
      pricing: '₹35-70 per delivery',
      pro: true
    },
    {
      id: 'zomato',
      name: 'Zomato',
      description: 'Food and grocery delivery',
      features: ['Food delivery', 'Grocery delivery', 'Live tracking'],
      pricing: '₹30-60 per delivery',
      pro: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Truck className="h-8 w-8 text-blue-600" />
                Choose Delivery Partner
              </h1>
              <p className="text-gray-600 mt-2">Set up delivery options for your customers</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Self Delivery */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Self Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Enable Self Delivery</span>
                  <p className="text-sm text-gray-600">Deliver orders yourself or with your team</p>
                </div>
                <Switch
                  checked={settings.selfDelivery}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, selfDelivery: checked }))}
                />
              </div>

              {settings.selfDelivery && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                    <Input
                      id="deliveryRadius"
                      type="number"
                      value={settings.deliveryRadius}
                      onChange={(e) => setSettings(prev => ({ ...prev, deliveryRadius: Number(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryTime">Estimated Delivery Time</Label>
                    <Input
                      id="deliveryTime"
                      placeholder="e.g., 30-45 minutes"
                      value={settings.deliveryTime}
                      onChange={(e) => setSettings(prev => ({ ...prev, deliveryTime: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryCharges">Delivery Charges (₹)</Label>
                      <Input
                        id="deliveryCharges"
                        type="number"
                        value={settings.deliveryCharges}
                        onChange={(e) => setSettings(prev => ({ ...prev, deliveryCharges: Number(e.target.value) }))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="freeDelivery">Free Delivery Above (₹)</Label>
                      <Input
                        id="freeDelivery"
                        type="number"
                        value={settings.freeDeliveryAbove}
                        onChange={(e) => setSettings(prev => ({ ...prev, freeDeliveryAbove: Number(e.target.value) }))}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {userPlan === 'pro' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Scheduled Delivery</span>
                        <Switch
                          checked={settings.enableScheduledDelivery}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableScheduledDelivery: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Express Delivery</span>
                        <Switch
                          checked={settings.enableExpressDelivery}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableExpressDelivery: checked }))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Third-party Partners */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-600" />
                Third-party Partners
                {userPlan === 'free' && <Crown className="h-4 w-4 text-orange-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {deliveryPartners.map((partner) => (
                  <div key={partner.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <Truck className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{partner.name}</h4>
                          <p className="text-sm text-gray-600">{partner.description}</p>
                        </div>
                      </div>
                      <Switch
                        disabled={userPlan === 'free'}
                        checked={settings[`${partner.id}Integration` as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => {
                          if (userPlan === 'free') {
                            toast({
                              title: "Upgrade Required",
                              description: `${partner.name} integration is available in Pro plan`,
                              variant: "destructive"
                            });
                            return;
                          }
                          setSettings(prev => ({ 
                            ...prev, 
                            [`${partner.id}Integration`]: checked 
                          }));
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-medium">Features:</span>
                        <ul className="text-gray-600 mt-1">
                          {partner.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium">Pricing:</span>
                        <p className="text-gray-600 mt-1">{partner.pricing}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {userPlan === 'free' && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-orange-800">Upgrade to Pro</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Get access to third-party delivery partners and advanced delivery features.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Delivery Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Customer will see:</h3>
              <div className="space-y-3">
                {settings.selfDelivery && (
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Self Delivery</p>
                        <p className="text-sm text-gray-600">{settings.deliveryTime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{settings.deliveryCharges}</p>
                      <p className="text-xs text-green-600">
                        Free above ₹{settings.freeDeliveryAbove}
                      </p>
                    </div>
                  </div>
                )}
                {Object.entries(settings).filter(([key, value]) => 
                  key.includes('Integration') && value
                ).map(([key]) => {
                  const partnerName = key.replace('Integration', '');
                  const partner = deliveryPartners.find(p => p.id === partnerName);
                  return partner ? (
                    <div key={key} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          <p className="text-sm text-gray-600">Professional delivery</p>
                        </div>
                      </div>
                      <p className="font-medium">{partner.pricing}</p>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryPartnerSection;
