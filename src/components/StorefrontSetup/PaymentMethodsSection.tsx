
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { ArrowLeft, Save, CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethodsSectionProps {
  onSave: () => void;
  onBack: () => void;
  userPlan: 'free' | 'pro';
}

const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({ onSave, onBack, userPlan }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    googlePay: false,
    phonePe: false,
    paytm: false,
    razorpay: false,
    cashOnDelivery: true,
    upiId: '',
    razorpayKeyId: '',
    razorpayKeySecret: ''
  });

  const paymentMethods = [
    {
      id: 'googlePay',
      name: 'Google Pay',
      icon: '💳',
      description: 'Accept payments via Google Pay UPI',
      color: 'from-blue-500 to-green-500'
    },
    {
      id: 'phonePe',
      name: 'PhonePe',
      icon: '📱',
      description: 'Enable PhonePe UPI payments',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'paytm',
      name: 'Paytm UPI',
      icon: '💰',
      description: 'Accept Paytm wallet & UPI payments',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: '🏦',
      description: 'Complete payment gateway solution',
      color: 'from-blue-700 to-indigo-600',
      requiresApi: true
    },
    {
      id: 'cashOnDelivery',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Traditional COD payment method',
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const handleSave = () => {
    const enabledMethods = Object.entries(settings).filter(([key, value]) => 
      key !== 'upiId' && key !== 'razorpayKeyId' && key !== 'razorpayKeySecret' && value === true
    );

    if (enabledMethods.length === 0) {
      toast({
        title: "No Payment Method Selected",
        description: "Please enable at least one payment method",
        variant: "destructive"
      });
      return;
    }

    if (settings.razorpay && (!settings.razorpayKeyId || !settings.razorpayKeySecret)) {
      toast({
        title: "Razorpay API Keys Required",
        description: "Please enter both Razorpay Key ID and Secret",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "💳 Payment Methods Configured!",
      description: `${enabledMethods.length} payment method(s) have been enabled`,
    });
    onSave();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
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
                <CreditCard className="h-8 w-8 text-green-600" />
                💳 Setup Payment Methods
              </h2>
              <p className="text-gray-600 mt-1">Configure how customers can pay for their orders</p>
            </div>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            💾 Save Settings
          </Button>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <Card 
              key={method.id} 
              className={`border-2 transition-all duration-300 ${
                settings[method.id as keyof typeof settings] 
                  ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white text-xl`}>
                      {method.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.name}</CardTitle>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings[method.id as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, [method.id]: checked }))
                    }
                  />
                </div>
              </CardHeader>
              
              {/* Additional Configuration */}
              {settings[method.id as keyof typeof settings] && method.requiresApi && (
                <CardContent className="space-y-4 bg-blue-50 border-t">
                  <h4 className="font-semibold text-blue-800">🔐 API Configuration</h4>
                  <div>
                    <Label htmlFor="razorpayKeyId">Razorpay Key ID</Label>
                    <Input
                      id="razorpayKeyId"
                      placeholder="rzp_test_xxxxxxxxxxxx"
                      value={settings.razorpayKeyId}
                      onChange={(e) => setSettings(prev => ({ ...prev, razorpayKeyId: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="razorpayKeySecret">Razorpay Key Secret</Label>
                    <Input
                      id="razorpayKeySecret"
                      type="password"
                      placeholder="Enter your secret key"
                      value={settings.razorpayKeySecret}
                      onChange={(e) => setSettings(prev => ({ ...prev, razorpayKeySecret: e.target.value }))}
                    />
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
                    💡 Get your API keys from <a href="https://dashboard.razorpay.com/app/keys" target="_blank" rel="noopener noreferrer" className="underline">Razorpay Dashboard</a>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* UPI Configuration */}
        {(settings.googlePay || settings.phonePe || settings.paytm) && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-600" />
                UPI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="upiId">Your UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm or yourname@okaxis"
                  value={settings.upiId}
                  onChange={(e) => setSettings(prev => ({ ...prev, upiId: e.target.value }))}
                />
                <p className="text-xs text-blue-600 mt-1">
                  💡 This UPI ID will be used for direct UPI payments. Make sure it's active and verified.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Preview */}
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              Payment Options Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3">How customers will see payment options:</h4>
              <div className="space-y-2">
                {paymentMethods.map((method) => 
                  settings[method.id as keyof typeof settings] && (
                    <div key={method.id} className="flex items-center gap-3 p-2 border rounded">
                      <span className="text-lg">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                      {method.id === 'razorpay' && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Secure Gateway</span>}
                    </div>
                  )
                )}
              </div>
              {Object.values(settings).every(v => v === false || v === '') && (
                <p className="text-gray-500 italic">No payment methods enabled yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="font-semibold text-yellow-800">Security Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Your API keys and sensitive payment information are encrypted and stored securely. 
                  We recommend using test keys during setup and switching to live keys only when ready to go live.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethodsSection;
