
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CountdownBanner from './CountdownBanner';

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
      <CountdownBanner />
      
      {/* Navigation - with proper mobile spacing */}
      <nav 
        className={`bg-white transition-all duration-300 border-b border-gray-100 ${
          isScrolled ? 'py-2 sm:py-3 shadow-lg' : 'py-3 sm:py-4'
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          {/* Logo - mobile responsive sizing */}
          <a href="#" className="inline-flex items-center group">
            <img 
              src="/lovable-uploads/9d30d353-c3ad-4369-9f53-74d4119557bf.png" 
              alt="Wapify Logo" 
              className="h-8 sm:h-9 md:h-10 w-auto transition-transform group-hover:scale-105" 
            />
            <div className="flex items-center ml-1 sm:ml-2">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 group-hover:text-whatsapp transition-colors">Get</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">Wapify</span>
            </div>
          </a>
          
          {/* Desktop Menu - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-whatsapp font-semibold transition-colors duration-200 text-sm lg:text-base">How It Works</a>
            <a href="#features" className="text-gray-700 hover:text-whatsapp font-semibold transition-colors duration-200 text-sm lg:text-base">Features</a>
            <a href="#reviews" className="text-gray-700 hover:text-whatsapp font-semibold transition-colors duration-200 text-sm lg:text-base">Reviews</a>
            <a href="#faq" className="text-gray-700 hover:text-whatsapp font-semibold transition-colors duration-200 text-sm lg:text-base">FAQ</a>
            <a href="#early-access" className="cta-button shadow-lg hover:shadow-xl text-sm lg:text-base py-2 lg:py-3 px-4 lg:px-6">Get Early Access for ₹799</a>
          </div>
          
          {/* Mobile Menu Button - better touch target */}
          <button 
            className="md:hidden text-gray-700 hover:text-whatsapp p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 touch-manipulation" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu - improved mobile styling */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container-custom py-4 flex flex-col space-y-3">
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-whatsapp font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#features" 
                className="text-gray-700 hover:text-whatsapp font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#reviews" 
                className="text-gray-700 hover:text-whatsapp font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <a 
                href="#faq" 
                className="text-gray-700 hover:text-whatsapp font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="#early-access" 
                className="cta-button w-full text-center mt-2 py-3 px-4 text-base"
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
