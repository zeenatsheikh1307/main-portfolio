import React, { useState, useEffect, useRef } from 'react';
import { Camera, Film, Palette, Music, Edit, Play, Award, ArrowRight, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from "react-router-dom";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import PricingDemo from './PricingDemo';

import v1 from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import v2 from "./assets/assests/Video.mp4";
import v3 from "./assets/assests/osmo.mp4";
import v4 from "./assets/assests/Video.mp4";
import v5 from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import v6 from "./assets/assests/osmo.mp4";
import serviceHeroVideo from "./assets/assests/service hero.mp4";

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
    year: '2024',
    youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_2'
  },
  {
    id: 3,
    title: 'Music Video',
    description: 'Cinematic music video with creative visual storytelling',
    thumbnail: v3,
    duration: '4:12',
    category: 'Creative',
    year: '2023',
    youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_3'
  },
  {
    id: 4,
    title: 'Event Highlight',
    description: 'Conference highlights with dynamic editing and graphics',
    thumbnail: v4,
    duration: '2:18',
    category: 'Event',
    year: '2024',
    youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_4'
  },
  {
    id: 5,
    title: 'Animation Reel',
    description: '2D/3D animation showcase with motion graphics',
    thumbnail: v5,
    duration: '1:45',
    category: 'Animation',
    year: '2024',
    youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_5'
  },
  {
    id: 6,
    title: 'Social Media Campaign',
    description: 'Series of short-form content for social platforms',
    thumbnail: v6,
    duration: '0:15',
    category: 'Social',
    year: '2024',
    youtube: 'https://www.youtube.com/watch?v=VIDEO_ID_6'
  }
];

const VideoServices = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
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
  }, []);

  // Use simple CSS hover effects for cards, keep GSAP lighter
  useEffect(() => {
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

  // Modal logic
  const getEmbedUrl = (url?: string | null) => {
    if (!url) return '';
    const patterns = [/(?:v=|\/videos\/|embed\/|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{6,11})/];
    for (const p of patterns) {
      const m = url.match(p);
      if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
    }
    return url;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedVideo(null); };
    document.addEventListener('keydown', onKey);
    if (selectedVideo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [selectedVideo]);


  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground font-sans overflow-x-hidden transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-start justify-center py-8 md:py-16 text-center bg-[#0a0a0f] overflow-hidden"
        ref={heroRef}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: 'cover', opacity: 0.8 }}
          >
            <source src={serviceHeroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] pointer-events-none z-[5]"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center min-h-screen px-4">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-semibold mb-8 backdrop-blur-md border border-white/20 bg-white/10" style={{
            background: 'linear-gradient(90deg, #2BC0E4 0%, #5D31D8 48%, #FF8A00 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: 600
          }}>
            ✨ Our craft is storytelling, clarity & visual impact
          </div>

          <h1 className="tracking-tight mb-6 leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white" style={{ letterSpacing: '-0.02em', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            We craft compelling visuals
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              with hyperfocus
            </span>
          </h1>

          <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-light" style={{ fontWeight: 300 }}>
            Cinematic storytelling and professional video production built with <span className="text-cyan-400 font-semibold">Precision</span>, <span className="text-purple-400 font-semibold">Passion</span>, and <span className="text-pink-400 font-semibold">Style</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Link to="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-bold text-white text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <span>🚀 Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#projects" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-semibold text-white text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 inline-block">
              View Our Work →
            </a>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/90">🎬 Cinematic Editing</span>
            <span className="inline-flex px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/90">🎨 Motion Graphics</span>
            <span className="inline-flex px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/90">🖌️ Color Grading</span>
          </div>
        </div>
      </section>

      {/* Services Grid (Preserved) */}
      <section className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" ref={servicesRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">OUR VIDEO EXPERTISE</h2>
            <p className="text-white/60 text-lg">Cinematic storytelling and professional video production</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Camera, title: "CINEMATOGRAPHY", desc: "Professional video production with cinematic quality.", iconColor: "text-red-400" },
              { icon: Edit, title: "POST-PRODUCTION", desc: "Advanced editing, color grading, and effects.", iconColor: "text-purple-400" },
              { icon: Film, title: "MOTION DESIGN", desc: "Dynamic motion graphics and animations.", iconColor: "text-blue-400" },
              { icon: Palette, title: "COLOR GRADING", desc: "Professional color correction and grading.", iconColor: "text-green-400" },
              { icon: Music, title: "SOUND DESIGN", desc: "Immersive audio design and mixing.", iconColor: "text-yellow-400" },
              { icon: Play, title: "DELIVERY", desc: "Multi-format export and optimization.", iconColor: "text-pink-400" },
            ].map((service, i) => (
              <div key={i} className="service-card group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2 min-h-[300px] flex flex-col justify-between">
                <div>
                  <service.icon className={`w-8 h-8 mb-4 ${service.iconColor}`} />
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/70">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Video Projects */}
      <section id="projects" className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent mb-4">RECENT PROJECTS</h2>
          </div>
          <div ref={projectsRef} className="flex gap-8 overflow-x-auto py-4 px-2 snap-x snap-mandatory scrollbar-hide pb-12">
            {videoProjects.map(project => (
              <article key={project.id} className="video-card group relative snap-start w-[380px] flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a2e]/95 to-[#16162a]/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/60 transition-all duration-500 shadow-2xl hover:scale-[1.02]">
                <div className="relative h-56 overflow-hidden bg-black">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <button onClick={() => setSelectedVideo(project.youtube || null)} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </button>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">{project.category}</div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">{project.duration}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{project.description}</p>
                  <div className="flex justify-between items-center text-xs text-white/40">
                    <span>{project.year}</span>
                    <button onClick={() => setSelectedVideo(project.youtube || null)} className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1">Watch <Play className="w-3 h-3" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {/* Awards - Simplified */}
          <div className="mt-12 flex justify-center gap-8 text-white/50 text-sm">
            <div className="flex items-center gap-2"><Award className="w-5 h-5" /> Festival Winner 2024</div>
            <div className="flex items-center gap-2"><Award className="w-5 h-5" /> Best Editing</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative px-4 md:px-6 py-16 md:py-24 overflow-hidden">
        <PricingDemo />
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors">✕</button>
            <div className="aspect-video w-full">
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
    </div>
  );
};

export default VideoServices;
