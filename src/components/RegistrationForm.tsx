
import React from 'react';
import { Button } from './ui/button';

export const RegistrationForm = () => {
  return (
    <div className="flex flex-col items-center">
      <a 
        href="https://forms.gle/vmVu9q4qwiEn9A1A8" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          size="lg" 
          className="bg-whatsapp hover:bg-whatsapp/90 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Early Access for ₹799
        </Button>
      </a>
      
      <p className="mt-4 text-sm text-center text-gray-500">
        By registering, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default RegistrationForm;
