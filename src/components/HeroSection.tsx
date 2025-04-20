
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { VideoButton } from './VideoModal';

export const HeroSection: React.FC = () => {
  return (
    <section className="section pt-48 pb-20 md:pt-56 md:pb-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 opacity-0 animate-fade-in">
            <div className="flex items-center gap-2 text-whatsapp font-medium animate-fade-in-right">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm md:text-base">The Easiest Way to Sell Online</span>
            </div>
            
            <h1 className="relative">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-whatsapp to-whatsapp-dark bg-clip-text text-transparent animate-fade-in transition-all duration-300 hover:scale-[1.02]">
                Transform Your WhatsApp
              </span>
              <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in delay-100">
                Into a <span className="bg-whatsapp text-white px-2 py-1 rounded-lg inline-block transform hover:scale-105 transition-all duration-300">Money-Making</span> Store
              </span>
              <span className="block mt-2 text-2xl md:text-3xl text-gray-600 font-medium animate-fade-in delay-200">
                Set up in just 2 minutes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 animate-fade-in delay-300">
              No Website. No Coding. Just One Link to Sell More.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <a 
                href="#early-access" 
                className="cta-button inline-flex items-center justify-center"
              >
                Join Early Access Now at ₹799
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce-light" />
              </a>
              
              <VideoButton />
            </div>
          </div>
          
          {/* Illustration */}
          <div className="relative h-80 md:h-96 lg:h-[500px] opacity-0 animate-fade-in animate-delay-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-whatsapp/10 animate-pulse"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Small business owner using Wapify on WhatsApp" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-xl shadow-2xl"
                />
                
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 bg-white rounded-lg shadow-lg p-3 animate-bounce-light">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-whatsapp rounded-full"></div>
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
