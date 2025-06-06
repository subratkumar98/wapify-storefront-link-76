
import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StepsSection from '../components/StepsSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingFeaturesSection from '../components/PricingFeaturesSection';
import ComparisonTable from '../components/ComparisonTable';
import TestimonialsSection from '../components/TestimonialsSection';
import EarlyAccessSection from '../components/EarlyAccessSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Observe all elements with opacity-0 class
    document.querySelectorAll('.opacity-0').forEach((el) => {
      observer.observe(el);
    });

    // Add scroll animations to sections
    document.querySelectorAll('section').forEach((section, index) => {
      const sectionElement = section as HTMLElement;
      sectionElement.style.opacity = '0';
      sectionElement.style.transform = 'translateY(20px)';
      sectionElement.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
      sectionElement.style.transitionDelay = `${index * 0.1}s`;
      
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
              sectionObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      sectionObserver.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to section if URL contains hash
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Responsive top margin to account for fixed header with banner */}
      <div className="pt-28 sm:pt-32 md:pt-36">
        <HeroSection />
        <StepsSection />
        <FeaturesSection />
        <PricingFeaturesSection />
        <ComparisonTable />
        <TestimonialsSection />
        <EarlyAccessSection />
        <FaqSection />
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Index;
