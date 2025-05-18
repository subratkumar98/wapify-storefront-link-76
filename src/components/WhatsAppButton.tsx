
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 text-center">
      <a 
        href="https://wa.me/919348848277?text=Hi%2C%20I%20have%20a%20question%20about%20your%20Instagram%20shop%20builder!" 
        target="_blank" 
        rel="noreferrer" 
        className="flex justify-center items-center bg-whatsapp rounded-full w-14 h-14 shadow-lg hover:bg-whatsapp-dark transition-colors animate-bounce-light"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
      <div className="mt-2 bg-white p-2 px-3 rounded-xl text-xs font-semibold text-gray-800 shadow-md">
        Have a question? Chat with us now!
      </div>
    </div>
  );
};

export default WhatsAppButton;
