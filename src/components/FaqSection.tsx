
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText } from 'lucide-react';

const faqs = [
  {
    question: "Do I need a website or coding skills?",
    answer: "Not at all. Wapify does everything for you. Our platform is designed to be user-friendly and requires zero technical skills to set up and run your online store."
  },
  {
    question: "Can I upload my own products?",
    answer: "Yes, add unlimited products in your store link. You can easily upload product images, add descriptions, set prices, and organize them into categories - all through our simple dashboard."
  },
  {
    question: "How do I receive orders?",
    answer: "Directly on WhatsApp with automated messages. When a customer places an order, you'll receive an instant notification on your WhatsApp Business account, along with all the order details."
  },
  {
    question: "Will this work for cake shops, fashion stores, jewelry stores, etc.?",
    answer: "Yes! 100% tailor-made for Instagram + WhatsApp sellers. Wapify is designed to work for virtually any type of retail business that sells products or services online."
  },
  {
    question: "Is ₹799 a one-time payment?",
    answer: "Yes, for the first 3 months during early access (instead of ₹1999). After the early access period, you can choose to continue with our regular pricing plan or upgrade to unlock more features."
  },
  {
    question: "How do I set up payments?",
    answer: "Wapify supports multiple payment methods including UPI, bank transfers, and cash on delivery. You can easily configure your preferred payment options through the dashboard."
  }
];

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center mb-6 px-4 py-2 bg-whatsapp/10 rounded-full">
            <FileText className="w-5 h-5 text-whatsapp mr-2" />
            <span className="font-semibold">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Wapify
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our team is just a message away to help you get started
            </p>
            <a 
              href="mailto:hello@wapify.in" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Our Support Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
