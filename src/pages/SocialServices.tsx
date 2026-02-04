import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { PricingSection } from "@/components/ui/pricing";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { ReadyToBuild } from "@/components/ui/ready-to-build";




const SocialServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground transition-colors duration-300 overflow-x-hidden">
      <Navigation />

      {/* Hero Section - Scroll Morph Hero */}
      <ScrollMorphHero />

      {/* Services Grid (Preserved Layout) */}


      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative px-4 md:px-6 py-16 md:py-24 overflow-hidden"
      >
        <PricingSection
          className="text-white w-full"
          heading="Pricing"
          description="Professional social media marketing packages"
          plans={[
            {
              name: 'Single Account',
              info: 'Perfect for businesses focusing on one platform',
              price: {
                monthly: 0,
                yearly: 0,
              },
              priceFormatted: '₹35,000/mo',
              accent: 'text-purple-400',
              buttonVariant: 'outline',
              buttonClass: 'border-purple-400/20 hover:bg-purple-400/10 text-purple-400',
              features: [
                { text: '1 Account management' },
                { text: 'Content creation & posting' },
                { text: 'Community engagement' },
                { text: 'Monthly analytics report' },
                { text: 'Strategy consultation' },
              ],
              btn: {
                text: 'Get Started',
                href: '/contact',
              },
            },
            {
              highlighted: true,
              name: '3 Accounts',
              info: 'For businesses with multi-platform presence',
              price: {
                monthly: 0,
                yearly: 0,
              },
              priceFormatted: '₹80,000/mo',
              accent: 'text-blue-400',
              buttonVariant: 'default',
              buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20',
              features: [
                { text: '3 Account management' },
                { text: 'Custom content calendar' },
                { text: 'Advanced analytics' },
                { text: 'Influencer collaborations' },
                { text: 'Priority support' },
              ],
              btn: {
                text: 'Get Started',
                href: '/contact',
              },
            },
            {
              name: 'Complete Package',
              info: 'Full-service social media marketing solution',
              price: {
                monthly: 0,
                yearly: 0,
              },
              priceFormatted: '₹1,50,000/mo',
              accent: 'text-emerald-400',
              buttonVariant: 'outline',
              buttonClass: 'border-emerald-400/20 hover:bg-emerald-400/10 text-emerald-400',
              features: [
                { text: 'All platform management' },
                { text: 'Premium content production' },
                { text: 'Paid advertising campaigns' },
                { text: 'Dedicated account manager' },
                { text: 'Comprehensive reporting' },
              ],
              btn: {
                text: 'Get Started',
                href: '/contact',
              },
            },
          ]}
        />
      </section>

      {/* Ready to Build CTA Section */}
      <ReadyToBuild />
    </div>
  );
};

export default SocialServices;
