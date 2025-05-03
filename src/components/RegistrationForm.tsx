
import React, { useState } from 'react';
import { Button } from './ui/button';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter,
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from './ui/drawer';

export const RegistrationForm = () => {
  const [isFormLoading, setIsFormLoading] = useState(true);
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfQDwEutWnU7LPrCQimJX9Qr0YPoGbci0O5zWZT2KsXpHBdlA/viewform?embedded=true";

  return (
    <div className="flex flex-col items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="lg" className="bg-whatsapp hover:bg-whatsapp/90 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Get Early Access for ₹799
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader className="text-center">
            <DrawerTitle>Early Access Registration</DrawerTitle>
            <DrawerDescription>
              Join the First 500 Businesses at a Special Price
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 flex-1 relative overflow-hidden">
            {isFormLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-whatsapp border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-3 text-gray-600">Loading Registration Form...</p>
                </div>
              </div>
            )}
            
            <iframe 
              src={googleFormUrl}
              title="Wapify Early Access Registration Form"
              className="w-full h-full border-0 rounded-lg"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              onLoad={() => setIsFormLoading(false)}
            >
              Loading Google Form...
            </iframe>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      <p className="mt-4 text-sm text-center text-gray-500">
        By registering, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default RegistrationForm;
