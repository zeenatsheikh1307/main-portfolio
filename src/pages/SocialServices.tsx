import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { PricingSection } from "@/components/ui/pricing";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { ReadyToBuild } from "@/components/ui/ready-to-build";
import CoverflowCarousel from "@/components/ui/coverflow-carousel";
import { Instagram, TrendingUp, Users, Target, Video, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const socialWorkItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    category: "INSTAGRAM",
    title: "Grid Aesthetics & Branding",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=800&q=80",
    category: "STRATEGY",
    title: "Viral Growth Campaigns",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    category: "CONTENT",
    title: "Engaging Reels & Shorts",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&q=80",
    category: "COMMUNITY",
    title: "Audience Management",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    category: "PAID MEDIA",
    title: "High-ROI Social Ads",
  },
];

const features = [
  {
    icon: <Instagram className="w-8 h-8 text-pink-500" />,
    title: "Profile Optimization",
    description: "Transform your social profiles into conversion-optimized landing pages.",
  },
  {
    icon: <Video className="w-8 h-8 text-purple-500" />,
    title: "Short-Form Video",
    description: "Trending Reels, TikToks, and Shorts that capture attention and drive engagement.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
    title: "Growth Strategy",
    description: "Data-driven tactics to multiply your followers and expand your digital footprint.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-emerald-500" />,
    title: "Community Building",
    description: "Engage with your audience authentically to build brand loyalty and trust.",
  },
  {
    icon: <Target className="w-8 h-8 text-rose-500" />,
    title: "Targeted Advertising",
    description: "Precision-targeted ad campaigns to generate high-quality leads and sales.",
  },
  {
    icon: <Users className="w-8 h-8 text-amber-500" />,
    title: "Influencer Marketing",
    description: "Partner with key voices in your niche to amplify your brand's message.",
  },
]; const SocialServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground transition-colors duration-300 overflow-x-hidden">
      <Navigation />

      {/* Hero Section - Scroll Morph Hero - Hidden on Mobile for better UX */}
      <div className="hidden md:block">
        <ScrollMorphHero />
      </div>
      <div className="md:hidden pt-24 pb-12 px-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4 text-white tracking-tight">
          Social Growth
        </h1>
        <p className="text-gray-400 text-lg">
          Scaling brands through viral content and community building.
        </p>
      </div>

      {/* Our Work - Social Media Case Studies */}
      <section
        id="work"
        className="px-4 md:px-6 py-12 md:py-24 bg-[#08080c] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto mb-10 md:mb-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase mb-3 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
              Our Results
            </h2>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6"></div>
            <p className="text-gray-400 max-w-2xl text-base md:text-lg">
              We don't just post; we grow communities. Here is how we've scaled accounts and driven massive engagement.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Case Study 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-[2.5rem] overflow-hidden bg-[#0d0d14] border border-white/5 shadow-2xl flex flex-col cursor-none"
            data-cursor="INSIGHTS"
          >
            {/* Image/Feed Mockup Area */}
            <div className="relative h-64 md:h-80 w-full bg-black overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
                alt="Instagram Feed Aesthetic"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent"></div>

              {/* Floating Instagram Tag */}
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-500" />
                <span className="text-white text-xs font-bold tracking-widest uppercase">@urban.style</span>
              </div>
            </div>

            {/* Content & Metrics */}
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between relative z-10 -mt-10 bg-[#0d0d14] rounded-t-[2.5rem]">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Lifestyle Brand Growth</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Complete social media overhaul focusing on high-quality visual storytelling, viral Reel strategies, and aggressive community management.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-1">+45K</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Followers</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">8.4%</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Engagement</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">2.1M</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Reach</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Case Study 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative rounded-[2.5rem] overflow-hidden bg-[#0d0d14] border border-white/5 shadow-2xl flex flex-col cursor-none"
            data-cursor="INSIGHTS"
          >
            {/* Image/Feed Mockup Area */}
            <div className="relative h-64 md:h-80 w-full bg-black overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Tech Analytics & Strategy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent"></div>

              {/* Floating Instagram Tag */}
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-white text-xs font-bold tracking-widest uppercase">B2B SaaS</span>
              </div>
            </div>

            {/* Content & Metrics */}
            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between relative z-10 -mt-10 bg-[#0d0d14] rounded-t-[2.5rem]">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Tech Startup Launch</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Data-driven approach utilizing insightful infographics, educational carousels, and targeted LinkedIn & Twitter campaigns to establish authority.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">+120K</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Audience</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">15+</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Viral Posts</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">4.5x</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Lead Gen</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>      {/* Pricing Section */}
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
