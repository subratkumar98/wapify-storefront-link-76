
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
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Powerful Features, <span className="gradient-text">Simple Interface</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-200">
            Everything you need to turn casual browsers into paying customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform opacity-0 animate-fade-in hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-whatsapp/10 rounded-lg animate-pulse hover:animate-bounce-light transition-all duration-300">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2 hover:text-whatsapp transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-whatsapp/10 to-whatsapp/5 rounded-2xl p-8 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '700ms' }}>
                Why Choose Wapify Over Alternatives?
              </h3>
              
              <ul className="space-y-4">
                {[
                  {
                    title: "No Website Needed",
                    description: "Skip expensive web development"
                  },
                  {
                    title: "2-Minute Setup",
                    description: "Start selling today, not next week"
                  },
                  {
                    title: "Fraction of the Cost",
                    description: "₹799 vs ₹20,000+ for websites"
                  },
                  {
                    title: "WhatsApp-First",
                    description: "Built specifically for conversational commerce"
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start opacity-0 animate-fade-in" style={{ animationDelay: `${800 + idx * 100}ms` }}>
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-6 h-6 rounded-full bg-whatsapp flex items-center justify-center text-white animate-pulse">✓</div>
                    </div>
                    <p className="mt-0.5"><span className="font-semibold">{item.title}</span> - {item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-64 md:h-80 opacity-0 animate-fade-in" style={{ animationDelay: '1000ms' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital storefront on mobile device" 
                  className="rounded-xl shadow-xl object-cover max-h-full hover:scale-105 transition-transform duration-500 animate-float"
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
