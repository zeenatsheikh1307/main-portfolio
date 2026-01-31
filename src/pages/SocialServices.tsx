import React, { useState, useEffect, useRef } from "react";
import { Users, TrendingUp, Target, BarChart, MessageCircle, Calendar, Share2, Eye, ExternalLink, Play, ArrowRight, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from '@/components/Navigation';
import serviceHeroVideo from "./assets/assests/service hero.mp4";
import PricingDemo from './PricingDemo';

gsap.registerPlugin(ScrollTrigger);

const socialCampaigns = [
  {
    id: 1,
    title: 'Tech Startup Launch',
    description: 'Complete social media strategy for B2B SaaS launch',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a25b481976e93d36b8b&profile_id=164&oauth2_token_id=57447761',
    platform: 'LinkedIn',
    engagement: '2.4M',
    growth: '+340%',
    category: 'B2B Strategy',
    client: 'TechFlow Inc.',
    duration: '6 months',
  },
  {
    id: 2,
    title: 'Fashion Brand Campaign',
    description: 'Influencer collaboration and content creation strategy',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a25b481976e93d36b8b&profile_id=164&oauth2_token_id=57447761',
    platform: 'Instagram',
    engagement: '5.8M',
    growth: '+520%',
    category: 'Influencer Marketing',
    client: 'Luxe Fashion',
    duration: '4 months',
  },
  {
    id: 3,
    title: 'Restaurant Chain Promotion',
    description: 'Multi-platform food content and community building',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
    videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a25b481976e93d36b8b&profile_id=164&oauth2_token_id=57447761',
    platform: 'TikTok',
    engagement: '12.3M',
    growth: '+890%',
    category: 'Content Creation',
    client: 'Urban Bites',
    duration: '8 months',
  },
  {
    id: 4,
    title: 'Fitness App Launch',
    description: 'Health and wellness community engagement strategy',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a25b481976e93d36b8b&profile_id=164&oauth2_token_id=57447761',
    platform: 'YouTube',
    engagement: '3.2M',
    growth: '+275%',
    category: 'Community Building',
    client: 'FitLife Pro',
    duration: '5 months',
  }
];

const SocialServices = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Services grid animation
    if (servicesRef.current) {
      gsap.fromTo(servicesRef.current.querySelectorAll('.service-card'),
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  // Hover tilt for campaign cards
  useEffect(() => {
    if (!projectsRef.current) return;
    const cards = projectsRef.current.querySelectorAll('.campaign-card');

    cards.forEach(card => {
      // Simple tilt effect using CSS is often smoother, but let's keep basic GSAP for consistency
      gsap.set(card, { transformPerspective: 1000 });
    });
  }, []);


  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground transition-colors duration-300 overflow-x-hidden">
      <Navigation />

      {/* Hero Section - UPDATED to h-screen */}
      <section
        className="relative h-screen flex items-start justify-center py-8 md:py-16 text-center bg-[#0a0a0f] overflow-hidden"
        ref={heroRef}
      >
        {/* Background video */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectFit: 'cover',
              opacity: 0.8
            }}
          >
            <source src={serviceHeroVideo} type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Gradient merge */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] pointer-events-none z-[5]"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center min-h-screen px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-semibold mb-8 backdrop-blur-md border border-white/20 bg-white/10" style={{
            background: 'linear-gradient(90deg, #2BC0E4 0%, #5D31D8 48%, #FF8A00 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 600
          }}>
            ✨ Our craft is creativity, consistency & engagement
          </div>

          {/* Main Heading */}
          <h1 className="tracking-tight mb-6 leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] font-bold" style={{
            color: '#fff',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            We grow your social presence
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              with hyperfocus
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-light" style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            letterSpacing: '-0.01em'
          }}>
            Boost your brand visibility with <span className="text-cyan-400 font-semibold">Viral Content</span>, <span className="text-purple-400 font-semibold">Strategic Growth</span>, and <span className="text-pink-400 font-semibold">Community Management</span>.
            <br className="hidden md:block" />
            Engage your audience and build lasting connections.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Link to="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-white text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>🚀 Start Your Campaign</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#services" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-semibold text-white text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 inline-block">
              View Strategies →
            </a>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90">🔥 Viral Content</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90">📈 Audience Growth</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90">🤝 Engagement</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90">📊 Data Insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Preserved Layout) */}
      <section id="services" ref={servicesRef} className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                What we offer
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              OUR SOCIAL APPROACH
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Strategic social media management that builds authentic communities and drives meaningful engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Target, title: "STRATEGY", desc: "Data-driven social media strategies tailored to your brand's unique voice and goals.", gradient: "from-blue-900/50 via-blue-800/30 to-blue-950/20", iconColor: "text-blue-400" },
              { icon: Users, title: "COMMUNITY", desc: "Building and nurturing engaged communities around your brand's mission.", gradient: "from-purple-900/50 via-purple-800/30 to-purple-950/20", iconColor: "text-purple-400" },
              { icon: MessageCircle, title: "CONTENT", desc: "Compelling content creation that sparks conversations and drives engagement.", gradient: "from-green-900/50 via-green-800/30 to-green-950/20", iconColor: "text-green-400" },
              { icon: BarChart, title: "ANALYTICS", desc: "Comprehensive analytics and insights to optimize performance and ROI.", gradient: "from-yellow-900/50 via-yellow-800/30 to-yellow-950/20", iconColor: "text-yellow-400" },
              { icon: TrendingUp, title: "GROWTH", desc: "Organic growth strategies that build lasting relationships with your audience.", gradient: "from-pink-900/50 via-pink-800/30 to-pink-950/20", iconColor: "text-pink-400" },
              { icon: Calendar, title: "MANAGEMENT", desc: "End-to-end social media management from planning to execution and optimization.", gradient: "from-orange-900/50 via-orange-800/30 to-orange-950/20", iconColor: "text-orange-400" },
            ].map((service, index) => (
              <div key={index} className={`service-card group relative bg-gradient-to-br ${service.gradient} backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-3 min-h-[320px] flex flex-col justify-between overflow-hidden shadow-xl`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6`}>
                    <service.icon className={`w-7 h-7 md:w-8 md:h-8 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white leading-tight">{service.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work / Campaigns */}
      <section className="relative md:pl-24 px-4 md:px-6 py-12 md:py-20 overflow-hidden bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4"><span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">RECENT CAMPAIGNS</span></h2>
          </div>
          <div ref={projectsRef} className="flex gap-6 overflow-x-auto py-4 px-2 snap-x snap-mandatory scrollbar-hide pb-12">
            {socialCampaigns.map(campaign => (
              <article key={campaign.id} className="campaign-card group snap-start w-[380px] flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e]/95 to-[#16162a]/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/60 transition-all duration-500">
                <div className="relative h-64 overflow-hidden bg-gray-900">
                  <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <span className="text-white font-bold text-lg">{campaign.engagement} Engagement</span>
                    <span className="text-emerald-400 font-bold">{campaign.growth}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{campaign.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{campaign.description}</p>
                  <div className="flex justify-between items-center text-xs text-white/40">
                    <span>{campaign.platform}</span>
                    <span>{campaign.client}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="relative md:pl-24 px-4 md:px-6 py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#0d0d14]">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">PLATFORMS WE MASTER</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['INSTAGRAM', 'FACEBOOK', 'TWITTER', 'LINKEDIN', 'YOUTUBE', 'TIKTOK', 'WHATSAPP', 'TELEGRAM'].map((platform, i) => (
              <div key={i} className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-all duration-300">
                <h3 className="text-white font-bold">{platform}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative px-4 md:px-6 py-16 md:py-24 overflow-hidden">
        <PricingDemo />
      </section>
    </div>
  );
};

export default SocialServices;
