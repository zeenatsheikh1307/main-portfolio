import React, { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { Code2, Palette, Zap, Globe, Smartphone, Rocket, ExternalLink, Github } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from "react-router-dom";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Threads from "./Threads";
import { Code, Video, Users, Check, ArrowRight, Star, } from "lucide-react";
import refokus from "./assets/assests/r (1).png";
import cuberto from "./assets/assests/r (2).png";
import homer from "./assets/assests/r (3).png";
import dribble from "./assets/assests/r (4).png";
import magna from "./assets/assests/r (5).png";
import metabull from "./assets/assests/r (7).png";
import terraca from "./assets/assests/r (8).png";
import waman from "./assets/assests/r(9).png";
import fresco from "./assets/assests/r(10).png";
// hero background video
import serviceHeroVideo from "./assets/assests/service hero.mp4";

const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const webProjects = [
  {
    id: 1,
    title: "Metabull Universe",
    description: "Immersive digital universe with cutting-edge technology",
    image: metabull,
    tech: ["Web3", "Blockchain", "Metaverse"],
    category: "Web3",
  },
  {
    id: 2,
    title: "Terracastle Bhiwadi",
    description: "Real estate platform with advanced property management",
    image: terraca,
    url: "https://terracastlebhiwadi.in/",
    tech: ["React", "CMS", "Real Estate"],
    category: "Real Estate",
  },
  {
    id: 3,
    title: "Waman Haus",
    description: "Responsive web solution with modern architecture",
    image: waman,
    url: "https://wamanhaus.com/",
    tech: ["Next.js", "Tailwind", "Motion"],
    category: "Business",
  },
  {
    id: 4,
    title: "Fresco Clothing",
    description:
      "Modern web platform with stunning visual design and user experience",
    image: fresco,
    url: "https://frescoclothing.shop/",
    tech: ["React", "Node.js", "Design"],
    category: "Web Platform",
  },

  {
    id: 5,
    title: "Dribbble",
    description: "Responsive web solution with modern architecture",
    image: dribble,
    url: "https://navajowhite-okapi-326934.hostingersite.com/",
    tech: ["Next.js", "Tailwind", "Motion"],
    category: "Business",
  },
  {
    id: 6,
    title: "Refokus",
    description:
      "Modern web platform with stunning visual design and user experience",
    image: refokus,
    url: "https://palegreen-gazelle-847706.hostingersite.com/",
    tech: ["React", "Node.js", "Design"],
    category: "Web Platform",
  },
  {
    id: 7,
    title: "Cuberto",
    description: "Interactive web application with advanced functionality",
    image: cuberto,
    url: "https://lightyellow-cod-611350.hostingersite.com/",
    tech: ["Vue.js", "D3.js", "API"],
    category: "Web App",
  },
  {
    id: 8,
    title: "Home Rejoice",
    description: "Creative portfolio with innovative design elements",
    image: homer,
    url: "https://cornflowerblue-lemur-358711.hostingersite.com/",
    tech: ["Three.js", "React", "GSAP"],
    category: "Portfolio",
  },
  {
    id: 9,
    title: "Magna",
    description: "Dynamic web platform with interactive features",
    image: magna,
    url: "https://lightsalmon-buffalo-180630.hostingersite.com/",
    tech: ["React", "Firebase", "PWA"],
    category: "Platform",
  },
];

const WebServices = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Inject small CSS snippets that were previously using styled-jsx (avoids TSX/styled-jsx errors)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const styleId = 'webservices-extra-styles';
    if (document.getElementById(styleId)) return;
    const s = document.createElement('style');
    s.id = styleId;
    s.innerHTML = `
      .bg-grid-pattern { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e"); }
      .glow-border { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06); }
      .glow-border:hover { box-shadow: 0 0 20px rgba(16, 185, 129, 0.12), 0 0 0 1px rgba(16, 185, 129, 0.28); }
      /* subtle custom scrollbar for projects */
      .project-scroll::-webkit-scrollbar { height: 10px; }
      .project-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, rgba(16,185,129,0.2), rgba(6,95,70,0.25)); border-radius: 999px; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      /* Neon glow for popular pricing card */
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
      /* Rotating neon outer glow ring */
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
      /* Ribbon and pricing card visuals */
      .ribbon {
        position: absolute; left: 50%; transform: translateX(-50%); top: -14px; z-index: 10;
        background: linear-gradient(90deg,#7c3aed,#3b82f6); color: #fff; padding: 6px 12px; border-radius: 999px; font-weight:700; font-size:12px; display:inline-flex; align-items:center; gap:8px; box-shadow: 0 6px 18px rgba(59,130,246,0.12);
      }
      .project-pill { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.9); padding:6px 10px; border-radius:999px; font-size:12px; border:1px solid rgba(255,255,255,0.04); }
      .pricing-card { min-height: 420px; display:flex; flex-direction:column; }
      .price-large { font-size: 1.8rem; font-weight:800; letter-spacing:-0.02em; }
      .price-small { font-size: 0.95rem; color: rgba(255,255,255,0.75); margin-left:6px; }
      .feature-icon { width:28px; height:28px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; background: linear-gradient(180deg, rgba(59,130,246,0.95), rgba(99,102,241,0.95)); box-shadow: 0 4px 12px rgba(59,130,246,0.12); }
      .feature-row { display:flex; gap:12px; align-items:flex-start; }
      .cta-pill { border-radius: 999px; padding:10px 16px; font-weight:700; }
  .cta-pill { transition: transform .22s cubic-bezier(.2,.9,.2,1), box-shadow .22s ease; }
  .cta-pill:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 14px 40px rgba(2,6,23,0.4); }
  .cta-pill .btn-arrow { display:inline-block; transform: translateX(0); transition: transform .22s ease; }
  .cta-pill:hover .btn-arrow { transform: translateX(6px); }
  /* Liquid glass effect for CTA buttons */
  .cta-pill { position: relative; overflow: hidden; backdrop-filter: blur(8px) saturate(120%); -webkit-backdrop-filter: blur(8px) saturate(120%); border: 1px solid rgba(255,255,255,0.06); background-color: rgba(255,255,255,0.02); }
  .cta-pill::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); mix-blend-mode: overlay; }
  .cta-pill::after { content: ''; position: absolute; top: -60%; left: -30%; width: 60%; height: 240%; background: linear-gradient(120deg, rgba(255,255,255,0.22), rgba(255,255,255,0.02) 40%, rgba(255,255,255,0)); transform: rotate(-25deg) translateX(-140%); filter: blur(8px); transition: transform .7s cubic-bezier(.2,.9,.2,1); pointer-events: none; }
  .cta-pill:hover::after { transform: rotate(-25deg) translateX(10%); }
  /* Make popular gradient still feel glassy */
  .cta-pill.bg-gradient-to-r { background-color: transparent; border: 1px solid rgba(255,255,255,0.04); }
      @media (max-width: 768px) { .pricing-card { min-height: auto; } }
    `;
    document.head.appendChild(s);
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Debounced animations for better performance
    let animationFrame: number;

    const animateElements = () => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
        );
      }

      // Services grid animation
      if (servicesRef.current) {
        gsap.fromTo(servicesRef.current.querySelectorAll('.service-card'),
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              end: "bottom 20%",
            }
          }
        );
      }

      // Projects animation
      if (projectsRef.current) {
        gsap.fromTo(projectsRef.current.querySelectorAll('.project-card'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 70%",
              end: "bottom 30%",
            }
          }
        );
      }
    };

    animationFrame = requestAnimationFrame(animateElements);

    return () => {
      cancelAnimationFrame(animationFrame);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Additional GSAP: ambient floats for hero and hover-tilt for project cards
  useEffect(() => {
    if (!heroRef.current) return;

    // ambient float
    const hero = heroRef.current;
    const floatEls = hero.querySelectorAll('.float-ambient');
    floatEls.forEach((el, i) => {
      gsap.to(el, {
        y: (i % 2 === 0 ? -12 : 12),
        x: (i % 2 === 0 ? -6 : 6),
        duration: 6 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Project card tilt on mousemove
    const cards = projectsRef.current?.querySelectorAll('.project-card') || [];
    const listeners: Array<{ el: Element; move: any; leave: any }> = [];

    cards.forEach((card: Element) => {
      const move = (e: MouseEvent) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 6; // degrees
        const rotateX = (0.5 - py) * 6;
        gsap.to(card, { rotateX, rotateY, transformPerspective: 800, transformOrigin: 'center', duration: 0.5, ease: 'power3.out' });
      };

      const leave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
      };

      card.addEventListener('mousemove', move as EventListener);
      card.addEventListener('mouseleave', leave as EventListener);
      listeners.push({ el: card, move, leave });
    });

    return () => {
      listeners.forEach(l => {
        l.el.removeEventListener('mousemove', l.move as EventListener);
        l.el.removeEventListener('mouseleave', l.leave as EventListener);
      });
    };
  }, []);

  // animate project cards as they scroll into view (horizontal reveal)
  useEffect(() => {
    if (!projectsRef.current) return;
    const cards = Array.from(projectsRef.current.querySelectorAll('.project-card')) as HTMLElement[];
    cards.forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          scroller: projectsRef.current as any,
          start: 'left center',
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const pricingPlans = [
    {
      category: "Web Development",
      icon: Code,
      color: "blue",
      plans: [
        {
          name: "Static Website",
          price: "₹8,000",
          period: "one time",
          description: "Perfect for small businesses getting online",
          features: [
            "5 Page Website",
            "Mobile Responsive, fast loading",
            "Free domain & hosting (1 year)",
            "WhatsApp chat & contact form",
            "3-month free support",
          ],
          popular: false,
        },
        {
          name: "Dynamic website",
          price: "₹15,000",
          period: "one time",
          description: "Complete solution for growing businesses",
          features: [
            "8-12 pages",
            "Include admin panel",
            "Free hosting & domain (1 year)",
            "SEO Ready + Whatsapp form ",
            "1-month free corrections (Rs.150/change after)",
          ],
          popular: true,
        },
        {
          name: "E-commerce website",
          price: "₹20,000",
          period: "one time",
          description: "Custom solutions for large organizations",
          features: [
            "Product listing, cart, checkout",
            "Payment gateway + Admin panel",
            "Free domain & hosting (1 year)",
            "Responsive & secure design",
            "Dedicated Team",
          ],
          popular: false,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground font-sans overflow-x-hidden transition-colors duration-300 scroll-smooth">
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
            ✨ Our craft is innovation, precision & performance
          </div>

          {/* Main Heading - Larger */}
          <h1 className="tracking-tight mb-6 leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] font-bold" style={{
            color: '#fff',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            We build digital experiences
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
            Professional websites built with <span className="text-cyan-400 font-semibold">Next.js</span>, <span className="text-purple-400 font-semibold">WordPress</span>, or <span className="text-pink-400 font-semibold">Shopify</span>.
            <br className="hidden md:block" />
            Transform your online presence with fast, SEO-optimized websites.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Link to="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-white text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>🚀 Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#pricing" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-semibold text-white text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 inline-block">
              View Our Plans →
            </a>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>⚡ Fast Loading</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🎯 SEO Ready</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>📱 Responsive</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>💎 Premium Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" ref={servicesRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                What we offer
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              OUR WEB CAPABILITIES
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Cutting-edge solutions tailored to your digital needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Code2,
                title: "LANDING PAGE",
                desc: "A landing page is a single-page website that is designed to promote a specific product, service, or idea.",
                gradient: "from-purple-900/50 via-purple-800/30 to-purple-950/20",
                iconColor: "text-purple-400",
                glowColor: "group-hover:shadow-purple-500/20"
              },
              {
                icon: Palette,
                title: "STATIC WEBSITE",
                desc: "A static website is a website that is not dynamic and does not change based on user input.",
                gradient: "from-blue-900/50 via-blue-800/30 to-blue-950/20",
                iconColor: "text-blue-400",
                glowColor: "group-hover:shadow-blue-500/20"
              },
              {
                icon: Zap,
                title: "DYNAMIC WEBSITE",
                desc: "A dynamic website is a website that is interactive and changes based on user input.",
                gradient: "from-indigo-900/50 via-indigo-800/30 to-indigo-950/20",
                iconColor: "text-indigo-400",
                glowColor: "group-hover:shadow-indigo-500/20"
              },
              {
                icon: Globe,
                title: "E-COMMERCE WEBSITE",
                desc: "An e-commerce website allows users to purchase products or services online and includes a payment gateway.",
                gradient: "from-violet-900/50 via-violet-800/30 to-violet-950/20",
                iconColor: "text-violet-400",
                glowColor: "group-hover:shadow-violet-500/20"
              },
              {
                icon: Smartphone,
                title: "RESPONSIVE DESIGN",
                desc: "Perfect experiences that adapt to any screen size.",
                gradient: "from-cyan-900/50 via-cyan-800/30 to-cyan-950/20",
                iconColor: "text-cyan-400",
                glowColor: "group-hover:shadow-cyan-500/20"
              },
              {
                icon: Rocket,
                title: "SEO SERVICE",
                desc: "Search engine optimization helps your website show up better in search results so more people can find it.",
                gradient: "from-pink-900/50 via-pink-800/30 to-pink-950/20",
                iconColor: "text-pink-400",
                glowColor: "group-hover:shadow-pink-500/20"
              },
            ].map((service, index) => (
              <div
                key={index}
                className="service-card group relative bg-[#0a0a0f] rounded-3xl p-8 md:p-10 border border-white/5 overflow-visible hover:z-10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* 1. Dynamic Border Gradient (Pseudo-border effect) */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10`}></div>

                {/* 2. Glass Surface */}
                <div className="absolute inset-[1px] bg-[#0a0a0f]/90 backdrop-blur-3xl rounded-[23px] overflow-hidden -z-10">
                  {/* Inner Glow Mesh */}
                  <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none`}></div>
                  <div className={`absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none`}></div>
                </div>

                {/* 3. Floating Icon Box */}
                <div className="relative z-10 mb-10">
                  <div className="relative inline-block">
                    {/* Icon Glow Underlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl`}></div>

                    {/* Main Icon Container */}
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                      {/* Inner Reflection Highlight */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none"></div>

                      <service.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${service.iconColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300`} />
                    </div>
                  </div>
                </div>

                {/* 4. Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-black mb-4 text-white uppercase tracking-wider group-hover:tracking-widest transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-white/50 group-hover:text-white/80 leading-relaxed text-sm sm:text-base transition-colors duration-300 font-medium">
                    {service.desc}
                  </p>
                </div>

                {/* 5. Bottom Shine Line */}
                <div className={`absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[1px]`}></div>
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
              RECENT WEB PROJECTS
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Explore our portfolio of successful web projects that showcase our expertise and creativity
            </p>
          </div>
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto project-scroll py-4 px-2 snap-x snap-mandatory scrollbar-hide">
              {webProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="project-card group relative snap-start w-[380px] flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a2e]/95 to-[#16162a]/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/60 transition-all duration-700 hover:scale-[1.02] shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4),0_0_60px_rgba(59,130,246,0.3)]"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
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

                    {/* Action buttons with enhanced styling */}
                    <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 bg-emerald-500/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-emerald-500/80 transition-all duration-300 border border-emerald-400/30 transform hover:scale-110 hover:rotate-12 shadow-lg"
                          title="View Live Site"
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </a>
                      )}
                      <button className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/30 transform hover:scale-110 hover:-rotate-12 shadow-lg">
                        <Github className="w-5 h-5 text-white" />
                      </button>
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

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-white/10 to-white/5 text-white/90 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 font-medium">View details</span>
                      <a
                        href={project.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold group/link"
                      >
                        Open
                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative md:pl-24 px-4 md:px-6 py-16 md:py-24 overflow-hidden">
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
                  {service.category} Pricing
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Professional web development services tailored to your needs
              </p>
            </div>
            {/* Pricing cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {service.plans.map((plan, planIndex) => (
                <div
                  key={planIndex}
                  className={`pricing-card relative bg-gradient-to-br from-[#1a1a2e]/95 to-[#16162a]/70 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border ${plan.popular
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
                    <div className="mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                        {plan.name}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground group-hover:text-white/70 transition-colors duration-300">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline mb-5 pb-5 border-b border-white/10">
                      <span className="price-large bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="price-small ml-2">{plan.period}</span>
                    </div>

                    {/* Features list */}
                    <div className="mb-6 space-y-2.5">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="feature-row group/feature">
                          <div className="feature-icon group-hover/feature:scale-110 transition-transform duration-300">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-sm sm:text-base text-white/80 group-hover/feature:text-white transition-colors duration-300">{feature}</div>
                        </div>
                      ))}
                    </div>
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
                <span className="text-sm font-medium">100+ Projects Delivered</span>
              </div>
            </div>
          </div>
        ))}
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
                <Rocket className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  LET'S COLLABORATE
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  READY TO BUILD THE
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  FUTURE?
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's create a web experience that defines tomorrow's digital landscape and brings your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="group/btn relative w-full sm:w-auto cta-pill bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-500 hover:via-blue-500 hover:to-purple-600 text-white px-10 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-500 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 border-2 border-white/20 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      START YOUR PROJECT
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
                      VIEW ALL SERVICES
                      <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </span>
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Free Consultation</span>
                </div>
                <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                  <span className="font-medium">Quick Response</span>
                </div>
                <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  <span className="font-medium">Expert Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebServices;
