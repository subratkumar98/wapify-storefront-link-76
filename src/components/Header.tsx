
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import AnimatedCounter from './AnimatedCounter';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Countdown Banner */}
      <div className="bg-whatsapp text-white py-2 px-4 animate-pulse hover:bg-whatsapp-dark transition-all duration-300">
        <div className="container-custom flex flex-col md:flex-row items-center justify-center md:justify-between text-sm">
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <CountdownTimer />
            <span className="inline animate-fade-in">Only 24 hours left</span>
          </div>
          <div className="flex items-center space-x-2 mt-1 md:mt-0 hover:scale-105 transition-transform duration-300">
            <AnimatedCounter end={468} duration={2000} suffix=" businesses joined already" />
          </div>
          <div className="mt-1 md:mt-0 hover:scale-105 transition-transform duration-300">
            <span>Only <span className="font-bold animate-bounce-light">32</span> seats left at <span className="font-bold">₹799</span> <span className="line-through text-gray-200">₹1999</span></span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav 
        className={`bg-white transition-all duration-300 ${
          isScrolled ? 'py-2 shadow-md' : 'py-4'
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          {/* Logo - adjusted to bring text even closer to logo */}
          <a href="#" className="inline-flex items-center">
            <img 
              src="/lovable-uploads/7a19e252-e029-4c15-976d-cdb745f34961.png" 
              alt="Wapify Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold gradient-text -ml-2">Wapify</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-whatsapp font-medium">How It Works</a>
            <a href="#features" className="text-gray-700 hover:text-whatsapp font-medium">Features</a>
            <a href="#reviews" className="text-gray-700 hover:text-whatsapp font-medium">Reviews</a>
            <a href="#faq" className="text-gray-700 hover:text-whatsapp font-medium">FAQ</a>
            <a href="#early-access" className="cta-button">Get Early Access for ₹799</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="container-custom py-4 flex flex-col space-y-4">
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-whatsapp font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#features" 
                className="text-gray-700 hover:text-whatsapp font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#reviews" 
                className="text-gray-700 hover:text-whatsapp font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <a 
                href="#faq" 
                className="text-gray-700 hover:text-whatsapp font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="#early-access" 
                className="cta-button w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Early Access for ₹799
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
