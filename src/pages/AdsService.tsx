import React, { useEffect, useRef } from "react";
import { Megaphone, BarChart, Target, PieChart, TrendingUp, Users, Check, ArrowRight, Star, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
// hero background image
import adsBg from "./assets/assests/web.png";
import serviceHeroVideo from "./assets/assests/service hero.mp4";

gsap.registerPlugin(ScrollTrigger);

const AdsService = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.querySelectorAll(".service-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const pricingPlans = [
    {
      name: "Starter Campaign",
      price: "₹4,999",
      period: "per month",
      desc: "Perfect for small businesses starting ads journey",
      features: [
        "Google & Meta Ads Setup",
        "Basic Audience Targeting",
        "Ad Creative Suggestions",
        "Weekly Report",
      ],
      color: "purple",
    },
    {
      name: "Growth Plan",
      price: "₹14,999",
      period: "per month",
      desc: "For brands aiming to scale performance marketing",
      features: [
        "Google, Meta & LinkedIn Ads",
        "A/B Testing & Optimization",
        "Conversion Tracking",
        "Bi-weekly Strategy Calls",
      ],
      color: "blue",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹39,999",
      period: "per month",
      desc: "Full-funnel growth marketing with analytics support",
      features: [
        "Multi-platform Ad Management",
        "Dynamic Retargeting",
        "Advanced Analytics Dashboard",
        "Dedicated Ad Manager",
      ],
      color: "emerald",
    },
  ];

  // Inject pricing-related helper CSS (ribbon, neon, cta-pill, feature rows)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const styleId = 'ads-pricing-styles';
    if (document.getElementById(styleId)) return;
    const s = document.createElement('style');
    s.id = styleId;
    s.innerHTML = `
      .bg-grid-pattern { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e"); }
      .popular-neon {
        border: 2px solid transparent !important;
        background: linear-gradient(135deg, rgba(12,15,25,0.95), rgba(15,20,35,0.95)) padding-box,
                    linear-gradient(135deg, #a855f7, #8b5cf6, #c026d3) border-box;
        position: relative;
        transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .popular-neon:hover {
        transform: translateY(-8px) scale(1.02);
      }
      .popular-neon::before {
        content: '';
        position: absolute;
        inset: -3px;
        border-radius: 1.1rem;
        padding: 3px;
        background: linear-gradient(135deg, #a855f7, #8b5cf6, #c026d3, #a855f7);
        background-size: 200% 200%;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        filter: blur(8px);
        opacity: 0.6;
        pointer-events: none;
        animation: rotate-gradient 4s linear infinite;
      }
      @keyframes rotate-gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .ribbon {
        position: absolute; left: 50%; transform: translateX(-50%); top: -16px; z-index: 10;
        background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #06b6d4 100%);
        color: #fff; padding: 8px 16px; border-radius: 999px; font-weight:800; font-size:13px; 
        display:inline-flex; align-items:center; gap:8px; 
        box-shadow: 0 8px 24px rgba(59,130,246,0.4), 0 0 32px rgba(124,58,237,0.3);
        animation: shimmer 2s ease-in-out infinite;
      }
      @keyframes shimmer {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .project-pill { 
        background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08)); 
        color: rgba(255,255,255,0.95); 
        padding:7px 14px; 
        border-radius:999px; 
        font-size:12px; 
        font-weight:600;
        border:1px solid rgba(59,130,246,0.2); 
        box-shadow: 0 2px 8px rgba(59,130,246,0.1);
      }
      .pricing-card { 
        min-height: 560px; 
        display:flex; 
        flex-direction:column; 
        transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .pricing-card:hover {
        box-shadow: 0 12px 48px rgba(0,0,0,0.3);
      }
      .price-large { 
        font-size: 3rem; 
        font-weight:900; 
        letter-spacing:-0.03em;
        background: linear-gradient(135deg, #fff 0%, #a78bfa 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .price-small { 
        font-size: 1rem; 
        color: rgba(255,255,255,0.7); 
        margin-left:8px;
        font-weight:600;
      }
      .feature-icon { 
        width:32px; 
        height:32px; 
        border-radius:999px; 
        display:inline-flex; 
        align-items:center; 
        justify-content:center; 
        background: linear-gradient(135deg, rgba(59,130,246,1), rgba(139,92,246,1)); 
        box-shadow: 0 4px 16px rgba(59,130,246,0.3), 0 0 24px rgba(139,92,246,0.2);
        flex-shrink: 0;
      }
      .feature-row { 
        display:flex; 
        gap:14px; 
        align-items:flex-start;
        transition: transform .2s ease;
      }
      .feature-row:hover {
        transform: translateX(4px);
      }
      .cta-pill { border-radius: 999px; padding:12px 20px; font-weight:700; transition: transform .22s cubic-bezier(.2,.9,.2,1), box-shadow .22s ease; position: relative; overflow: hidden; backdrop-filter: blur(8px) saturate(120%); -webkit-backdrop-filter: blur(8px) saturate(120%); border: 1px solid rgba(255,255,255,0.06); background-color: rgba(255,255,255,0.02); }
      .cta-pill:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 14px 40px rgba(2,6,23,0.4); }
      .cta-pill .btn-arrow { display:inline-block; transform: translateX(0); transition: transform .22s ease; }
      .cta-pill:hover .btn-arrow { transform: translateX(6px); }
      .cta-pill::after { content: ''; position: absolute; top: -60%; left: -30%; width: 60%; height: 240%; background: linear-gradient(120deg, rgba(255,255,255,0.22), rgba(255,255,255,0.02) 40%, rgba(255,255,255,0)); transform: rotate(-25deg) translateX(-140%); filter: blur(8px); transition: transform .7s cubic-bezier(.2,.9,.2,1); pointer-events: none; }
      .cta-pill:hover::after { transform: rotate(-25deg) translateX(10%); }
      @media (max-width: 768px) { .pricing-card { min-height: auto; } }
    `;
    document.head.appendChild(s);
    return () => { const el = document.getElementById(styleId); if (el) el.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground overflow-x-hidden transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-start justify-center py-8 md:py-16 text-center bg-[#0a0a0f] overflow-hidden"
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
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Gradient merge overlay at bottom for seamless transition */}
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
            ✨ Our craft is precision, performance & measurable growth
          </div>

          {/* Main Heading - Larger */}
          <h1 className="tracking-tight mb-6 leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] font-bold" style={{
            color: '#fff',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            We create growth-driven ads
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              with hyperfocus
            </span>
          </h1>

          {/* Description paragraph */}
          <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-light" style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            letterSpacing: '-0.01em'
          }}>
            Maximize your ROI with <span className="text-cyan-400 font-semibold">Precision Targeting</span>, <span className="text-purple-400 font-semibold">Data-Driven Strategy</span>, and <span className="text-pink-400 font-semibold">High-Converting Creatives</span>.
            <br className="hidden md:block" />
            Scale your business with performance marketing that works.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Link to="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-white text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>🚀 Start Your Campaign</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#services" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-semibold text-white text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 inline-block">
              View Plans →
            </a>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🎯 Targeted Ads</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>📈 High ROI</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>💹 Growth Scaling</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>📊 Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                What we offer
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              OUR ADVERTISING EXPERTISE
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Data-driven strategies and precision targeting for maximum campaign performance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Target,
                title: "TARGETED CAMPAIGNS",
                desc: "Reaching the right audience with precision targeting and behavioral data.",
                gradient: "from-purple-900/50 via-purple-800/30 to-purple-950/20",
                iconColor: "text-purple-400",
                glowColor: "group-hover:shadow-purple-500/20"
              },
              {
                icon: BarChart,
                title: "PERFORMANCE OPTIMIZATION",
                desc: "Real-time tracking, testing, and improving ad ROI with every impression.",
                gradient: "from-blue-900/50 via-blue-800/30 to-blue-950/20",
                iconColor: "text-blue-400",
                glowColor: "group-hover:shadow-blue-500/20"
              },
              {
                icon: PieChart,
                title: "AD STRATEGY & FUNNEL",
                desc: "Building structured ad funnels that move users from awareness to action.",
                gradient: "from-indigo-900/50 via-indigo-800/30 to-indigo-950/20",
                iconColor: "text-indigo-400",
                glowColor: "group-hover:shadow-indigo-500/20"
              },
              {
                icon: Users,
                title: "AUDIENCE INTELLIGENCE",
                desc: "Understanding user intent and crafting personalized messaging for engagement.",
                gradient: "from-violet-900/50 via-violet-800/30 to-violet-950/20",
                iconColor: "text-violet-400",
                glowColor: "group-hover:shadow-violet-500/20"
              },
              {
                icon: TrendingUp,
                title: "GROWTH SCALING",
                desc: "Expanding your campaigns profitably with high-performing lookalikes and retargeting.",
                gradient: "from-cyan-900/50 via-cyan-800/30 to-cyan-950/20",
                iconColor: "text-cyan-400",
                glowColor: "group-hover:shadow-cyan-500/20"
              },
              {
                icon: Check,
                title: "AD COMPLIANCE",
                desc: "Ensuring all creatives and copies meet Meta, Google, and LinkedIn policies.",
                gradient: "from-pink-900/50 via-pink-800/30 to-pink-950/20",
                iconColor: "text-pink-400",
                glowColor: "group-hover:shadow-pink-500/20"
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`service-card group relative bg-gradient-to-br ${service.gradient} backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-3 min-h-[320px] flex flex-col justify-between overflow-hidden shadow-xl ${service.glowColor}`}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Decorative animated stars/dots */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse shadow-lg shadow-white/50"></div>
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-100"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-200"></div>
                <div className="absolute top-20 left-6 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-300"></div>

                {/* Decorative lines with animation */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <service.icon className={`w-7 h-7 md:w-8 md:h-8 ${service.iconColor} group-hover:scale-110 transition-transform duration-500`} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/80 leading-relaxed text-sm md:text-base transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center justify-center mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-purple-500/15 border-2 border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-500/20">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 border border-white/20 p-2.5 mr-4 flex items-center justify-center shadow-xl shadow-purple-500/30">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Advertising Plans
              </h2>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg md:text-xl leading-relaxed">
              Transparent pricing for performance marketing and ad management — Scale your campaigns with data-driven strategies
            </p>

            {/* Decorative underline */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
            </div>
          </div>
          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`pricing-card relative bg-gradient-to-br from-[#1a1a2e]/95 to-[#16162a]/70 backdrop-blur-xl rounded-3xl p-6 sm:p-7 md:p-9 border ${plan.popular
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 popular-neon'
                  : "border-white/10 hover:border-purple-400/30"
                  } transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl overflow-visible group`}
              >
                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.5)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                </div>

                {/* Most popular ribbon */}
                {plan.popular && (
                  <div className="ribbon">
                    <Star className="w-4 h-4" /> MOST POPULAR
                  </div>
                )}

                {/* Project pill badge */}
                <div className="absolute right-6 top-6">
                  <span className="project-pill">Campaign</span>
                </div>

                {/* Card content */}
                <div className="relative z-10 mt-8">
                  {/* Plan name and description */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                      {plan.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground group-hover:text-white/70 transition-colors duration-300">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline mb-8 pb-6 border-b border-white/10">
                    <span className="price-large bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="price-small ml-2">/ {plan.period}</span>
                  </div>

                  {/* Features list */}
                  <div className="mb-8 space-y-4">
                    {plan.features.map((f, idx) => (
                      <div key={idx} className="feature-row group/feature">
                        <div className="feature-icon group-hover/feature:scale-110 transition-transform duration-300">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm sm:text-base text-white/80 group-hover/feature:text-white transition-colors duration-300">
                          {f}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-4">
                    <Link to="/contact" className="w-full block">
                      <button className={`w-full cta-pill ${plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/30'
                        : 'bg-white/5 hover:bg-white/10 text-foreground border border-white/10'
                        } transition-all duration-300`}>
                        Get Started <ArrowRight className="w-4 h-4 inline-block ml-2 btn-arrow" />
                      </button>
                    </Link>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">Quick Launch</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Check className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">ROI Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium">200+ Campaigns Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="md:pl-24 px-4 md:px-6 py-16 md:py-24 text-center bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="relative bg-gradient-to-br from-[#1a1a2e]/90 via-[#16162a]/70 to-[#0d0d14]/50 backdrop-blur-xl rounded-3xl p-10 md:p-16 border-2 border-white/10 shadow-2xl overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-br-[120px] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-[120px] opacity-50"></div>

            {/* Floating decorative elements */}
            <div className="absolute top-10 right-10 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
            <div className="absolute top-20 right-24 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse delay-150"></div>
            <div className="absolute bottom-16 left-12 w-2.5 h-2.5 bg-purple-400/50 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse delay-500"></div>

            {/* Decorative lines */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>
              <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/15 to-blue-500/15 border border-purple-500/30 backdrop-blur-xl mb-6 shadow-lg">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  PERFORMANCE MARKETING
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  READY TO BOOST YOUR
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  REACH?
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's build performance campaigns that deliver real business impact and maximize your advertising ROI.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="group/btn relative w-full sm:w-auto cta-pill bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-500 hover:via-blue-500 hover:to-purple-600 text-white px-10 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-500 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 border-2 border-white/20 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Launch Your Ad Journey
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                    {/* Button shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </button>
                </Link>

                <Link to="/services" className="w-full sm:w-auto">
                  <button className="group/btn w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300 border-2 border-white/20 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View All Services
                      <Megaphone className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
                    </span>
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Free Campaign Audit</span>
                </div>
                <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                  <span className="font-medium">24/7 Optimization</span>
                </div>
                <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  <span className="font-medium">Certified Experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdsService;
