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



      {/* Our Work */}
      <section id="projects" className="md:pl-24 px-4 md:px-6 py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header redesign - Enhanced */}
          <div className="flex flex-col items-center justify-center mb-20 text-center">
            {/* Main heading with gradient */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
              Our Work
            </h2>

            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4"></div>
          </div>
          <div ref={projectsRef} className="flex gap-8 overflow-x-auto py-4 px-2 snap-x snap-mandatory scrollbar-hide pb-12">
            {videoProjects.map(project => (
              <article key={project.id} className="project-card group relative snap-start w-[450px] flex-shrink-0 flex flex-col h-[400px] transition-all duration-700 ease-out hover:-translate-y-4 hover:scale-[1.02] overflow-visible">
                {/* Folder Tab */}
                <div className="absolute -top-0 right-6 z-20 flex items-center gap-2 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="text-white/90 text-[8px] uppercase font-bold tracking-[0.15em]">
                    {project.category}
                  </span>
                  <span className="text-white/50 text-[8px] font-bold">•</span>
                  <span className="text-white/70 text-[8px] uppercase font-bold tracking-wide">
                    {project.duration}
                  </span>
                </div>

                {/* Main Card Body - White Background */}
                <div className="w-full h-full bg-white flex flex-col relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] transition-all duration-700">

                  {/* Video/Image Container */}
                  <div className="relative h-[280px] w-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                    {/* Thumbnail Image */}
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setSelectedVideo(project.youtube || null)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform shadow-xl">
                        <Play className="w-8 h-8 text-black fill-black ml-1" />
                      </div>
                    </button>
                  </div>

                  {/* Content Footer - White Background */}
                  <div className="flex-1 flex items-center justify-between p-6 bg-white">
                    <div className="flex flex-col gap-2">
                      {/* Project Title - Bold & Modern */}
                      <div className="flex flex-col gap-0">
                        <h3 className="text-[2rem] font-black text-gray-900 uppercase tracking-[-0.02em] leading-[0.9]">
                          {project.title.split(' ')[0]}
                        </h3>
                        {project.title.split(' ').slice(1).length > 0 && (
                          <span className="text-[2rem] font-black text-gray-900 uppercase tracking-[-0.02em] leading-[0.9]">
                            {project.title.split(' ').slice(1).join(' ')}
                          </span>
                        )}
                      </div>

                      {/* Year */}
                      <span className="text-xs text-gray-400 font-medium">{project.year}</span>
                    </div>

                    {/* Arrow Button */}
                    <button
                      onClick={() => setSelectedVideo(project.youtube || null)}
                      className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
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
