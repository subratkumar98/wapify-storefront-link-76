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
            <div className="flex items-center gap-2 text-whatsapp font-semibold text-base md:text-lg animate-fade-in-right">
              <Sparkles className="h-6 w-6" />
              <span>The Easiest Way to Sell Online</span>
            </div>
            
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="inline text-black animate-fade-in">
                Turn your WhatsApp into a{' '}
              </span>
              <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:scale-105 transition-transform duration-300">
                profitable online store
              </span>
              <span className="inline text-black animate-fade-in delay-200">
                {' '}in just 2 minutes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-lg animate-fade-in delay-400">
              No Website. No Coding. Just One Link to Sell More.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
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
