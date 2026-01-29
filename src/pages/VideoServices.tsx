import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Camera, Film, Palette, Music, Edit, Play, Award, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from "react-router-dom";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Threads from "./Threads";

import { Code, Video, Users, Check, ArrowRight, Star, Zap } from "lucide-react";

import v1 from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import v2 from "./assets/assests/Video.mp4";
import v3 from "./assets/assests/osmo.mp4";
import v4 from "./assets/assests/Video.mp4";
import v5 from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import v6 from "./assets/assests/osmo.mp4";
// hero background image
import videoserviceBg from "./assets/assests/web.png";
import serviceHeroVideo from "./assets/assests/service hero.mp4";


// Lazy load Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const videoProjects = [
  {
    id: 1,
    title: 'Brand Documentary',
    description: 'Corporate documentary showcasing company culture and values',
    thumbnail: v1,
    duration: '3:45',
    category: 'Documentary',
    year: '2024',
    youtube: 'https://youtube.com/shorts/4ZUyqa2rgmM?feature=share'
  },
  {
    id: 2,
    title: 'Product Showcase',
    description: 'Dynamic product reveal with motion graphics and animation',
    thumbnail: v2,
    duration: '1:30',
    category: 'Commercial',
    year: '2024'
    , youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_2'
  },
  {
    id: 3,
    title: 'Music Video',
    description: 'Cinematic music video with creative visual storytelling',
    thumbnail: v3,
    duration: '4:12',
    category: 'Creative',
    year: '2023'
    , youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_3'
  },
  {
    id: 4,
    title: 'Event Highlight',
    description: 'Conference highlights with dynamic editing and graphics',
    thumbnail: v4,
    duration: '2:18',
    category: 'Event',
    year: '2024'
    , youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_4'
  },
  {
    id: 5,
    title: 'Animation Reel',
    description: '2D/3D animation showcase with motion graphics',
    thumbnail: v5,
    duration: '1:45',
    category: 'Animation',
    year: '2024'
    , youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_5'
  },
  {
    id: 6,
    title: 'Social Media Campaign',
    description: 'Series of short-form content for social platforms',
    thumbnail: v6,
    duration: '0:15',
    category: 'Social',
    year: '2024'
    , youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_6'
  }
];

const VideoServices = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Inject small helper styles (grid texture, glow, scrollbar helpers)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'video-services-extra-styles';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.innerHTML = `
      .bg-grid-pattern { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e"); }
      .glow-border { box-shadow: 0 0 0 1px rgba(255,255,255,0.04); }
      .glow-border:hover { box-shadow: 0 6px 30px rgba(16,185,129,0.06); }
      .video-scroll::-webkit-scrollbar { height: 10px; }
      .video-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, rgba(16,185,129,0.18), rgba(6,95,70,0.22)); border-radius: 999px; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
  .play-overlay { background: radial-gradient(circle at center, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); }
  /* focus and keyboard styles */
  .video-card:focus { outline: none; transform: translateY(-6px); }
  .video-card:focus-visible, .video-card[role="button"]:focus-visible, .video-card button:focus-visible { box-shadow: 0 0 0 6px rgba(16,185,129,0.10); border-radius: 12px; }
  .play-overlay:focus, .play-overlay:hover { transform: scale(1.05); }
  /* Pricing styles (ribbon, neon, liquid CTA) */
  .popular-neon { border: 1px solid rgba(168,85,247,0.9) !important; box-shadow: 0 6px 30px rgba(168,85,247,0.18), 0 0 28px rgba(168,85,247,0.16), inset 0 0 12px rgba(168,85,247,0.06); position: relative; transition: box-shadow .3s ease, transform .25s ease; }
  .popular-neon:hover { box-shadow: 0 12px 50px rgba(168,85,247,0.24), 0 0 48px rgba(168,85,247,0.22), inset 0 0 18px rgba(168,85,247,0.08); transform: translateY(-6px); }
  .popular-neon::after { content: ''; position: absolute; inset: -8px; border-radius: 1rem; filter: blur(18px); background: radial-gradient(closest-side, rgba(168,85,247,0.18), transparent 60%); opacity: 0.85; pointer-events: none; }
  .ribbon { position: absolute; left: 50%; transform: translateX(-50%); top: -14px; z-index: 10; background: linear-gradient(90deg,#7c3aed,#3b82f6); color: #fff; padding: 6px 12px; border-radius: 999px; font-weight:700; font-size:12px; display:inline-flex; align-items:center; gap:8px; box-shadow: 0 6px 18px rgba(59,130,246,0.12); }
  .project-pill { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.9); padding:6px 10px; border-radius:999px; font-size:12px; border:1px solid rgba(255,255,255,0.04); }
  .pricing-card { min-height: 480px; display:flex; flex-direction:column; }
  .price-large { font-size: 2rem; font-weight:800; letter-spacing:-0.02em; }
  .price-small { font-size: 0.95rem; color: rgba(255,255,255,0.75); margin-left:6px; }
  .feature-icon { width:28px; height:28px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; background: linear-gradient(180deg, rgba(59,130,246,0.95), rgba(99,102,241,0.95)); box-shadow: 0 4px 12px rgba(59,130,246,0.12); }
  .feature-row { display:flex; gap:12px; align-items:flex-start; }
  .cta-pill { border-radius: 999px; padding:12px 20px; font-weight:700; transition: transform .22s cubic-bezier(.2,.9,.2,1), box-shadow .22s ease; }
  .cta-pill:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 14px 40px rgba(2,6,23,0.4); }
  .btn-arrow { display:inline-block; transform: translateX(0); transition: transform .22s ease; }
  .cta-pill:hover .btn-arrow { transform: translateX(6px); }
  .cta-pill { position: relative; overflow: hidden; backdrop-filter: blur(6px) saturate(120%); -webkit-backdrop-filter: blur(6px) saturate(120%); border: 1px solid rgba(255,255,255,0.06); background-color: rgba(255,255,255,0.02); }
  .cta-pill::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); mix-blend-mode: overlay; }
  .cta-pill::after { content: ''; position: absolute; top: -60%; left: -30%; width: 60%; height: 240%; background: linear-gradient(120deg, rgba(255,255,255,0.22), rgba(255,255,255,0.02) 40%, rgba(255,255,255,0)); transform: rotate(-25deg) translateX(-140%); filter: blur(8px); transition: transform .7s cubic-bezier(.2,.9,.2,1); pointer-events: none; }
  .cta-pill:hover::after { transform: rotate(-25deg) translateX(10%); }
    `;
    document.head.appendChild(s);
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);


  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Services grid animation
    if (servicesRef.current) {
      gsap.fromTo(servicesRef.current.querySelectorAll('.service-card'),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );
    }

    // small ambient floats for hero elements
    if (heroRef.current) {
      const floats = heroRef.current.querySelectorAll('.float-ambient');
      floats.forEach((el, i) => {
        gsap.to(el, { y: i % 2 === 0 ? -10 : 10, x: i % 2 === 0 ? -6 : 6, duration: 5 + i, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Close modal on Escape
  // helper: convert various YouTube URLs to embed URL
  const getEmbedUrl = (url?: string | null) => {
    if (!url) return '';
    // try to extract video id from common youtube url patterns
    const patterns = [
      /(?:v=|\/videos\/|embed\/|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{6,11})/, // catches v=, embed/, youtu.be/, shorts/
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
    }
    return url; // fallback to the original
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    document.addEventListener('keydown', onKey);
    // toggle body scroll when modal open
    if (selectedVideo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  // Project card hover tilt + scroll reveal
  useEffect(() => {
    if (!projectsRef.current) return;
    const container = projectsRef.current;
    const cards = Array.from(container.querySelectorAll('.video-card')) as HTMLElement[];

    // hover tilt
    const listeners: Array<{ el: Element; move: any; leave: any }> = [];
    cards.forEach(card => {
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rY = (px - 0.5) * 6;
        const rX = (0.5 - py) * 6;
        gsap.to(card, { rotateY: rY, rotateX: rX, transformPerspective: 800, transformOrigin: 'center', duration: 0.45, ease: 'power3.out' });
      };
      const leave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
      card.addEventListener('mousemove', move as EventListener);
      card.addEventListener('mouseleave', leave as EventListener);
      listeners.push({ el: card, move, leave });
    });

    // reveal with ScrollTrigger (horizontal container)
    cards.forEach(card => {
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: card, scroller: container as any, start: 'left center' } });
    });

    return () => {
      listeners.forEach(l => { l.el.removeEventListener('mousemove', l.move as EventListener); l.el.removeEventListener('mouseleave', l.leave as EventListener); });
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  const pricingPlans = [
    {
      category: "Video Production",
      icon: Video,
      color: "purple",
      plans: [
        {
          name: "Basic Edit",
          price: "₹599/-",
          period: "per video",
          description: "Simple editing for your raw footage",
          features: [
            "Up to 30 sec runtime",
            "Color Correction",
            "Basic Transitions",
            "2 Revisions",
            "1 Week Delivery",
          ],
          popular: false,
        },
        {
          name: "Standard",
          price: "₹799/-",
          period: "per video",
          description: "Professional editing with motion graphics",
          features: [
            "Up to 1 min runtime",
            "Advanced Color Grading",
            "Motion Graphics",
            "Sound Design",
            "5 Revisions",
          ],
          popular: true,
        },
        {
          name: "Premium",
          price: "₹4,999",
          period: "per video",
          description: "Hollywood-quality production",
          features: [
            "upto 5 min  Runtime",
            "Full Production Service",
            "3D Animation",
            "Unlimited Revisions",
            "Price will increase according to the duration of the video",
          ],
          popular: false,
        },
      ],
    },

  ];
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground font-sans overflow-x-hidden transition-colors duration-300">
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
            ✨ Our craft is storytelling, clarity & visual impact
          </div>

          {/* Main Heading - Larger */}
          <h1 className="tracking-tight mb-6 leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] font-bold" style={{
            color: '#fff',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            We craft compelling visuals
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
            Cinematic storytelling and professional video production built with <span className="text-cyan-400 font-semibold">Precision</span>, <span className="text-purple-400 font-semibold">Passion</span>, and <span className="text-pink-400 font-semibold">Style</span>.
            <br className="hidden md:block" />
            Transform your brand narrative with high-quality visual content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Link to="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-white text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>🚀 Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#projects" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-semibold text-white text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 inline-block">
              View Our Work →
            </a>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🎬 Cinematic Editing</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🎨 Motion Graphics</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🖌️ Color Grading</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🔊 Sound Design</span>
            </div>
          </div>
        </div>
      </section>



      {/* Services Grid */}
      <section className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                What we offer
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              OUR VIDEO EXPERTISE
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Cinematic storytelling and professional video production from concept to final delivery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Camera,
                title: "CINEMATOGRAPHY",
                desc: "Professional video production with cinematic quality and artistic vision.",
                gradient: "from-red-900/50 via-red-800/30 to-red-950/20",
                iconColor: "text-red-400",
                glowColor: "group-hover:shadow-red-500/20"
              },
              {
                icon: Edit,
                title: "POST-PRODUCTION",
                desc: "Advanced editing, color grading, and effects to bring your vision to life.",
                gradient: "from-purple-900/50 via-purple-800/30 to-purple-950/20",
                iconColor: "text-purple-400",
                glowColor: "group-hover:shadow-purple-500/20"
              },
              {
                icon: Film,
                title: "MOTION DESIGN",
                desc: "Dynamic motion graphics and animations that enhance storytelling.",
                gradient: "from-blue-900/50 via-blue-800/30 to-blue-950/20",
                iconColor: "text-blue-400",
                glowColor: "group-hover:shadow-blue-500/20"
              },
              {
                icon: Palette,
                title: "COLOR GRADING",
                desc: "Professional color correction and grading for cinematic aesthetics.",
                gradient: "from-green-900/50 via-green-800/30 to-green-950/20",
                iconColor: "text-green-400",
                glowColor: "group-hover:shadow-green-500/20"
              },
              {
                icon: Music,
                title: "SOUND DESIGN",
                desc: "Immersive audio design and mixing for complete sensory experiences.",
                gradient: "from-yellow-900/50 via-yellow-800/30 to-yellow-950/20",
                iconColor: "text-yellow-400",
                glowColor: "group-hover:shadow-yellow-500/20"
              },
              {
                icon: Play,
                title: "DELIVERY",
                desc: "Multi-format export and optimization for any platform or medium.",
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

      {/* Recent Work Section */}
      <section className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] relative overflow-hidden" ref={projectsRef}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              RECENT VIDEO PROJECTS
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Cinematic storytelling and visual narratives that captivate audiences and deliver powerful messages
            </p>
          </div>
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto video-scroll py-4 px-2 snap-x snap-mandatory scrollbar-hide">
              {videoProjects.map(project => (
                <article
                  key={project.id}
                  className="video-card group relative snap-start w-[380px] flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a2e]/95 to-[#16162a]/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/60 transition-all duration-700 hover:scale-[1.02] shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4),0_0_60px_rgba(59,130,246,0.3)]"
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedVideo(project.youtube || null); }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Category badge with enhanced styling */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-md border border-white/20 shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* Play button with enhanced styling */}
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(project.youtube || null)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 transform hover:scale-110 transition-all duration-300 shadow-lg">
                        <Play className="w-7 h-7 text-white ml-1" />
                      </div>
                    </button>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 text-xs font-bold text-white backdrop-blur-md border border-white/20">
                      {project.duration}
                    </div>

                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-6 relative">
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-4 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {project.description}
                    </p>

                    {/* Year badge */}
                    <div className="flex items-center gap-2 mb-5">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-white/10 to-white/5 text-white/90 border border-white/10">
                        {project.year}
                      </span>
                    </div>

                    {/* Action footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 font-medium">Watch video</span>
                      <button
                        onClick={() => setSelectedVideo(project.youtube || null)}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold group/link"
                      >
                        Play
                        <Play className="w-4 h-4 transform group-hover/link:scale-110 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* Awards Section */}
          <div className="mt-16 md:mt-20 text-center">
            <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
              <div className="flex items-center gap-2 md:gap-3 text-foreground">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
                <span className="text-base md:text-lg font-light">
                  Festival Winner 2024
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-foreground">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
                <span className="text-base md:text-lg font-light">
                  Best Editing Award
                </span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-foreground">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
                <span className="text-base md:text-lg font-light">
                  Creative Excellence
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline video modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-black">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-3 right-3 z-50 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 focus:outline-none">✕</button>
            <div className="aspect-video w-full bg-black">
              <iframe
                title="Embedded video"
                className="w-full h-full"
                src={getEmbedUrl(selectedVideo)}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Pricing Section (moved above CTA) */}
      <section className="relative md:pl-24 px-4 md:px-6 py-16 md:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        {pricingPlans.map((service, serviceIndex) => (
          <div key={serviceIndex} className="max-w-7xl mx-auto relative z-10">
            {/* Enhanced header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
                <service.icon className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-400">Premium Plans</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {service.category}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Professional video editing and production services tailored to your needs
              </p>
            </div>
            {/* Pricing cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {service.plans.map((plan, planIndex) => (
                <div
                  key={planIndex}
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
                    <span className="project-pill">Project</span>
                  </div>

                  {/* Card content */}
                  <div className="relative z-10 mt-8">
                    {/* Plan name and description */}
                    <div className="mb-6">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                        {plan.name}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground group-hover:text-white/70 transition-colors duration-300">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline mb-8 pb-6 border-b border-white/10">
                      <span className="price-large bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="price-small ml-2">{plan.period}</span>
                    </div>

                    {/* Features list */}
                    <div className="mb-8 space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="feature-row group/feature">
                          <div className="feature-icon group-hover/feature:scale-110 transition-transform duration-300">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-sm sm:text-base text-white/80 group-hover/feature:text-white transition-colors duration-300">
                            {feature}
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
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Check className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">500+ Projects Delivered</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="relative md:pl-24 px-4 md:px-6 py-20 md:py-32 overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:48px_48px] animate-[drift_20s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/15 to-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-blue-500/15 to-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-[100px]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-purple-300/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-300/40 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="relative bg-gradient-to-br from-[#1a1a2e]/90 via-[#16162a]/70 to-[#0d0d14]/50 backdrop-blur-2xl rounded-[2rem] p-12 md:p-20 border-2 border-white/10 shadow-[0_0_80px_rgba(168,85,247,0.15)] overflow-hidden group hover:border-purple-500/40 hover:shadow-[0_0_100px_rgba(168,85,247,0.25)] transition-all duration-700">
            {/* Enhanced animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Larger decorative corner accents with animation */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/15 to-transparent rounded-br-[150px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-blue-500/15 to-transparent rounded-tl-[150px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Enhanced floating decorative elements */}
            <div className="absolute top-12 right-12 w-4 h-4 bg-purple-400/70 rounded-full animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.6)]"></div>
            <div className="absolute top-24 right-28 w-2.5 h-2.5 bg-blue-400/50 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ animationDelay: '0.15s' }}></div>
            <div className="absolute bottom-20 left-16 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse shadow-[0_0_18px_rgba(168,85,247,0.5)]" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-1/2 left-12 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.4)]" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/3 right-20 w-2.5 h-2.5 bg-purple-300/50 rounded-full animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.4)]" style={{ animationDelay: '0.7s' }}></div>

            {/* Enhanced decorative lines with glow */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
              <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.4)]"></div>
              <div className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.4)]"></div>
            </div>

            {/* Radial gradient spotlight effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10 text-center">
              {/* Enhanced Badge with glow */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-500/40 backdrop-blur-xl mb-8 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 group/badge">
                <Film className="w-5 h-5 text-purple-400 group-hover/badge:scale-110 transition-transform duration-300" />
                <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                  VIDEO PRODUCTION EXCELLENCE
                </span>
              </div>

              {/* Enhanced heading with better animation */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
                <span className="block bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent mb-2">
                  READY TO TELL YOUR
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  STORY?
                </span>
              </h2>

              {/* Enhanced description */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Let's create <span className="font-semibold text-purple-300">cinematic content</span> that captivates your audience and brings your vision to life with <span className="font-semibold text-blue-300">professional storytelling</span>.
              </p>

              {/* Enhanced CTA Buttons with better effects */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-14">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="group/btn relative w-full sm:w-auto cta-pill bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-500 hover:via-blue-500 hover:to-purple-600 text-white px-12 py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-500 shadow-[0_0_40px_rgba(168,85,247,0.4),0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6),0_25px_70px_rgba(0,0,0,0.4)] border-2 border-white/20 overflow-hidden hover:scale-105 transform">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </span>
                    {/* Enhanced button shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    {/* Button glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </Link>

                <Link to="/services" className="w-full sm:w-auto">
                  <button className="group/btn w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-12 py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-300 border-2 border-white/20 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-sm relative overflow-hidden hover:scale-105 transform">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      View All Services
                      <Film className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                    </span>
                  </button>
                </Link>
              </div>

              {/* Enhanced trust indicators with better styling */}
              <div className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm md:text-base">
                <div className="flex items-center gap-3 group/indicator">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.6)]"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="font-semibold text-white/70 group-hover/indicator:text-white transition-colors duration-300">Fast Turnaround</span>
                </div>

                <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden sm:block"></div>

                <div className="flex items-center gap-3 group/indicator">
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="font-semibold text-white/70 group-hover/indicator:text-white transition-colors duration-300">Professional Quality</span>
                </div>

                <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden sm:block"></div>

                <div className="flex items-center gap-3 group/indicator">
                  <div className="relative">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="font-semibold text-white/70 group-hover/indicator:text-white transition-colors duration-300">Unlimited Revisions</span>
                </div>
              </div>
            </div>

            {/* Bottom accent line with glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoServices;
