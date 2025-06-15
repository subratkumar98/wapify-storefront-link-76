
import React from 'react';
import PillCountdownTimer from './PillCountdownTimer';
import AnimatedCounter from './AnimatedCounter';
import RegistrationForm from './RegistrationForm';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

export const EarlyAccessSection: React.FC = () => {
  return (
    <section id="early-access" className="section bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in">
          <div className="p-6 md:p-10">
            <div className="text-center mb-8">
              <div className="mb-6 animate-pulse hover:bg-whatsapp/20 transition-all duration-500">
                <PillCountdownTimer />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in delay-100">
                Join the GetWapify Community
              </h2>
              
              <p className="text-xl text-gray-600 mb-4 animate-fade-in delay-200">
                Start your WhatsApp store journey today with our <span className="font-bold">Free Plan</span> and upgrade to Pro when you're ready.
              </p>
              
              <p className="text-lg font-semibold text-gray-700 mb-6 animate-fade-in delay-300">
                Already <AnimatedCounter end={8947} duration={1500} /> Shops Joined – Don't Miss Out!
              </p>
            </div>
            
            <div className="animate-fade-in delay-400 flex flex-col items-center space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-xl">
                    Get Started for Free
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <RegistrationForm planType="free" />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-whatsapp hover:bg-whatsapp-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg border-2 border-whatsapp">
                    Unlock Full Store – ₹9/month
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <RegistrationForm planType="pro" />
                </DialogContent>
              </Dialog>

              <p className="text-sm text-gray-600 text-center">
                Compare plans and features above
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
