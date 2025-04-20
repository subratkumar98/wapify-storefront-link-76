
import React from 'react';

const features = [
  {
    title: "No-Code Store Builder",
    description: "Create a beautiful storefront in minutes with our simple interface - zero technical skills needed.",
    icon: "💻",
  },
  {
    title: "WhatsApp Integration",
    description: "Seamless connection with WhatsApp Business for messaging, orders, and customer support.",
    icon: "📱",
  },
  {
    title: "Product Catalog",
    description: "Easily add unlimited products with images, descriptions, and prices to your store.",
    icon: "🛍️",
  },
  {
    title: "Auto-Responders",
    description: "Set up automated responses for common questions and order confirmations.",
    icon: "🤖",
  },
  {
    title: "Payment Links",
    description: "Accept payments directly through UPI, bank transfers, and other popular methods.",
    icon: "💰",
  },
  {
    title: "Analytics Dashboard",
    description: "Track visitors, orders, and revenue with a simple yet powerful analytics dashboard.",
    icon: "📊",
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features, <span className="gradient-text">Simple Interface</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to turn casual browsers into paying customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-whatsapp/10 rounded-lg">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-whatsapp/10 to-whatsapp/5 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why Choose Wapify Over Alternatives?
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 rounded-full bg-whatsapp flex items-center justify-center text-white">✓</div>
                  </div>
                  <p className="mt-0.5"><span className="font-semibold">No Website Needed</span> - Skip expensive web development</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 rounded-full bg-whatsapp flex items-center justify-center text-white">✓</div>
                  </div>
                  <p className="mt-0.5"><span className="font-semibold">2-Minute Setup</span> - Start selling today, not next week</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 rounded-full bg-whatsapp flex items-center justify-center text-white">✓</div>
                  </div>
                  <p className="mt-0.5"><span className="font-semibold">Fraction of the Cost</span> - ₹799 vs ₹20,000+ for websites</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 rounded-full bg-whatsapp flex items-center justify-center text-white">✓</div>
                  </div>
                  <p className="mt-0.5"><span className="font-semibold">WhatsApp-First</span> - Built specifically for conversational commerce</p>
                </li>
              </ul>
            </div>
            
            <div className="relative h-64 md:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital storefront on mobile device" 
                  className="rounded-xl shadow-xl object-cover max-h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
