
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { ArrowLeft, Users, TrendingUp, Target, BarChart, MessageCircle, Calendar, Heart, Share2, Eye, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import Threads from "./Threads";
import { Code, Video, Check, ArrowRight, Star, Zap } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);


// Lazy load Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));
// hero background image
import socialBg from "./assets/assests/web.png";
import serviceHeroVideo from "./assets/assests/service hero.mp4";

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
    results: ['340% follower growth', '2.4M impressions', '180% engagement increase']
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
    results: ['520% reach increase', '5.8M total engagement', '50+ influencer partnerships']
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
    results: ['890% viral content growth', '12.3M views', '25 trending hashtags']
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
    results: ['275% subscriber growth', '3.2M watch hours', '95% retention rate']
  }
];

const SocialServices = () => {

  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Inject small helper CSS (grid texture, glow, scrollbar helpers)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'social-services-extra-styles';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.innerHTML = `
      .bg-grid-pattern { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e"); }
      .glow-border { box-shadow: 0 0 0 1px rgba(255,255,255,0.04); }
      .glow-border:hover { box-shadow: 0 8px 40px rgba(16,185,129,0.06); }
      .campaign-scroll::-webkit-scrollbar { height: 10px; }
      .campaign-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, rgba(16,185,129,0.18), rgba(6,95,70,0.22)); border-radius: 999px; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      /* Pricing card styles (match WebServices) */
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
      /* Liquid glass sheen */
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Hover tilt and reveal for campaign cards
  useEffect(() => {
    if (!projectsRef.current) return;
    const container = projectsRef.current;
    const cards = Array.from(container.querySelectorAll('.campaign-card')) as HTMLElement[];
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

    // ScrollTrigger reveal
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
      category: "SOCIAL STRATEGY",
      icon: Users,
      color: "pink",
      plans: [
        {
          name: "Advertisement",
          price: "₹10,620",
          period: "per week",
          description: "You will gain lot of customers",
          features: [
            "Facebook/Instagram Ads",
            "LinkedIn Campaigns",
            "Audience Targeting",
            "Ad Performance Optimization",
            "Retargeting Strategies",
            "Conversion Tracking"
          ],
          popular: false
        },
        {
          name: "Social media handling",
          price: "₹19,999",
          period: "per month",
          description: "Complete social media solution",
          features: [
            "Daily Posts",
            "Advanced Analytics",
            "3 Platforms",
            "Ad Management",
            "Strategy Sessions"
          ],
          popular: true
        },
        {
          name: "Graphics",
          price: "₹499-1499",
          period: "Per design",
          description: "price ",
          features: [
            "Social Media Banners",
            "Post Designs (Static & Carousel)",
            "Story Creatives",
            "Basic Motion Graphics",
            "Branded Templates",
          ],
          popular: false
        }
      ]
    }
  ];
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground transition-colors duration-300">
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
            ✨ Our craft is creativity, consistency & engagement
          </div>

          {/* Main Heading - Larger */}
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

          {/* Description paragraph */}
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
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🔥 Viral Content</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>📈 Audience Growth</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🤝 Engagement</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <span className="text-sm sm:text-base text-white/90" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>📊 Data Insights</span>
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
              OUR SOCIAL APPROACH
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Strategic social media management that builds authentic communities and drives meaningful engagement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Target,
                title: "STRATEGY",
                desc: "Data-driven social media strategies tailored to your brand's unique voice and goals.",
                gradient: "from-blue-900/50 via-blue-800/30 to-blue-950/20",
                iconColor: "text-blue-400",
                glowColor: "group-hover:shadow-blue-500/20"
              },
              {
                icon: Users,
                title: "COMMUNITY",
                desc: "Building and nurturing engaged communities around your brand's mission.",
                gradient: "from-purple-900/50 via-purple-800/30 to-purple-950/20",
                iconColor: "text-purple-400",
                glowColor: "group-hover:shadow-purple-500/20"
              },
              {
                icon: MessageCircle,
                title: "CONTENT",
                desc: "Compelling content creation that sparks conversations and drives engagement.",
                gradient: "from-green-900/50 via-green-800/30 to-green-950/20",
                iconColor: "text-green-400",
                glowColor: "group-hover:shadow-green-500/20"
              },
              {
                icon: BarChart,
                title: "ANALYTICS",
                desc: "Comprehensive analytics and insights to optimize performance and ROI.",
                gradient: "from-yellow-900/50 via-yellow-800/30 to-yellow-950/20",
                iconColor: "text-yellow-400",
                glowColor: "group-hover:shadow-yellow-500/20"
              },
              {
                icon: TrendingUp,
                title: "GROWTH",
                desc: "Organic growth strategies that build lasting relationships with your audience.",
                gradient: "from-pink-900/50 via-pink-800/30 to-pink-950/20",
                iconColor: "text-pink-400",
                glowColor: "group-hover:shadow-pink-500/20"
              },
              {
                icon: Calendar,
                title: "MANAGEMENT",
                desc: "End-to-end social media management from planning to execution and optimization.",
                gradient: "from-orange-900/50 via-orange-800/30 to-orange-950/20",
                iconColor: "text-orange-400",
                glowColor: "group-hover:shadow-orange-500/20"
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
      <section className="relative md:pl-24 px-4 md:px-6 py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>

          {/* Section header */}
          <div className="relative text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Latest Work</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                RECENT SOCIAL CAMPAIGNS
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Driving engagement and growth across social platforms
            </p>
          </div>

          {/* Projects grid */}
          <div className="relative">
            <div ref={projectsRef} className="flex gap-6 overflow-x-auto py-4 px-2 snap-x snap-mandatory scrollbar-hide">
              {socialCampaigns.map(campaign => (
                <article key={campaign.id} className="group snap-start w-[380px] flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e]/95 to-[#16162a]/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Project image/video */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                    <video className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" autoPlay muted loop playsInline>
                      <source src={campaign.videoUrl} type="video/mp4" />
                    </video>
                    <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Category badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
                        {campaign.platform}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
                        {campaign.category}
                      </span>
                    </div>

                    {/* Enhanced play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-7 h-7 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Engagement metrics */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                        <Eye className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold text-white">{campaign.engagement}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-emerald-400/40">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400">{campaign.growth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-purple-400 transition-colors duration-300">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        <span className="font-medium">{campaign.client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-medium">{campaign.duration}</span>
                      </div>
                    </div>

                    {/* Action footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 font-medium">View campaign</span>
                      <button className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold group/link">
                        Details
                        <ExternalLink className="w-4 h-4 transform group-hover/link:scale-110 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          {/* <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="text-2xl md:text-4xl font-light text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                24M+
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                Total Reach
              </div>
            </div>
            <div className="text-center group">
              <div className="text-2xl md:text-4xl font-light text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                450%
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                Avg Growth
              </div>
            </div>
            <div className="text-center group">
              <div className="text-2xl md:text-4xl font-light text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                Campaigns
              </div>
            </div>
            <div className="text-center group">
              <div className="text-2xl md:text-4xl font-light text-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                Client Retention
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Platforms Section */}
      <section className="relative md:pl-24 px-4 md:px-6 py-16 md:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
              <Share2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Our Expertise</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                PLATFORMS WE MASTER
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert management across all major social media platforms
            </p>
          </div>

          {/* Platforms grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'INSTAGRAM', color: 'from-pink-500 to-purple-500', icon: '📷', border: 'border-pink-500/30', hover: 'hover:border-pink-500/60 hover:shadow-pink-500/20' },
              { name: 'FACEBOOK', color: 'from-blue-500 to-blue-600', icon: '👤', border: 'border-blue-500/30', hover: 'hover:border-blue-500/60 hover:shadow-blue-500/20' },
              { name: 'TWITTER', color: 'from-sky-400 to-blue-500', icon: '🐦', border: 'border-sky-500/30', hover: 'hover:border-sky-500/60 hover:shadow-sky-500/20' },
              { name: 'LINKEDIN', color: 'from-blue-600 to-blue-700', icon: '💼', border: 'border-blue-600/30', hover: 'hover:border-blue-600/60 hover:shadow-blue-600/20' },
              { name: 'YOUTUBE', color: 'from-red-500 to-red-600', icon: '🎥', border: 'border-red-500/30', hover: 'hover:border-red-500/60 hover:shadow-red-500/20' },
              { name: 'TIKTOK', color: 'from-cyan-400 to-pink-500', icon: '🎵', border: 'border-cyan-500/30', hover: 'hover:border-cyan-500/60 hover:shadow-cyan-500/20' },
              { name: 'WHATSAPP', color: 'from-green-500 to-green-600', icon: '💬', border: 'border-green-500/30', hover: 'hover:border-green-500/60 hover:shadow-green-500/20' },
              { name: 'TELEGRAM', color: 'from-blue-400 to-blue-500', icon: '✈️', border: 'border-blue-400/30', hover: 'hover:border-blue-400/60 hover:shadow-blue-400/20' },
            ].map((platform, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-[#1a1a2e]/90 to-[#16162a]/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border ${platform.border} ${platform.hover} transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden shadow-xl cursor-pointer`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${platform.color} opacity-5 group-hover:opacity-15 rounded-bl-[80px] transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className="relative z-10 text-center">
                  <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {platform.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-white group-hover:to-white/90 transition-all duration-300">
                    {platform.name}
                  </h3>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Stats section */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                8+
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                Platforms Managed
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50M+
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                Total Reach
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                Campaigns Launched
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

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
                Strategic social media solutions tailored to grow your brand and engagement
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
                <span className="text-sm font-medium">Fast Setup</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Check className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">Results Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">300+ Brands Served</span>
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
                <MessageCircle className="w-5 h-5 text-purple-400 group-hover/badge:scale-110 transition-transform duration-300" />
                <span className="text-sm font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                  SOCIAL MEDIA EXCELLENCE
                </span>
              </div>

              {/* Enhanced heading with better animation */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
                <span className="block bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent mb-2">
                  READY TO AMPLIFY YOUR
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  VOICE?
                </span>
              </h2>

              {/* Enhanced description */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Let's build a <span className="font-semibold text-purple-300">social presence</span> that truly connects with your audience and drives <span className="font-semibold text-blue-300">meaningful engagement</span>.
              </p>

              {/* Enhanced CTA Buttons with better effects */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-14">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="group/btn relative w-full sm:w-auto cta-pill bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-500 hover:via-blue-500 hover:to-purple-600 text-white px-12 py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-500 shadow-[0_0_40px_rgba(168,85,247,0.4),0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6),0_25px_70px_rgba(0,0,0,0.4)] border-2 border-white/20 overflow-hidden hover:scale-105 transform">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Start Your Strategy
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
                      <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
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
                  <span className="font-semibold text-white/70 group-hover/indicator:text-white transition-colors duration-300">Instant Setup</span>
                </div>

                <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden sm:block"></div>

                <div className="flex items-center gap-3 group/indicator">
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="font-semibold text-white/70 group-hover/indicator:text-white transition-colors duration-300">Growth Guaranteed</span>
                </div>

                <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden sm:block"></div>

                <div className="flex items-center gap-3 group/indicator">
                  <div className="relative">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="font-semibold text-white/70 group-hover/indicator:text-white transition-colors duration-300">24/7 Support</span>
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

export default SocialServices;
