
import React from 'react';
import { Timer } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import AnimatedCounter from './AnimatedCounter';
import RegistrationForm from './RegistrationForm';

export const EarlyAccessSection: React.FC = () => {
  return (
    <section id="early-access" className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center mb-6 px-4 py-2 bg-whatsapp/10 rounded-full">
                <Timer className="w-5 h-5 text-whatsapp mr-2 animate-countdown" />
                <CountdownTimer />
                <span className="ml-2 font-semibold">Only 24 Hours Left!</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Early Access Registration
              </h2>
              
              <p className="text-xl text-gray-600 mb-4">
                Join the First 500 Businesses to get Wapify for <span className="font-bold">₹799</span> <span className="line-through text-gray-400">₹1999</span> for 3 Months.
              </p>
              
              <p className="text-lg font-semibold text-gray-700 mb-8">
                Already <AnimatedCounter end={468} duration={1500} /> Shops Joined – Don't Miss Out!
              </p>
            </div>
            
            <RegistrationForm />
            
            <p className="mt-4 text-sm text-center text-gray-500">
              No hidden fees. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
