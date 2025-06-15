
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from 'lucide-react';
import { Button } from './ui/button';

const PricingSection: React.FC = () => {
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
          <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Perfect for getting started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>1 Storefront</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>3 Products</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Limited themes</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Razorpay only</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Basic support</span>
                </li>
              </ul>
              <Button className="w-full mt-8 bg-gray-600 hover:bg-gray-700 text-white">
                Get Started for Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-whatsapp hover:border-whatsapp-dark transition-all duration-300 relative">
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
              <p className="text-gray-600 mt-2">For growing businesses</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>Unlimited Products</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>Custom Storefront</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>All payment integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>Animated discount tools</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>WhatsApp automation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>Advanced themes</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>Auto-generated posters + QR</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Button className="w-full mt-8 bg-whatsapp hover:bg-whatsapp-dark text-white">
                Get Started for Free
              </Button>
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
