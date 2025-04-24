import React from 'react';
import { ArrowDown } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: "Enter your shop name and products",
    description: "Create your digital store by adding your business name, description, and product catalog - all in minutes.",
    icon: "📝",
  },
  {
    number: 2,
    title: "Get a beautiful WhatsApp-integrated store link",
    description: "Receive your personalized store link that connects directly with your WhatsApp Business account.",
    icon: "🔗",
  },
  {
    number: 3,
    title: "Share on Instagram/WhatsApp",
    description: "Post your store link on social media platforms where your customers already follow you.",
    icon: "📱",
  },
  {
    number: 4,
    title: "Start receiving orders with auto-responses",
    description: "Get instant notifications and let automated responses handle customer inquiries 24/7.",
    icon: "💰",
  },
];

export const StepsSection: React.FC = () => {
  return (
    <section id="how-it-works" className="section bg-gray-50 py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Wapify Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to transform your WhatsApp into a powerful sales channel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="step-card opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-whatsapp/10 rounded-full mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-whatsapp text-white font-bold text-sm mb-3">
                  {step.number}
                </span>
                
                <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex justify-center mt-6">
                  <ArrowDown className="w-6 h-6 text-whatsapp animate-bounce-light" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
