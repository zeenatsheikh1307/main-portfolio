import React, { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { Code2, Palette, Zap, Globe, Smartphone, Rocket, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
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
import webVideo from "./assets/assests/web .mp4";
import { PricingSection } from '@/components/ui/pricing';
import PricingDemo from './PricingDemo';
import CoverflowCarousel from '@/components/ui/coverflow-carousel';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = webProjects.length - (isDesktop ? 2 : 1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = webProjects.length - (isDesktop ? 2 : 1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .marquee-text { line-height: 0.75; display: inline-block; padding-top: 4px; padding-bottom: 4px; }
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

      {/* Recent Work Section */}
      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] relative overflow-hidden" ref={projectsRef}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header redesign - Enhanced */}
          <div className="flex flex-col items-center justify-center mb-20 text-center">
            {/* Small label above */}

            {/* Main heading with gradient */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
              Our Work
            </h2>

            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4"></div>

            {/* Subtitle */}
          </div>

          <div className="relative group/carousel">
            <CoverflowCarousel items={webProjects} />
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

export default WebServices;

