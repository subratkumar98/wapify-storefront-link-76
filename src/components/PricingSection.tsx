
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, X } from 'lucide-react';
import { Button } from './ui/button';

const PricingSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | null>(null);

  const freePlanFeatures = [
    { text: "1 Storefront only", included: true },
    { text: "3 Products maximum", included: true },
    { text: "Basic layout themes", included: true },
    { text: "Razorpay integration only", included: true },
    { text: "Basic support", included: true },
    { text: "Auto-generated store link", included: true },
    { text: "WhatsApp integration", included: true },
    { text: "No reviews system", included: false },
    { text: "No animation features", included: false },
    { text: "No share QR/poster", included: false },
    { text: "Watermarked footer", included: false }
  ];

  const proPlanFeatures = [
    { text: "Unlimited Products", included: true },
    { text: "Custom Storefront Design", included: true },
    { text: "All payment integrations (Razorpay, Stripe, UPI QR)", included: true },
    { text: "Animated discount tools & spin wheel", included: true },
    { text: "WhatsApp automation", included: true },
    { text: "Advanced themes & customization", included: true },
    { text: "Auto-generated posters + QR", included: true },
    { text: "Reviews & ratings system", included: true },
    { text: "Priority Support", included: true },
    { text: "Analytics dashboard", included: true },
    { text: "Shipping integration (Shiprocket, Pickrr)", included: true },
    { text: "Product videos & multiple images", included: true },
    { text: "Custom fonts & background colors", included: true },
    { text: "Cash on Delivery option", included: true },
    { text: "Tax & shipping calculator", included: true },
    { text: "Export orders to CSV", included: true }
  ];

  const handlePlanSelection = (plan: 'free' | 'pro') => {
    setSelectedPlan(selectedPlan === plan ? null : plan);
  };

  return (
    <section id="pricing" className="section bg-white py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade when you're ready to scale your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className={`border-2 transition-all duration-300 ${
            selectedPlan === 'free' ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Perfect for getting started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white mb-4"
                onClick={() => handlePlanSelection('free')}
              >
                {selectedPlan === 'free' ? 'Hide Features' : 'Get Started for Free'}
              </Button>
              
              {selectedPlan === 'free' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-center">Free Plan Features</h4>
                  <ul className="space-y-2 text-sm">
                    {freePlanFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-gray-500 line-through'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800 font-medium">
                      🚀 <strong>User Flow:</strong> Sign up with email/phone → OTP verification → Add business details → Get your free store link: getwapify.com/@yourstorename
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className={`border-2 transition-all duration-300 relative ${
            selectedPlan === 'pro' ? 'border-whatsapp shadow-lg' : 'border-whatsapp hover:border-whatsapp-dark'
          }`}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-whatsapp text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl font-bold">GetWapify Pro</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹9</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Full access to all features</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white mb-4"
                onClick={() => handlePlanSelection('pro')}
              >
                {selectedPlan === 'pro' ? 'Hide Features' : 'Unlock Full Store – ₹9/month'}
              </Button>
              
              {selectedPlan === 'pro' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-center">Pro Plan Features</h4>
                  <ul className="space-y-2 text-sm max-h-60 overflow-y-auto">
                    {proPlanFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-whatsapp mr-2 flex-shrink-0" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-whatsapp/10 rounded border-l-4 border-whatsapp">
                    <p className="text-sm text-gray-800 font-medium">
                      💎 <strong>Pro User Flow:</strong> Sign up → Payment via Razorpay (₹9) → Full store customization → Advanced features unlocked → Professional onboarding wizard
                    </p>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="text-sm text-yellow-800">
                      <strong>Bonus:</strong> Auto-generate QR codes, downloadable posters, advanced analytics, and WhatsApp automation!
                    </p>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-600 text-center mt-2">
                Start with free plan, upgrade anytime
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include WhatsApp integration and 24/7 customer support
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
