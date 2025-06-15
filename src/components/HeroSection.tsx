import React from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { VideoButton } from './VideoModal';

export const HeroSection: React.FC = () => {
  return (
    <section className="section pt-48 pb-20 md:pt-56 md:pb-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-8 opacity-0 animate-fade-in">
            <div className="flex items-center gap-2 text-whatsapp font-semibold text-base md:text-lg animate-fade-in-right">
              <Sparkles className="h-6 w-6 animate-pulse" />
              <span className="animate-fade-in delay-100">The Easiest Way to Sell Online</span>
            </div>
            
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-black animate-fade-in delay-200">
                Transform Your WhatsApp into a{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#25D366] to-[#128C7E] animate-pulse">
                  Profitable Online Store
                </span>{' '}
                in Just 2 Minutes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-lg animate-fade-in delay-400">
              No Website. No Coding. Just One Link to Sell More.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <a 
                href="#pricing" 
                className="cta-button inline-flex items-center justify-center hover:animate-wiggle"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce-light" />
              </a>
              
            </div>
          </div>
          
          {/* Illustration */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] opacity-0 animate-fade-in animate-delay-200">
            <div className="absolute inset-0 flex items-start justify-center pt-12">
              <div className="relative w-full h-full">
                {/* Payment Success Notification - Improved smooth animation */}
                <div className="absolute -top-6 right-4 md:right-16 lg:right-24 bg-white rounded-lg shadow-lg p-3 z-10 transition-all duration-700 hover:scale-105 cursor-pointer animate-[bounce_4s_ease-in-out_infinite]">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
                    <span className="text-sm font-semibold">Payment Received Successfully!</span>
                    <CheckCircle className="h-4 w-4 text-green-500 animate-[pulse_3s_ease-in-out_infinite]" />
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-whatsapp/10 animate-pulse"></div>
                
                <img 
                  src="/lovable-uploads/15adcc99-ac4f-41d4-9f28-46381d2d0617.png" 
                  alt="Business owner managing WhatsApp orders" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                
                {/* New Order Notification - Improved smooth animation */}
                <div className="absolute bottom-8 left-4 md:bottom-12 md:left-8 lg:bottom-16 lg:left-12 bg-white rounded-lg shadow-lg p-3 transition-all duration-700 hover:scale-105 cursor-pointer animate-[bounce_4s_ease-in-out_infinite_1s]">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-whatsapp rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
                    <span className="text-sm font-semibold">New Order Received!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
