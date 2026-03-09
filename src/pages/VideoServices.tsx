import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Film,
  Palette,
  Music,
  Edit,
  Play,
  Award,
  ArrowRight,
  Check,
} from "lucide-react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import { PricingSection } from "@/components/ui/pricing";
import CoverflowCarousel from "@/components/ui/coverflow-carousel";
import { HoloHero } from "@/components/ui/holo-hero";
import { ReadyToBuild } from "@/components/ui/ready-to-build";

import v1 from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import v2 from "./assets/assests/Video.mp4";
import v3 from "./assets/assests/osmo.mp4";
import v4 from "./assets/assests/Video.mp4";
import v5 from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import v6 from "./assets/assests/osmo.mp4";
import serviceHeroVideo from "./assets/assests/service hero.mp4";

gsap.registerPlugin(ScrollTrigger);

const heroPrograms = [
  {
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=500&fit=crop",
    category: "CINEMA",
    title: "Brand Documentary",
  },
  {
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=500&fit=crop",
    category: "POST-PRODUCTION",
    title: "Editing & Color Grading",
  },
  {
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop",
    category: "COMMERCIAL",
    title: "Product Showcase Film",
  },
  {
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=500&fit=crop",
    category: "STUDIO",
    title: "Studio Production",
  },
  {
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop",
    category: "CONTENT",
    title: "UGC & Social Content",
  },
  {
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=500&fit=crop",
    category: "EVENTS",
    title: "Live Event Coverage",
  },
];

const videoProjects = [
  {
    id: 1,
    title: "Brand Documentary",
    description: "Corporate documentary showcasing company culture and values",
    thumbnail: v1,
    duration: "3:45",
    category: "Documentary",
    year: "2024",
    youtube: "https://youtube.com/shorts/4ZUyqa2rgmM?feature=share",
  },
  {
    id: 2,
    title: "Product Showcase",
    description: "Dynamic product reveal with motion graphics and animation",
    thumbnail: v2,
    duration: "1:30",
    category: "Commercial",
    year: "2024",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID_2",
  },
  {
    id: 3,
    title: "Music Video",
    description: "Cinematic music video with creative visual storytelling",
    thumbnail: v3,
    duration: "4:12",
    category: "Creative",
    year: "2023",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID_3",
  },
  {
    id: 4,
    title: "Event Highlight",
    description: "Conference highlights with dynamic editing and graphics",
    thumbnail: v4,
    duration: "2:18",
    category: "Event",
    year: "2024",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID_4",
  },
  {
    id: 5,
    title: "Animation Reel",
    description: "2D/3D animation showcase with motion graphics",
    thumbnail: v5,
    duration: "1:45",
    category: "Animation",
    year: "2024",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID_5",
  },
  {
    id: 6,
    title: "Social Media Campaign",
    description: "Series of short-form content for social platforms",
    thumbnail: v6,
    duration: "0:15",
    category: "Social",
    year: "2024",
    youtube: "https://www.youtube.com/watch?v=VIDEO_ID_6",
  },
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
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
      );
    }
  }, []);

  // Use simple CSS hover effects for cards, keep GSAP lighter
  useEffect(() => {
    // Services grid animation
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.querySelectorAll(".service-card"),
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
          },
        },
      );
    }
  }, []);

  // Modal logic
  const getEmbedUrl = (url?: string | null) => {
    if (!url) return "";
    const patterns = [
      /(?:v=|\/videos\/|embed\/|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{6,11})/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m && m[1])
        return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
    }
    return url;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    document.addEventListener("keydown", onKey);
    if (selectedVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  return (
    <div className="min-h-screen text-foreground font-sans transition-colors duration-300" style={{ background: "#08080f" }}>
      <Navigation />

      {/* Hero Section — Holo Style */}
      <HoloHero
        badge="Video Production & AI Content"
        title="The fastest way to create professional videos for your brand"
        subtitle="We craft authentic, high-performing video content that captivates your audience and drives real results. From concept to delivery."
        primaryAction={{
          label: "Get Started",
          onClick: () => { window.location.href = "/contact"; },
        }}
        cards={[
          { src: v1, label: "Brand Documentary" },
          { src: v2, label: "Product Showcase" },
          { src: v3, label: "Cinematic Reel" },
          { src: v4, label: "Social Content" },
          { src: v5, label: "AI Model Video" },
          { src: v6, label: "UGC Campaign" },
        ]}
      />

      {/* Our Work */}
      <section
        id="projects"
        className="md:pl-24 px-4 md:px-6 py-8 md:py-12 bg-[#0a0a0f] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header redesign - Enhanced */}
          <div className="flex flex-col items-center justify-center mb-4 text-center">
            {/* Main heading with gradient */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
              Our Work
            </h2>

            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4"></div>
          </div>
        </div>
        <div className="relative group/carousel -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 w-full overflow-hidden"
            style={{ paddingTop: "60px", paddingBottom: "60px" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: "200px", background: "linear-gradient(90deg, #0a0a0f 0%, rgba(10,10,15,0) 100%)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: "200px", background: "linear-gradient(270deg, #0a0a0f 0%, rgba(10,10,15,0) 100%)" }}
            />

            <motion.div
              className="flex items-center"
              animate={{ x: [0, -((heroPrograms.length * 380) / 2)] }}
              transition={{
                x: { repeat: Infinity, repeatType: "loop", duration: heroPrograms.length * 3, ease: "linear" },
              }}
              style={{ gap: "24px", paddingLeft: "24px" }}
            >
              {[...heroPrograms, ...heroPrograms].map((program, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => { }}
                  className="flex-shrink-0 cursor-pointer relative overflow-hidden"
                  style={{ width: "356px", height: "480px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.85) 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {program.category}
                    </span>
                    <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 600, color: "#FFFFFF", lineHeight: "1.3" }}>
                      {program.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative px-4 md:px-6 py-16 md:py-24 overflow-hidden">
        <PricingSection
          className="text-white w-full"
          heading="Pricing"
          description="Professional video services at competitive rates"
          plans={[
            {
              name: 'Video Creation',
              info: 'Professional editing for your content',
              price: {
                monthly: 0,
                yearly: 0,
              },
              priceFormatted: '₹800-1000',
              accent: 'text-purple-400',
              buttonVariant: 'outline',
              buttonClass: 'border-purple-400/20 hover:bg-purple-400/10 text-purple-400',
              features: [
                { text: 'Script Writing' },
                { text: 'Color grading & correction' },
                { text: 'Professional transitions' },
                { text: 'Audio mixing' },
                { text: 'Motion graphics' },
                { text: 'Fast turnaround' },
              ],
              btn: {
                text: 'Get Started',
                href: '/contact',
              },
            },
            {
              highlighted: true,
              name: 'AI Model Videos',
              info: 'Advanced AI-generated video content',
              price: {
                monthly: 0,
                yearly: 0,
              },
              priceFormatted: '₹1500-2000',
              accent: 'text-blue-400',
              buttonVariant: 'default',
              buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20',
              features: [
                { text: 'Script Writing' },
                { text: 'AI-generated avatars' },
                { text: 'Custom voice synthesis' },
                { text: 'Script to video' },
                { text: 'Multiple languages' },
                { text: 'Brand customization' },
              ],
              btn: {
                text: 'Get Started',
                href: '/contact',
              },
            },
            {
              name: 'UGC Content',
              info: 'User-generated content style videos',
              price: {
                monthly: 0,
                yearly: 0,
              },
              pricePrefix: 'Starting from',
              priceFormatted: '₹3000',
              accent: 'text-emerald-400',
              buttonVariant: 'outline',
              buttonClass: 'border-emerald-400/20 hover:bg-emerald-400/10 text-emerald-400',
              features: [
                { text: 'Script Writing' },
                { text: 'Authentic creator content' },
                { text: 'Platform-optimized' },
                { text: 'High engagement style' },
                { text: 'Multiple formats' },
                { text: 'Quick delivery' },
              ],
              btn: {
                text: 'Get Started',
                href: '/contact',
              },
            },
          ]}
        />
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
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

      {/* Ready to Build CTA Section */}
      <ReadyToBuild />
    </div>
  );
};

export default VideoServices;
