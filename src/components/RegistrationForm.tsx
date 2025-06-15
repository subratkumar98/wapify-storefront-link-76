
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, CheckCircle, Phone, Mail, User, Store, Hash, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationFormProps {
  planType: 'free' | 'pro';
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ planType }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    contact: '',
    otp: '',
    businessName: '',
    storeName: '',
    storeCategory: '',
    whatsappNumber: '',
    logo: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setFormData(prev => ({ ...prev, logo: file }));
  };

  const sendOTP = async () => {
    console.log('Sending OTP to:', formData.contact);
    toast({
      title: "OTP Sent!",
      description: `Verification code sent to ${formData.contact}`,
    });
    setStep(2);
  };

  const verifyOTP = async () => {
    console.log('Verifying OTP:', formData.otp);
    if (formData.otp === '1234') { // Mock verification
      toast({
        title: "OTP Verified!",
        description: "Please complete your store details",
      });
      setStep(3);
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const completeSignup = async () => {
    if (planType === 'pro') {
      // Handle payment for pro plan
      toast({
        title: "Processing Payment...",
        description: "Redirecting to payment gateway",
      });
      // Mock payment success
      setTimeout(() => {
        localStorage.setItem('userPlan', 'pro');
        localStorage.setItem('userData', JSON.stringify(formData));
        window.location.href = '/storefront-builder';
      }, 2000);
    } else {
      // Complete free signup
      localStorage.setItem('userPlan', 'free');
      localStorage.setItem('userData', JSON.stringify(formData));
      toast({
        title: "Account Created!",
        description: "Welcome to GetWapify Free Plan",
      });
      setTimeout(() => {
        window.location.href = '/storefront-builder';
      }, 1500);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {planType === 'pro' ? 'Join GetWapify Pro' : 'Get Started Free'}
        </CardTitle>
        <p className="text-gray-600">
          {planType === 'pro' ? '₹9/month - Full access to all features' : 'Start with 3 products & basic features'}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <Tabs value={contactMethod} onValueChange={(value) => setContactMethod(value as 'email' | 'phone')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <Button onClick={sendOTP} className="w-full" disabled={!formData.contact}>
              Send OTP
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Enter the 4-digit code sent to {formData.contact}
              </p>
            </div>
            
            <div>
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value)}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-gray-500 mt-1">Try: 1234 for demo</p>
            </div>
            
            <Button onClick={verifyOTP} className="w-full" disabled={formData.otp.length !== 4}>
              Verify OTP
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Complete Your Store Setup</h3>
            
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="storeName">Store Handle</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                  getwapify.com/@
                </span>
                <Input
                  id="storeName"
                  placeholder="mystore"
                  className="rounded-l-none"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="category">Store Category</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.storeCategory}
                onChange={(e) => handleInputChange('storeCategory', e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="fashion">Fashion & Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="food">Food & Beverages</option>
                <option value="beauty">Beauty & Personal Care</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports & Fitness</option>
                <option value="books">Books & Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="logo">Store Logo (Optional)</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="logo-upload" className="cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      Upload a file
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                />
              </div>
              {formData.logo && (
                <p className="text-sm text-green-600 mt-2">✓ {formData.logo.name}</p>
              )}
            </div>
            
            <Button 
              onClick={completeSignup} 
              className="w-full"
              disabled={!formData.businessName || !formData.storeName || !formData.storeCategory}
            >
              {planType === 'pro' ? 'Pay ₹9 & Create Store' : 'Create Free Store'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
