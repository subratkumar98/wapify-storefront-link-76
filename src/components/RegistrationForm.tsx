
import React from 'react';

export const RegistrationForm = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <iframe 
        src="https://forms.gle/P5CDNphuTDcqtDoaA" 
        title="Wapify Early Access Registration Form"
        className="w-full min-h-[500px] border-0 rounded-lg shadow-sm"
      >
        Loading Google Form...
      </iframe>
      
      <p className="mt-4 text-sm text-center text-gray-500">
        By registering, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default RegistrationForm;
