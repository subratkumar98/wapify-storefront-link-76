
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "I run a cake shop and GetWapify gave me a shop link in 2 minutes. My orders doubled in 3 days!",
    name: "Meena Sharma",
    business: "Sweet Slice Cakes",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    quote: "As a fashion store on Instagram, I never imagined I could get a shop like this without coding!",
    name: "Ritika Jain",
    business: "Glam Closet",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    quote: "Jewelry store owners like me now get instant WhatsApp orders without a website!",
    name: "Anita Sharma",
    business: "Tanishq Jewels",
    avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    quote: "GetWapify is cheaper, faster, and more powerful than anything I've tried.",
    name: "Ramesh Kumar",
    business: "TimeMaster Watches",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    quote: "Setup was incredibly easy, and the automated responses have saved me so much time!",
    name: "Priya Patel",
    business: "Priya's Boutique",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    quote: "My customers love how easy it is to browse and order through WhatsApp now.",
    name: "Raj Malhotra",
    business: "Tech Gadgets Hub",
    avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Businesses Love GetWapify
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of small businesses already selling more with GetWapify
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="testimonial-card h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-6 w-6 text-whatsapp" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    <p className="flex-grow mb-6 italic text-gray-700">{testimonial.quote}</p>
                    
                    <div className="flex items-center mt-auto">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.business}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 space-x-4">
            <CarouselPrevious className="static transform-none rounded-full" />
            <CarouselNext className="static transform-none rounded-full" />
          </div>
        </Carousel>
        
        <div className="mt-16 rounded-2xl bg-white shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-8 text-center">
              <div className="text-4xl font-bold text-whatsapp mb-2">500+</div>
              <p className="text-gray-600">Active Businesses</p>
            </div>
            <div className="p-8 text-center">
              <div className="text-4xl font-bold text-whatsapp mb-2">2x</div>
              <p className="text-gray-600">Average Sales Increase</p>
            </div>
            <div className="p-8 text-center">
              <div className="text-4xl font-bold text-whatsapp mb-2">2 min</div>
              <p className="text-gray-600">Setup Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
