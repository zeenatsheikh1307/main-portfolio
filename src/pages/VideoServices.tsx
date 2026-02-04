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
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import { PricingSection } from "@/components/ui/pricing";
import CoverflowCarousel from "@/components/ui/coverflow-carousel";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import { ReadyToBuild } from "@/components/ui/ready-to-build";

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
    <div className="min-h-screen bg-[#0a0a0f] text-foreground font-sans overflow-x-hidden transition-colors duration-300">
      <Navigation />

      {/* Hero Section - 3D Gallery */}
      <section className="relative h-screen overflow-hidden bg-[#0a0a0f]">
        <InfiniteGallery
          images={[
            {
              src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
              alt: "Professional cinema camera",
            },
            {
              src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
              alt: "Film production set",
            },
            {
              src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
              alt: "Video editing workspace",
            },
            {
              src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
              alt: "Film clapperboard",
            },
            {
              src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&q=80",
              alt: "Studio lighting setup",
            },
            {
              src: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=1200&q=80",
              alt: "Cinematography behind the scenes",
            },
            {
              src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
              alt: "Camera operator filming",
            },
            {
              src: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&q=80",
              alt: "Film production crew",
            },
            {
              src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
              alt: "Vintage film reels",
            },
            {
              src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
              alt: "Video analytics dashboard",
            },
            {
              src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
              alt: "Social media content",
            },
            {
              src: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&q=80",
              alt: "Content creation setup",
            },
          ]}
          speed={1.2}
          visibleCount={12}
          fadeSettings={{
            fadeIn: { start: 0.05, end: 0.25 },
            fadeOut: { start: 0.4, end: 0.43 },
          }}
          blurSettings={{
            blurIn: { start: 0.0, end: 0.1 },
            blurOut: { start: 0.4, end: 0.43 },
            maxBlur: 8.0,
          }}
          className="h-screen w-full"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center px-4 mix-blend-exclusion text-white z-10">
          <div>
            <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl tracking-tight mb-4">
              <span className="italic">Crafting</span> Visual Stories
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-wide opacity-80">
              Your Vision, Our Lens
            </p>
          </div>
        </div>

        {/* Scroll Hint */}
        {/* <div className="absolute bottom-10 left-0 right-0 text-center font-mono uppercase text-[11px] font-semibold text-white/60 z-10 pointer-events-none">
          <p>Scroll through the gallery • 3 loops then page scrolls</p>
          <p className="opacity-60 mt-1">
            Auto-play resumes after 3 seconds of inactivity
          </p>
        </div> */}

        {/* Gradient Merge to Next Section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] pointer-events-none z-[5]"></div>
      </section>

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
          <CoverflowCarousel
            items={videoProjects.map((p) => ({
              id: p.id,
              title: p.title,
              description: p.description,
              image: p.thumbnail, // thumbnail is mp4, but we'll use it as placeholder for image slot if needed, or better, pass as video
              video: p.thumbnail, // Pass the video file here
              category: p.category,
              tech: [p.duration, p.year], // Mapping duration/year to tech pills if needed, or just ignore
              url: p.youtube,
            }))}
          />
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
              name: 'Video Editing',
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
              priceFormatted: '₹3000',
              accent: 'text-emerald-400',
              buttonVariant: 'outline',
              buttonClass: 'border-emerald-400/20 hover:bg-emerald-400/10 text-emerald-400',
              features: [
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
