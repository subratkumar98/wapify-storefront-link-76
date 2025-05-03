
import React, { useState, useEffect } from 'react';

export const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay to ensure iframe has time to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-whatsapp border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600">Loading Google Form...</p>
            </div>
          </div>
        )}
        
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSfQDwEutWnU7LPrCQimJX9Qr0YPoGbci0O5zWZT2KsXpHBdlA/viewform?embedded=true"
          title="Wapify Early Access Registration Form"
          className="w-full h-[600px] border-0 rounded-lg shadow-sm"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          onLoad={() => setIsLoading(false)}
        >
          Loading Google Form...
        </iframe>
      </div>
      
      <p className="mt-4 text-sm text-center text-gray-500">
        By registering, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default RegistrationForm;
