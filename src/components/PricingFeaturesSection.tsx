
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, MessageSquare, Instagram, Package, CircleDollarSign, BarChart3, Users, Rocket, Wallet } from 'lucide-react';

const features = [
  // Row 1 - Core AI Store Features
  {
    icon: <ShoppingBag className="h-10 w-10 text-whatsapp animate-bounce-light" />,
    title: "AI-Powered WhatsApp Storefront",
    description: "Launch your personal AI-powered storefront in 60 seconds — fully WhatsApp integrated."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-whatsapp animate-pulse" />,
    title: "24/7 Auto Replies to Buyers",
    description: "AI handles buyer queries instantly so you never miss a sale — even while you sleep."
  },
  {
    icon: <Instagram className="h-10 w-10 text-whatsapp animate-bounce-light" />,
    title: "Sell on Instagram + WhatsApp Seamlessly",
    description: "Auto-import your IG products and sell directly on WhatsApp."
  },
  
  // Row 2 - Growth + Conversion Tools
  {
    icon: <Package className="h-10 w-10 text-whatsapp animate-bounce-light" />,
    title: "Add Custom Product Bundles + Pricing",
    description: "Offer irresistible bundles and upsell like a pro."
  },
  {
    icon: <CircleDollarSign className="h-10 w-10 text-whatsapp animate-spin-slow" />,
    title: "Spin Discount Wheel & Coupons",
    description: "Gamify your store — boost conversions with custom discount wheels."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-whatsapp animate-bounce-light" />,
    title: "Real-Time Analytics Dashboard",
    description: "Track your sales, buyers, top products & trends with one simple dashboard."
  },
  
  // Row 3 - Community + Rewards
  {
    icon: <Users className="h-10 w-10 text-whatsapp animate-pulse" />,
    title: "Private Community of 10K+ Sellers",
    description: "Connect with fellow sellers, get strategies, and grow together."
  },
  {
    icon: <Rocket className="h-10 w-10 text-whatsapp animate-float" />,
    title: "Faster Sales. Less Work.",
    description: "Let AI automate your busy work so you sell more with less effort."
  },
  {
    icon: <Wallet className="h-10 w-10 text-whatsapp animate-bounce-light" />,
    title: "Referral Cash & Bonuses",
    description: "Share GetWapify. Earn cash. Simple as that."
  }
];

const PricingFeaturesSection: React.FC = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Here's Everything You Get for Just ₹799
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Grow your Instagram store faster with the smartest WhatsApp AI tool — 
            <span className="font-semibold"> for less than ₹10/day!</span>
          </p>
        </div>

        {/* Feature Cards - Row 1 */}
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Core AI Store Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.slice(0, 3).map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 opacity-0 animate-fade-in" 
                  style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 bg-whatsapp/10 p-4 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Cards - Row 2 */}
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Growth + Conversion Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.slice(3, 6).map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 opacity-0 animate-fade-in" 
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 bg-whatsapp/10 p-4 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Cards - Row 3 */}
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Community + Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.slice(6, 9).map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 opacity-0 animate-fade-in" 
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 bg-whatsapp/10 p-4 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Psychological Hooks */}
        <div className="bg-gray-50 rounded-xl p-8 text-center max-w-3xl mx-auto shadow-md border border-gray-100">
          <p className="text-lg font-semibold mb-4">
            "Start free and upgrade when you're ready to scale your business."
          </p>
          <button
            onClick={scrollToPricing}
            className="bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xl mb-6 py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started for Free
          </button>
          <p className="text-gray-600">
            Start with our free plan and upgrade to Pro for advanced features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingFeaturesSection;
