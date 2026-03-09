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

gsap.registerPlugin(ScrollTrigger);

const heroPrograms = [
  {
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=500&fit=crop",
    video: "https://res.cloudinary.com/drswsylge/video/upload/v1773050518/video1_gilxpc.mp4",
    category: "CINEMA",
    title: "Brand Documentary",
  },
  {
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=500&fit=crop",
    video: "https://res.cloudinary.com/drswsylge/video/upload/v1773050486/video4_ftgrwz.mp4",
    category: "POST-PRODUCTION",
    title: "Editing & Color Grading",
  },
  {
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop",
    video: "https://res.cloudinary.com/drswsylge/video/upload/v1773050483/video3_ui7noh.mp4",
    category: "COMMERCIAL",
    title: "Product Showcase Film",
  },
  {
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=500&fit=crop",
    video: "https://res.cloudinary.com/drswsylge/video/upload/v1773049917/video2_bwqmst.mp4",
    category: "STUDIO",
    title: "Studio Production",
  },
  {
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop",
    video: "https://res.cloudinary.com/drswsylge/video/upload/v1773049885/video5_sxj8v1.mp4",
    category: "CONTENT",
    title: "UGC & Social Content",
  },
  {
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=500&fit=crop",
    video: "https://res.cloudinary.com/drswsylge/video/upload/v1773050518/video1_gilxpc.mp4",
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

// ── Individual work card with video-on-hover ─────────────────────────────
type WorkProgram = { image: string; video?: string; category: string; title: string };

const WorkCard = ({ program }: { program: WorkProgram }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="flex-shrink-0 relative overflow-hidden"
      style={{ width: "356px", height: "480px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
    >
      <img src={program.image} alt={program.title} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
      {program.video && (
        <video
          ref={videoRef}
          muted loop playsInline preload="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity 0.4s ease", pointerEvents: "none" }}
          onPlay={e => { (e.target as HTMLVideoElement).style.opacity = "1"; }}
          onPause={e => { (e.target as HTMLVideoElement).style.opacity = "0"; }}
        >
          <source src={program.video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.85) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 p-6" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {program.category}
        </span>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 600, color: "#FFFFFF", lineHeight: "1.3" }}>
          {program.title}
        </h3>
      </div>
    </div>
  );
};

// ── Our Work drag-to-scroll strip ──────────────────────────────────────────
const OurWorkCarousel = () => {
  const programs = [...heroPrograms, ...heroPrograms];
  const CARD_PX = 380; // card width + gap
  const totalW = heroPrograms.length * CARD_PX;

  const stripRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const xRef = useRef(0);
  const isDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const parent = strip.parentElement!;

    const tick = () => {
      if (!isDrag.current) {
        xRef.current -= 1.2;
      }
      if (xRef.current <= -totalW) xRef.current = 0;
      strip.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDrag.current = true;
      dragStartX.current = e.clientX;
      dragStartScroll.current = xRef.current;
      parent.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDrag.current) return;
      const dx = e.clientX - dragStartX.current;
      xRef.current = dragStartScroll.current + dx;
      if (xRef.current > 0) xRef.current = 0;
      if (xRef.current < -totalW * 2) xRef.current = 0;
    };
    const onMouseUp = () => {
      isDrag.current = false;
      parent.style.cursor = "grab";
    };
    const onMouseEnter = () => { parent.style.cursor = "grab"; };
    const onMouseLeave = () => { isDrag.current = false; parent.style.cursor = "default"; };

    parent.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    parent.addEventListener("mouseenter", onMouseEnter);
    parent.addEventListener("mouseleave", onMouseLeave);

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      parent.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      parent.removeEventListener("mouseenter", onMouseEnter);
      parent.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section id="projects" className="py-8 md:py-12 bg-[#0a0a0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-4 text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
            Our Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4" />
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ paddingTop: "20px", paddingBottom: "60px", userSelect: "none" }}
      >
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "200px", background: "linear-gradient(90deg, #0a0a0f 0%, rgba(10,10,15,0) 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "200px", background: "linear-gradient(270deg, #0a0a0f 0%, rgba(10,10,15,0) 100%)" }} />

        <div ref={stripRef} style={{ display: "flex", gap: "24px", paddingLeft: "24px", willChange: "transform" }}>
        {programs.map((program, index) => (
            <WorkCard key={index} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

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
    <div
      className="min-h-screen text-foreground font-sans transition-colors duration-300"
      style={{ background: "#08080f" }}
    >
      <Navigation />

      {/* Hero Section — Holo Style */}
      <HoloHero
        badge="Video Production & AI Content"
        title="The fastest way to create professional videos for your brand"
        subtitle="We craft authentic, high-performing video content that captivates your audience and drives real results. From concept to delivery."
        primaryAction={{
          label: "Get Started",
          onClick: () => {
            window.location.href = "/contact";
          },
        }}
        cards={[
          {
            src: v1,
            label: "Brand Documentary",
            image:
              "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop",
          },
          {
            src: v2,
            label: "Product Showcase",
            image:
              "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=800&fit=crop",
          },
          {
            src: v3,
            label: "Cinematic Reel",
            image:
              "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=800&fit=crop",
          },
          {
            src: v4,
            label: "Social Content",
            image:
              "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=800&fit=crop",
          },
          {
            src: v5,
            label: "AI Model Video",
            image:
              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=800&fit=crop",
          },
          {
            src: v6,
            label: "UGC Campaign",
            image:
              "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&h=800&fit=crop",
          },
        ]}
      />

      <OurWorkCarousel />

      {/* Pricing Section */}
      <section className="relative px-4 md:px-6 py-16 md:py-24 overflow-hidden">
        <PricingSection
          className="text-white w-full"
          heading="Pricing"
          description="Professional video services at competitive rates"
          plans={[
            {
              name: "Video Creation",
              info: "Professional editing for your content",
              price: {
                monthly: 0,
                yearly: 0,
              },
              priceFormatted: "₹800-1000",
              accent: "text-purple-400",
              buttonVariant: "outline",
              buttonClass:
                "border-purple-400/20 hover:bg-purple-400/10 text-purple-400",
              features: [
                { text: "Script Writing" },
                { text: "Color grading & correction" },
                { text: "Professional transitions" },
                { text: "Audio mixing" },
                { text: "Motion graphics" },
                { text: "Fast turnaround" },
              ],
              btn: {
                text: "Get Started",
                href: "/contact",
              },
            },
            {
              highlighted: true,
              name: "AI Model Videos",
              info: "Advanced AI-generated video content",
              price: {
                monthly: 0,
                yearly: 0,
              },
              priceFormatted: "₹1500-2000",
              accent: "text-blue-400",
              buttonVariant: "default",
              buttonClass:
                "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",
              features: [
                { text: "Script Writing" },
                { text: "AI-generated avatars" },
                { text: "Custom voice synthesis" },
                { text: "Script to video" },
                { text: "Multiple languages" },
                { text: "Brand customization" },
              ],
              btn: {
                text: "Get Started",
                href: "/contact",
              },
            },
            {
              name: "UGC Content",
              info: "User-generated content style videos",
              price: {
                monthly: 0,
                yearly: 0,
              },
              pricePrefix: "Starting from",
              priceFormatted: "₹3000",
              accent: "text-emerald-400",
              buttonVariant: "outline",
              buttonClass:
                "border-emerald-400/20 hover:bg-emerald-400/10 text-emerald-400",
              features: [
                { text: "Script Writing" },
                { text: "Authentic creator content" },
                { text: "Platform-optimized" },
                { text: "High engagement style" },
                { text: "Multiple formats" },
                { text: "Quick delivery" },
              ],
              btn: {
                text: "Get Started",
                href: "/contact",
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
