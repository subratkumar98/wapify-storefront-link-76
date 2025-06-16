import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { CreditCard, Smartphone, Crown, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentsSectionProps {
  userPlan: 'free' | 'pro';
  onSave?: () => void;
  onBack?: () => void;
}

const PaymentsSection: React.FC<PaymentsSectionProps> = ({ userPlan, onSave, onBack }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    enableCOD: true,
    enableUPI: false,
    enableCardPayments: false,
    upiId: '',
    deliveryCharges: 0,
    freeDeliveryAbove: 0,
    codCharges: 0
  });

  const handleSave = () => {
    toast({
      title: "Payment Settings Saved!",
      description: "Your payment and delivery settings have been updated",
    });
    if (onSave) {
      onSave();
    }
  };

  const showUpgradeMessage = () => {
    toast({
      title: "Upgrade Required",
      description: "Advanced payment methods available in Pro plan",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button 
                variant="outline" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold">💳 Payments & Delivery</h2>
            </div>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Cash on Delivery (COD)</span>
                </div>
                <Switch
                  checked={settings.enableCOD}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableCOD: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>UPI Payments</span>
                  {userPlan === 'free' && <Crown className="h-4 w-4 text-orange-500" />}
                </div>
                <Switch
                  checked={settings.enableUPI}
                  disabled={userPlan === 'free'}
                  onCheckedChange={(checked) => {
                    if (userPlan === 'free') {
                      showUpgradeMessage();
                      return;
                    }
                    setSettings(prev => ({ ...prev, enableUPI: checked }));
                  }}
                />
              </div>

              {settings.enableUPI && userPlan === 'pro' && (
                <div>
                  <Label htmlFor="upiId">Your UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                    value={settings.upiId}
                    onChange={(e) => setSettings(prev => ({ ...prev, upiId: e.target.value }))}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Online Card Payments</span>
                  {userPlan === 'free' && <Crown className="h-4 w-4 text-orange-500" />}
                </div>
                <Switch
                  checked={settings.enableCardPayments}
                  disabled={userPlan === 'free'}
                  onCheckedChange={(checked) => {
                    if (userPlan === 'free') {
                      showUpgradeMessage();
                      return;
                    }
                    setSettings(prev => ({ ...prev, enableCardPayments: checked }));
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deliveryCharges">Delivery Charges (₹)</Label>
                <Input
                  id="deliveryCharges"
                  type="number"
                  value={settings.deliveryCharges}
                  onChange={(e) => setSettings(prev => ({ ...prev, deliveryCharges: Number(e.target.value) }))}
                />
              </div>

              <div>
                <Label htmlFor="freeDelivery">Free Delivery Above (₹)</Label>
                <Input
                  id="freeDelivery"
                  type="number"
                  placeholder="0 for no free delivery"
                  value={settings.freeDeliveryAbove}
                  onChange={(e) => setSettings(prev => ({ ...prev, freeDeliveryAbove: Number(e.target.value) }))}
                />
              </div>

              <div>
                <Label htmlFor="codCharges">COD Charges (₹)</Label>
                <Input
                  id="codCharges"
                  type="number"
                  placeholder="0 for no COD charges"
                  value={settings.codCharges}
                  onChange={(e) => setSettings(prev => ({ ...prev, codCharges: Number(e.target.value) }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentsSection;
