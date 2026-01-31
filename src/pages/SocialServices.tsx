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



      {/* Platforms Section */}
      <section className="relative md:pl-24 px-4 md:px-6 py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#0d0d14] min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">PLATFORMS WE MASTER</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Expert social media management across all major platforms
            </p>
          </div>

          {/* 3D Rotating Carousel */}
          <style>{`
            @keyframes rotate3d {
              from {
                transform: rotateY(0deg);
              }
              to {
                transform: rotateY(360deg);
              }
            }
            
            .carousel-3d {
              perspective: 1200px;
              position: relative;
              width: 100%;
              height: 450px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .carousel-container {
              position: relative;
              width: 300px;
              height: 300px;
              transform-style: preserve-3d;
              animation: rotate3d 20s linear infinite;
            }
            
            .carousel-container:hover {
              animation-play-state: paused;
            }
            
            .carousel-item {
              position: absolute;
              width: 200px;
              height: 250px;
              left: 50%;
              top: 50%;
              margin-left: -100px;
              margin-top: -125px;
              transform-style: preserve-3d;
            }
          `}</style>

          <div className="carousel-3d">
            <div className="carousel-container">
              {[
                { name: 'INSTAGRAM', logo: '/instgram logo.avif', gradient: 'from-purple-600 via-pink-600 to-orange-500', glow: 'group-hover:shadow-[0_0_60px_rgba(219,39,119,0.5)]' },
                { name: 'FACEBOOK', logo: '/facebook logo.jpg', gradient: 'from-blue-600 to-blue-700', glow: 'group-hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]' },
                { name: 'LINKEDIN', logo: '/linkedin logo.png', gradient: 'from-blue-500 to-blue-600', glow: 'group-hover:shadow-[0_0_60px_rgba(14,165,233,0.5)]' },
                { name: 'YOUTUBE', logo: '/youtube logo.jpg', gradient: 'from-red-600 to-red-700', glow: 'group-hover:shadow-[0_0_60px_rgba(239,68,68,0.5)]' },
                { name: 'WHATSAPP', logo: '/whatsapp logo.png', gradient: 'from-green-500 to-green-600', glow: 'group-hover:shadow-[0_0_60px_rgba(34,197,94,0.5)]' },
                { name: 'TELEGRAM', logo: '/telegram logo.jpg', gradient: 'from-sky-500 to-blue-500', glow: 'group-hover:shadow-[0_0_60px_rgba(14,165,233,0.5)]' },
              ].map((platform, i) => {
                const angle = (i / 6) * 360;
                const radius = 350;
                return (
                  <div
                    key={i}
                    className="carousel-item"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                    }}
                  >
                    <div className={`group relative w-full h-full bg-white/[0.02] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/20 hover:border-white/40 rounded-3xl p-6 text-center transition-all duration-500 hover:scale-110 cursor-pointer ${platform.glow} shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]`}>
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500`}></div>

                      {/* Logo Image */}
                      <div className="relative z-10">
                        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 transform group-hover:scale-125 transition-transform duration-500 filter group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                          <img
                            src={platform.logo}
                            alt={platform.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-base md:text-lg font-black text-white/80 group-hover:text-white tracking-wider transition-colors duration-300">
                          {platform.name}
                        </h3>
                      </div>

                      {/* Decorative corner accent */}
                      <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-30 rounded-bl-3xl rounded-tr-3xl transition-opacity duration-500`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
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
