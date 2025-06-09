import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer>
      {/* New Header-like Section */}
      <div className="bg-whatsapp text-white py-2 px-4 hover:bg-whatsapp-dark transition-all duration-300">
        <div className="container-custom flex flex-col md:flex-row items-center justify-center md:justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span>Join our community of successful business owners</span>
          </div>
          <div className="flex items-center space-x-2 mt-1 md:mt-0">
            <span>Follow us on social media for tips and updates</span>
          </div>
          <div className="mt-1 md:mt-0">
            <span>Get started at <span className="font-bold">₹799</span> <span className="line-through text-gray-200">₹1999</span></span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              {/* Updated logo and text style with reduced spacing */}
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/9d30d353-c3ad-4369-9f53-74d4119557bf.png" 
                  alt="GetWapify Logo" 
                  className="h-12 w-auto"
                />
                <div className="flex items-center ml-1">
                  <span className="text-2xl font-bold gradient-text">Get</span>
                  <span className="text-2xl font-bold gradient-text">Wapify</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Turn your WhatsApp into a profitable online store in 2 minutes. No website. No coding. Just one link to sell more.
              </p>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-1">Contact:</p>
                <a href="mailto:hello@getwapify.com" className="text-white hover:text-whatsapp">hello@getwapify.com</a>
                <div>
                  <a href="tel:+919348848277" style={{color: '#000', fontWeight: 'bold', textDecoration: 'none'}}>
                    ☎️ +91 93488 48277
                  </a>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/getwapifynow/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/getwapify-hq-0b2195366" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://x.com/GetWapify" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://youtube.com/@getwapify" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61575938533647" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#early-access" className="text-gray-300 hover:text-white transition-colors">Early Access</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 GetWapify Technologies Pvt Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
