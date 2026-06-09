import React, { useEffect, useRef, useState } from "react";
import { Megaphone, BarChart, Target, PieChart, TrendingUp, Users, Check, ArrowRight, Star, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
// hero background image
import adsBg from "./assets/assests/ads service.png";
import adsWorkImg from "./assets/assests/ads work.png";
import serviceHeroVideo from "./assets/assests/service hero.mp4";
import PricingDemo from './PricingDemo';

gsap.registerPlugin(ScrollTrigger);

const AdsService = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    if (proofRef.current) {
      gsap.fromTo(
        proofRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: proofRef.current,
            start: "top 80%",
          },
        }
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
      price: "₹10,620",
      period: "per week",
      desc: "₹1,000/day budget - Perfect for small businesses",
      features: [
        "Google & Meta Ads Setup",
        "Basic Audience Targeting",
        "Free Landing Page",
        "Free Graphics",
        "Ad Handling",
      ],
      color: "purple",
    },
    {
      name: "Growth Plan",
      price: "₹19,180",
      period: "per week",
      desc: "₹2,000/day budget - For brands aiming to scale",
      features: [
        "Google, Meta & LinkedIn Ads",
        "A/B Testing & Optimization",
        "Free Landing Page",
        "Free Graphics",
        "Ad Handling",
      ],
      color: "blue",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹46,256",
      period: "per week",
      desc: "₹5,000/day budget - Full-funnel growth marketing",
      features: [
        "Multi-platform Ad Management",
        "Dynamic Retargeting",
        "Free Landing Page",
        "Free Graphics",
        "Ad Handling",
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

      {/* Lightbox Modal - at root level so not clipped by any parent overflow:hidden */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top controls - fixed to top right of screen */}
          <div className="fixed top-5 right-5 flex items-center gap-3 z-[10000]" onClick={(e) => e.stopPropagation()}>
            {/* Download button */}
            <a
              href={adsWorkImg}
              download="ads-dashboard.png"
              className="w-11 h-11 rounded-full bg-white/20 border border-white/40 text-white flex items-center justify-center hover:bg-white/30 transition-colors text-lg"
              title="Download image"
            >
              ⬇
            </a>
            {/* Close button */}
            <button
              className="w-11 h-11 rounded-full bg-red-500/80 border border-red-400 text-white flex items-center justify-center hover:bg-red-500 transition-colors text-xl font-bold shadow-lg"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
          </div>
          <img
            src={adsWorkImg}
            alt="Ads Performance Dashboard"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}



      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-start justify-center py-8 md:py-16 text-center bg-[#0a0a0f] overflow-hidden"
        ref={heroRef}
      >
        <style>{`
          .mb-btn-needle {
            background: conic-gradient(from 180deg at 50% 50%, #2BC0E4 0deg, #4300FF 120deg, #FF0066 240deg, #2BC0E4 360deg);
            background-size: 200% 200%;
            animation: gradient-x 6s infinite alternate;
            transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          .mb-btn-needle:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(67, 0, 255, 0.25);
            filter: brightness(1.1);
          }
          @keyframes gradient-x { 
            0%{ background-position: 0% 50%; } 
            100%{ background-position: 100% 50%; } 
          }
        `}</style>
        {/* Background image */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img
            src={adsBg}
            alt="Ads Service Background"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.8
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Gradient merge overlay at bottom for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] pointer-events-none z-[5]"></div>

        <div className="relative z-10 max-w-7xl w-full flex flex-col items-start justify-start text-left min-h-screen pt-24 md:pt-32 px-6 md:px-12 lg:px-14">
          {/* Top Subtitle / Badge */}
          <div className="text-white/60 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Everything you need to scale
          </div>

          {/* Main Heading - Left Aligned, Bold White */}
          <h1 className="tracking-tight mb-6 md:mb-10 leading-[1.1] text-[32px] sm:text-[40px] md:text-[clamp(2.5rem,7vw,5rem)] font-extrabold max-w-4xl" style={{
            color: '#fff',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Unlock Your
            <br />
            Business Growth
            <br />
            With Precision Ads
          </h1>

          {/* CTA Buttons - Left Aligned */}
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-start mb-12">
            <Link to="/contact" className="mb-btn-needle group relative px-8 py-4 text-white rounded-full font-bold text-base sm:text-lg shadow-2xl flex items-center gap-2">
              <span>Start Your Campaign</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#pricing" className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-semibold text-white text-base sm:text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 inline-block">
              View Plans →
            </a>
          </div>

          {/* Feature highlights - Left Aligned */}
          <div className="flex flex-wrap gap-4 justify-start items-center">
            <div className="flex items-center gap-2 text-white/50 text-sm font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              TARGETED ADS
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              HIGH ROI
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              SCALABLE GROWTH
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section className="relative px-8 py-24 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10" ref={proofRef}>
          {/* Heading */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Don't Just Take Our Word For It
            </h2>
            <p className="text-white/50 text-base md:text-lg">
              Real screenshots from actual client dashboards. Numbers don't lie.
            </p>
          </div>

          {/* 2-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left — Screenshot */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/25 via-purple-500/15 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d1a] shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="bg-black/40 text-white/40 text-xs px-3 py-1 rounded-md">
                    🔒 adsmanager.facebook.com
                  </div>
                </div>

                {/* Image */}
                <div
                  className="relative cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={adsWorkImg}
                    alt="Ads Dashboard"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
                    <span className="bg-black/70 text-white text-sm px-4 py-2 rounded-full border border-white/20">🔍 Click to expand</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-5 -bottom-5 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl px-5 py-4 shadow-2xl border border-purple-400/30">
                <div className="text-white/60 text-xs font-semibold mb-1">Lowest CPL</div>
                <div className="text-white text-2xl font-black">₹10.92</div>
              </div>
            </div>

            {/* Right — Text */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-5 tracking-widest">
                  ✦ VERIFIED RESULTS
                </div>
                <h3 className="text-4xl font-black text-white mb-5 leading-tight">
                  Real campaigns. <br />
                  <span className="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#2BC0E4_0deg,#4300FF_120deg,#FF0066_240deg,#2BC0E4_360deg)] [background-size:200%_200%] animate-[gradient-x_6s_infinite_alternate]">Real numbers.</span>
                </h3>
                <p className="text-white/60 text-base leading-relaxed">
                  This is a live screenshot from our Meta Ads Manager — across <span className="text-white font-semibold">8 active campaigns</span>, we generated massive scale at ultra-low cost-per-lead.
                </p>
              </div>

              {/* Key stats inline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="border-l-2 border-[#2BC0E4]/50 pl-4">
                  <div className="text-xl md:text-2xl font-black text-white">14,081</div>
                  <div className="text-white/50 text-[10px] md:text-xs mt-1">Leads — Stock Expert</div>
                </div>
                <div className="border-l-2 border-[#5D31D8]/50 pl-4">
                  <div className="text-xl md:text-2xl font-black text-white">₹15.79</div>
                  <div className="text-white/50 text-[10px] md:text-xs mt-1">CPL — Raj King</div>
                </div>
                <div className="border-l-2 border-[#4300FF]/50 pl-4">
                  <div className="text-xl md:text-2xl font-black text-white">69.52L</div>
                  <div className="text-white/50 text-[10px] md:text-xs mt-1">Total Impressions</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">₹10.92 Cost Per Lead</div>
                    <p className="text-white/50 text-sm">Stock Expert campaign: 14,081 leads delivered at the industry's lowest CPL.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">6.09L People Reached</div>
                    <p className="text-white/50 text-sm">Raj King: 4,268 leads at ₹15.79 each with just ₹249/day budget.</p>
                  </div>
                </div>
              </div>

              <a href="#pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors">
                View Our Plans →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Results Section */}
      <section ref={servicesRef} className="px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              CAMPAIGN SUCCESS STORIES
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg mt-6">
              Real campaigns, real growth — see how we transformed ad performance for our clients
            </p>
          </div>

          {/* Before/After Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Case Study 1 - E-commerce */}
            <div className="group relative">
              {/* Client Info Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">E-commerce Fashion Brand</h3>
                  <p className="text-white/60 text-sm">Meta Ads Campaign • 3 Months</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <span className="text-green-400 font-bold text-sm">+385% ROI</span>
                </div>
              </div>

              {/* Before/After Cards Container */}
              <div className="grid grid-cols-2 gap-4">
                {/* BEFORE Card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl rounded-3xl p-6 border-2 border-red-500/30 overflow-hidden group/before hover:scale-105 transition-transform duration-500">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-3xl"></div>

                  {/* Header */}
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold mb-2">
                      BEFORE
                    </span>
                    <div className="text-white/40 text-xs">Initial Performance</div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/50 text-xs mb-1">Ad Spend</div>
                      <div className="text-white text-xl font-bold">₹50,000</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">CTR</div>
                      <div className="text-white text-xl font-bold">1.2%</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Conversion Rate</div>
                      <div className="text-white text-xl font-bold">2.5%</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Revenue</div>
                      <div className="text-white text-xl font-bold">₹75,000</div>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-red-400/80">
                        <span className="mt-0.5">•</span>
                        <span>Poor targeting</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-red-400/80">
                        <span className="mt-0.5">•</span>
                        <span>Low engagement</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-red-400/80">
                        <span className="mt-0.5">•</span>
                        <span>Generic creatives</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative line chart */}
                  <div className="absolute bottom-0 left-0 w-full h-16 opacity-20">
                    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0,35 L20,32 L40,30 L60,28 L80,30 L100,32" fill="none" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* AFTER Card */}
                <div className="relative bg-gradient-to-br from-emerald-900/40 to-green-800/30 backdrop-blur-xl rounded-3xl p-6 border-2 border-green-500/50 overflow-hidden group/after hover:scale-105 transition-transform duration-500 shadow-xl shadow-green-500/20">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/30 to-transparent rounded-bl-3xl"></div>

                  {/* Animated glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover/after:opacity-100 transition-opacity duration-500"></div>

                  {/* Header */}
                  <div className="mb-6 relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold mb-2">
                      AFTER
                    </span>
                    <div className="text-white/40 text-xs">Optimized Results</div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4 relative z-10">
                    <div>
                      <div className="text-white/50 text-xs mb-1">Ad Spend</div>
                      <div className="text-white text-xl font-bold">₹50,000</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1 flex items-center gap-1">
                        CTR
                        <span className="text-green-400 text-[10px]">↑300%</span>
                      </div>
                      <div className="text-green-400 text-xl font-bold">4.8%</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1 flex items-center gap-1">
                        Conversion Rate
                        <span className="text-green-400 text-[10px]">↑228%</span>
                      </div>
                      <div className="text-green-400 text-xl font-bold">8.2%</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1 flex items-center gap-1">
                        Revenue
                        <span className="text-green-400 text-[10px]">↑233%</span>
                      </div>
                      <div className="text-green-400 text-xl font-bold">₹2,50,000</div>
                    </div>
                  </div>

                  {/* Improvements List */}
                  <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-green-400">
                        <Check className="w-3 h-3 mt-0.5" />
                        <span>Precision targeting</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-green-400">
                        <Check className="w-3 h-3 mt-0.5" />
                        <span>A/B tested creatives</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-green-400">
                        <Check className="w-3 h-3 mt-0.5" />
                        <span>Retargeting funnel</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative line chart */}
                  <div className="absolute bottom-0 left-0 w-full h-16 opacity-30">
                    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0,35 L20,28 L40,20 L60,12 L80,8 L100,5" fill="none" stroke="#10b981" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 - SaaS */}
            <div className="group relative">
              {/* Client Info Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">B2B SaaS Platform</h3>
                  <p className="text-white/60 text-sm">Google Ads + LinkedIn • 4 Months</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <span className="text-blue-400 font-bold text-sm">+520% Leads</span>
                </div>
              </div>

              {/* Before/After Cards Container */}
              <div className="grid grid-cols-2 gap-4">
                {/* BEFORE Card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl rounded-3xl p-6 border-2 border-red-500/30 overflow-hidden group/before hover:scale-105 transition-transform duration-500">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-3xl"></div>

                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold mb-2">
                      BEFORE
                    </span>
                    <div className="text-white/40 text-xs">Initial Performance</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-white/50 text-xs mb-1">Monthly Budget</div>
                      <div className="text-white text-xl font-bold">₹1,20,000</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Qualified Leads</div>
                      <div className="text-white text-xl font-bold">48</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Cost Per Lead</div>
                      <div className="text-white text-xl font-bold">₹2,500</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Demo Bookings</div>
                      <div className="text-white text-xl font-bold">12</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-red-400/80">
                        <span className="mt-0.5">•</span>
                        <span>Broad keywords</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-red-400/80">
                        <span className="mt-0.5">•</span>
                        <span>No lead scoring</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-red-400/80">
                        <span className="mt-0.5">•</span>
                        <span>Weak landing pages</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-16 opacity-20">
                    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0,30 L25,28 L50,26 L75,27 L100,29" fill="none" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* AFTER Card */}
                <div className="relative bg-gradient-to-br from-blue-900/40 to-cyan-800/30 backdrop-blur-xl rounded-3xl p-6 border-2 border-blue-500/50 overflow-hidden group/after hover:scale-105 transition-transform duration-500 shadow-xl shadow-blue-500/20">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-transparent rounded-bl-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover/after:opacity-100 transition-opacity duration-500"></div>

                  <div className="mb-6 relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-bold mb-2">
                      AFTER
                    </span>
                    <div className="text-white/40 text-xs">Optimized Results</div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div>
                      <div className="text-white/50 text-xs mb-1">Monthly Budget</div>
                      <div className="text-white text-xl font-bold">₹1,20,000</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1 flex items-center gap-1">
                        Qualified Leads
                        <span className="text-blue-400 text-[10px]">↑520%</span>
                      </div>
                      <div className="text-blue-400 text-xl font-bold">298</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1 flex items-center gap-1">
                        Cost Per Lead
                        <span className="text-blue-400 text-[10px]">↓84%</span>
                      </div>
                      <div className="text-blue-400 text-xl font-bold">₹403</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1 flex items-center gap-1">
                        Demo Bookings
                        <span className="text-blue-400 text-[10px]">↑475%</span>
                      </div>
                      <div className="text-blue-400 text-xl font-bold">69</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-blue-400">
                        <Check className="w-3 h-3 mt-0.5" />
                        <span>Intent-based targeting</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-blue-400">
                        <Check className="w-3 h-3 mt-0.5" />
                        <span>Optimized funnels</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-blue-400">
                        <Check className="w-3 h-3 mt-0.5" />
                        <span>Multi-channel sync</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-16 opacity-30">
                    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0,30 L25,22 L50,15 L75,8 L100,3" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-white/60 mb-6 text-lg">Ready to see similar results for your business?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-full font-bold text-base tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Start Your Success Story
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative px-4 md:px-6 py-8 md:py-12 overflow-hidden">
        <PricingDemo />
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="fixed top-5 right-5 z-[10000] w-11 h-11 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 text-white text-xl font-bold shadow-xl transition-all"
          >
            ✕
          </button>

          {/* Download button */}
          <a
            href={adsWorkImg}
            download="ads-work.png"
            onClick={(e) => e.stopPropagation()}
            className="fixed top-5 right-20 z-[10000] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-lg shadow-xl transition-all"
          >
            ⬇
          </a>

          {/* Image */}
          <img
            src={adsWorkImg}
            alt="Ads Dashboard Fullscreen"
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default AdsService;
