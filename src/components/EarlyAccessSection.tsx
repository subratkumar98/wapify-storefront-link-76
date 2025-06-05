
import React, { useState } from 'react';
import { Timer } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import AnimatedCounter from './AnimatedCounter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export const EarlyAccessSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get form elements
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Convert FormData to object
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Submit data to Google Sheets via Google Apps Script
    try {
      await fetch("https://script.google.com/macros/s/AKfycbxLukAOQzWjg9Yg2ZWjIA4gEHMgIaPdLyMJExViqNpw4K0x5OQoZ2uf1UB1b4cLbhb-og/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error submitting to Google Sheet:", error);
    }

    // Save location for payment link and show thank you message
    setUserLocation(data.location);
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setUserLocation("");
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <section id="early-access" className="section bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 opacity-0 animate-fade-in">
          <div className="p-6 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center mb-6 px-4 py-2 bg-whatsapp/10 rounded-full animate-pulse hover:bg-whatsapp/20 transition-all duration-500">
                <Timer className="w-5 h-5 text-whatsapp mr-2 animate-countdown" />
                <CountdownTimer />
                <span className="ml-2 font-semibold">Only 24 Hours Left!</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in delay-100">
                Early Access Registration
              </h2>
              
              <p className="text-xl text-gray-600 mb-4 animate-fade-in delay-200">
                Join the First 500 Businesses to get GetWapify for <span className="font-bold">₹799</span> <span className="line-through text-gray-400">₹1999</span> for 3 Months.
              </p>
              
              <p className="text-lg font-semibold text-gray-700 mb-6 animate-fade-in delay-300">
                Already <AnimatedCounter end={468} duration={1500} /> Shops Joined – Don't Miss Out!
              </p>
            </div>
            
            <div className="animate-fade-in delay-400 flex flex-col items-center">
              <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
                <DialogTrigger asChild>
                  <button 
                    className="bg-whatsapp hover:bg-whatsapp-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-xl"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Get Early Access Now
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-whatsapp mb-4">
                      GetWapify – Join Early Access Now!
                    </DialogTitle>
                  </DialogHeader>
                  
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="form-group">
                        <label htmlFor="email" className="font-semibold mb-1 block">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="name" className="font-semibold mb-1 block">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="business" className="font-semibold mb-1 block">Business / Shop Name</label>
                        <input 
                          type="text" 
                          id="business"
                          name="business" 
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="whatsapp" className="font-semibold mb-1 block">WhatsApp Number</label>
                        <input 
                          type="tel" 
                          id="whatsapp"
                          name="whatsapp" 
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="instagram" className="font-semibold mb-1 block">Instagram Username / Link</label>
                        <textarea 
                          id="instagram" 
                          name="instagram"
                          rows={2}
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                          required 
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="product" className="font-semibold mb-1 block">What Product Do You Sell?</label>
                        <textarea 
                          id="product"
                          name="product" 
                          rows={2}
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                          required 
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="reason" className="font-semibold mb-1 block">Why Do You Want To Use GetWapify? (Optional)</label>
                        <textarea 
                          id="reason"
                          name="reason" 
                          rows={2}
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="language" className="font-semibold mb-1 block">Preferred Language For Storefront?</label>
                        <select 
                          id="language"
                          name="language" 
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base text-gray-700"
                          required
                        >
                          <option value="" disabled selected>Select Language</option>
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Hinglish">Hinglish</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="location" className="font-semibold mb-1 block">Choose Your Location</label>
                        <select 
                          id="location"
                          name="location" 
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base text-gray-700"
                          required
                        >
                          <option value="" disabled selected>Select Location</option>
                          <option value="INDIA">INDIA</option>
                          <option value="INTERNATIONAL">INTERNATIONAL</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="referral" className="font-semibold mb-1 block">Referral Code (Optional)</label>
                        <input 
                          type="text" 
                          id="referral"
                          name="referral" 
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-base"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="mt-6 p-3.5 bg-whatsapp hover:bg-whatsapp-dark text-white text-lg border-none rounded-lg cursor-pointer transition-colors duration-300 ease-out"
                      >
                        Submit & Proceed to Payment
                      </button>
                    </form>
                  ) : (
                    <div className="mt-10 p-5 bg-gray-50 border-l-6 border-whatsapp rounded-lg font-bold">
                      <h2 className="text-xl font-bold mb-4 text-whatsapp">Thank you for joining GetWapify Early Access!</h2>
                      {userLocation === "INDIA" ? (
                        <p className="text-base">
                          <a 
                            href="https://razorpay.me/@GetWapify?amount=ouka7pPo%2Fz198lsjyH%2BoeQ%3D%3D" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            Click here to securely pay ₹799 via Razorpay
                          </a>
                          <br />(100% refundable if not satisfied).
                        </p>
                      ) : (
                        <p className="text-base">
                          <a 
                            href="https://www.paypal.com/ncp/payment/2GTWAL7VFX3TW" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            Click here to securely pay $15 via PayPal
                          </a>
                          <br />(100% refundable if not satisfied).
                        </p>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
