import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Code, Video, Users, ArrowRight, Star, Award, Zap, Target, BarChart3, Rocket } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import web from "./assets/assests/Video.mp4";
import vid from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import social from "./assets/assests/osmo.mp4";

gsap.registerPlugin(ScrollTrigger);

// ─── Services Data ──────────────────────────────────────────────────
const SERVICES = [
  {
    id: "ads",
    title: "Ads Service",
    subtitle: "ROI Focused",
    description: "Multi-channel advertising strategies that turn clicks into high-value customers.",
    icon: Target,
    link: "/ads-service",
    color: "from-orange-500/20 to-yellow-500/20",
    accent: "text-orange-400",
    size: "md",
  },
  {
    id: "web",
    title: "Website Service",
    subtitle: "Modern Digital Solutions",
    description: "High-performance web applications built for speed, SEO, and massive scale.",
    icon: Code,
    video: web,
    link: "/web-services",
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-400",
    size: "md",
  },
  {
    id: "graphic",
    title: "Graphic Design",
    subtitle: "Visual Identity",
    description: "World-class brand identities and high-fidelity design systems for leading companies.",
    icon: Zap,
    link: "/graphic-services",
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    size: "md",
  },
  {
    id: "social",
    title: "Social Media",
    subtitle: "Digital Marketing",
    description: "Unified social strategies and performance content that command attention.",
    icon: Users,
    video: social,
    link: "/social-services",
    color: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-400",
    size: "md",
  }
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // ─── Mouse tracking for Parallax ────────────────────────────────────
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) - 0.5,
      y: (e.clientY / window.innerHeight) - 0.5,
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ─── GSAP Animations ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Title Entrance
      gsap.from(".hero-word", {
        y: 100,
        opacity: 0,
        rotateX: -45,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      // 2. Parallax Loop
      gsap.ticker.add(() => {
        const { x, y } = mouseRef.current;
        gsap.to(".parallax-1", { x: x * 50, y: y * 30, duration: 1.5, ease: "power2.out", overwrite: "auto" });
        gsap.to(".parallax-2", { x: x * -80, y: y * 40, duration: 2, ease: "power2.out", overwrite: "auto" });
        gsap.to(".parallax-3", { x: x * 30, y: y * -20, duration: 1.8, ease: "power2.out", overwrite: "auto" });
        
        // Background blobs
        gsap.to(".blob-1", { x: x * 150, y: y * 100, duration: 4, ease: "power2.out", overwrite: "auto" });
        gsap.to(".blob-2", { x: x * -100, y: y * -80, duration: 4.5, ease: "power2.out", overwrite: "auto" });
      });

      // 3. Grid Reveal
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 95%",
        }
      });

      // 4. Stats counter reveal
      const stats = gsap.utils.toArray<HTMLElement>(".stat-val");
      stats.forEach((stat) => {
        const target = parseFloat(stat.getAttribute("data-target") || "0");
        const suffix = stat.getAttribute("data-suffix") || "";
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          },
          onUpdate: () => {
            stat.innerText = Math.floor(obj.value) + suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      <Navigation />

      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        
        {/* Abstract Background Atmospheric Elements */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="blob-1 absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full" />
          <div className="blob-2 absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-blue-600/15 blur-[140px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 opacity-[0.05] noise-grain mix-blend-overlay" />
        </div>

        {/* Labels & Accent Lines */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-20">
          <div className="h-32 w-px bg-white" />
          <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] tracking-[0.5em] uppercase font-bold">digital excellence</span>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-forwards">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/60">Unlock Your Potential</span>
          </div>

          <div className="flex flex-col items-center select-none">
            <div className="parallax-1 overflow-hidden">
              <h1 className="hero-word text-[12vw] sm:text-[10vw] font-black leading-[0.9] tracking-[-0.04em] uppercase text-white/90">
                Our
              </h1>
            </div>
            <div className="parallax-2 overflow-hidden -mt-[0.5vw]">
              <h1 className="hero-word text-[12vw] sm:text-[10vw] font-black leading-[0.9] tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic">
                Digital
              </h1>
            </div>
            <div className="parallax-3 overflow-hidden -mt-[0.5vw]">
              <h1 className="hero-word text-animate-gradient text-[12vw] sm:text-[10vw] font-black leading-[0.9] tracking-[-0.04em] uppercase">
                Services
              </h1>
            </div>
          </div>

          <p className="mt-12 max-w-2xl mx-auto text-white/40 text-sm sm:text-lg leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 fill-mode-forwards">
            From performance marketing to cinematic production — we build cohesive digital systems that command attention and drive results.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold">scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── Stats Row ────────────────────────────────────────────────── */}
      <section className="py-24 relative z-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { target: 200, suffix: "+", label: "Global Projects" },
            { target: 50, suffix: "+", label: "Partnerships" },
            { target: 100, suffix: "%", label: "Satisfaction" },
            { target: 24, suffix: "/7", label: "Active Support" },
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <div className="stat-val text-4xl sm:text-6xl font-black mb-2 group-hover:scale-110 transition-transform duration-500" data-target={s.target} data-suffix={s.suffix}>0{s.suffix}</div>
              <div className="text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase text-white/30 group-hover:text-purple-400/50 transition-colors">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Services Bento Grid ──────────────────────────────────────── */}
      <section className="services-grid py-32 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="text-left">
              <span className="text-xs tracking-[0.5em] uppercase text-purple-500 font-bold mb-4 block">capabilities</span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none uppercase">
                What we<br /><span className="text-white/30 italic">master best.</span>
              </h2>
            </div>
            <p className="max-w-md text-white/40 text-sm sm:text-base text-right font-medium">
              We don't offer generic packages. We provide specialized creative intelligence for brands that refuse to be ignored.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-stretch">
            {SERVICES.map((s, i) => (
              <div key={s.id} className="flex h-full">
                <Link
                  to={s.link}
                  className="service-card group relative w-full h-full overflow-hidden rounded-[3rem] p-[1.5px] transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 flex flex-col active:scale-95 shadow-xl"
                >
                  {/* ─── Premium Border Accent ─── */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color.replace('/20', '')} opacity-30 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  {/* ─── Inner Container (Balanced & Symmetrical) ─── */}
                  <div className="relative h-full w-full bg-[#0d0d0d] rounded-[2.85rem] overflow-hidden flex flex-col">
                    
                    {/* Service Number Watermark */}
                    <div className="absolute top-8 right-12 text-[6rem] font-black italic text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.04] transition-colors duration-700">
                      0{i + 1}
                    </div>

                    {/* Atmos Glows */}
                    <div className={`absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br ${s.color} opacity-20 group-hover:opacity-40 blur-[80px] transition-opacity duration-700`} />
                    <div className={`absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br ${s.color} opacity-[0.05] group-hover:opacity-15 blur-[100px] transition-opacity duration-700`} />
                    
                    {/* Content Layer */}
                    <div className="relative h-full p-10 flex flex-col z-10">
                      
                      {/* Fixed Head (Standard Height) */}
                      <div className="h-16 flex justify-between items-start mb-10">
                        <div className={`w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center backdrop-blur-3xl group-hover:scale-110 transition-all duration-500`}>
                          <s.icon className={`w-7 h-7 ${s.accent.replace('400', '300')} drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`} />
                        </div>
                        <div className="py-2 px-4 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-2xl flex items-center gap-2 group-hover:bg-white/10 transition-all">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Explore</span>
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`h-1.5 w-10 bg-gradient-to-r ${s.color} rounded-full`} />
                          <span className={`text-[10px] tracking-[0.5em] font-black uppercase ${s.accent.replace('400', '300')}`}>
                            {s.subtitle}
                          </span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black mb-6 tracking-tighter leading-[0.85] text-white transition-all duration-500">
                          {s.title}
                        </h3>
                        <p className="text-white/50 text-sm sm:text-lg font-medium leading-relaxed max-w-sm group-hover:text-white transition-colors">
                          {s.description}
                        </p>
                      </div>

                      {/* Footer Shelf */}
                      <div className="mt-10 pt-8 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-10">
                            <div className="flex flex-col">
                              <span className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Impact</span>
                              <span className="text-xs font-bold text-white">ROI FOCUS</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Standard</span>
                              <span className="text-xs font-bold text-white">PREMIUM</span>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full ${s.accent.replace('text-', 'bg-').replace('400', '300')} shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse`} />
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ────────────────────────────────────────────── */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-xs tracking-[0.5em] uppercase text-white/30 font-bold mb-6 block">differentiation</span>
              <h2 className="text-4xl sm:text-6xl font-black leading-none uppercase mb-12">
                Why we<br />stand<br /><span className="text-animate-gradient italic">alone.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: Zap, label: "Ultrafast Execution", desc: "No red tape. We go from brief to build in record time." },
                  { icon: Award, label: "Premium Results", desc: "Every project is a potential award winner. No compromise." },
                  { icon: Users, label: "Unified Intelligence", desc: "Our squad works as one tight creative unit." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="mt-1 w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                      <item.icon className="w-5 h-5 text-white/60 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">{item.label}</h4>
                      <p className="text-sm text-white/40 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative">
               {/* Decorative abstract graphic */}
               <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-[3rem] border border-white/5 backdrop-blur-sm p-12 flex flex-col justify-center gap-12 group transition-all duration-700 hover:scale-[1.02]">
                  <div className="flex items-center gap-12 justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/10 bg-white/5 flex items-center justify-center animate-pulse">
                      <Rocket className="w-12 h-12 text-purple-400/50" />
                    </div>
                    <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center animate-bounce-slow">
                      <Star className="w-10 h-10 text-blue-400/50" />
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white/60">Creative Intelligence</h3>
                    <p className="text-sm text-white/30 max-w-sm mx-auto font-medium">Bespoke strategies refined by data and powered by pure visual storytelling.</p>
                  </div>
                  
                  {/* Glowing core */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 blur-[100px] -z-10 group-hover:bg-purple-500/40 transition-all duration-700" />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────────────────── */}
      <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-12">
            <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-black tracking-[0.3em] uppercase text-white/50">
              Ready to transcend the noise?
            </span>
          </div>
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter leading-none uppercase mb-16">
            Let's create<br />
            <span className="text-white/20 italic">the future.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="mb-btn-needle w-full sm:w-auto px-12 py-6 text-lg font-black uppercase tracking-widest text-white shadow-2xl active:scale-95 transition-all">
              Start Project
            </Link>
            <Link to="/" className="w-full sm:w-auto px-12 py-6 text-lg font-black uppercase tracking-widest text-white/40 border border-white/10 rounded-2xl hover:bg-white/5 hover:text-white transition-all">
              View Work
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .noise-grain {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          animation: noise 0.2s infinite;
        }
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Services;
