
import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center">
      {/* WhatsApp Icon */}
      <a 
        href="https://wa.me/919348848277?text=Hi%2C%20I%20have%20a%20question%20about%20your%20Instagram%20shop%20builder!" 
        target="_blank" 
        rel="noreferrer" 
        className="flex justify-center items-center bg-whatsapp p-3.5 rounded-full shadow-lg animate-bounce"
        style={{animation: "bounce 2s infinite"}}
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
          alt="WhatsApp Icon" 
          className="w-8 h-8"
        />
      </a>
      
      {/* Call to Action Text */}
      <div className="mt-2.5 bg-white rounded-xl py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-md text-center leading-tight">
        Have a question?<br />
        <span className="text-whatsapp">Chat with us now!</span>
      </div>

      {/* Bounce Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
