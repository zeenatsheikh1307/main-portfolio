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
  Search,
  Video,
  Layers,
  Send,
} from "lucide-react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import { PricingSection } from "@/components/ui/pricing";
import { ReadyToBuild } from "@/components/ui/ready-to-build";
import { PulseFitHero } from "@/components/ui/pulse-fit-hero";

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


const services = [
  {
    icon: Film,
    title: "Brand Stories",
    description: "Cinematic documentaries that capture your brand's soul and connect emotionally.",
    accent: "#a855f7",
  },
  {
    icon: Camera,
    title: "Commercial Ads",
    description: "High-impact product films engineered to convert viewers into customers.",
    accent: "#3b82f6",
  },
  {
    icon: Edit,
    title: "Post-Production",
    description: "Professional color grading, sound design, and motion graphics for polished output.",
    accent: "#10b981",
  },
  {
    icon: Music,
    title: "Music Videos",
    description: "Creative visual storytelling paired with rhythmic editing for artists.",
    accent: "#f59e0b",
  },
  {
    icon: Award,
    title: "Corporate Films",
    description: "Refined communication for stakeholders with premium production values.",
    accent: "#ef4444",
  },
  {
    icon: Palette,
    title: "VFX & Animation",
    description: "Bringing the impossible to life with high-end visual effects and 3D modeling.",
    accent: "#06b6d4",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Strategy",
    icon: Search,
    description: "Deep-dive into brand goals and target audience behavior.",
  },
  {
    step: "02",
    title: "Production",
    icon: Video,
    description: "Professional shoot with industry-grade equipment and direction.",
  },
  {
    step: "03",
    title: "Post-Production",
    icon: Layers,
    description: "Precision editing, color grading, and sound design.",
  },
  {
    step: "04",
    title: "Delivery",
    icon: Send,
    description: "Final approval and export in all required platform formats.",
  },
];


const VideoServices = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // GSAP: Process Timeline
    if (processRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1.5,
        }
      });

      // Animate central line growth
      tl.to("#central-progress-line", {
        height: "100%",
        duration: 1,
        ease: "none"
      });

      // Stagger items
      const items = gsap.utils.toArray(".process-item");
      items.forEach((item: any, i) => {
        const watermark = item.querySelector(".process-watermark");
        const node = item.querySelector(".process-node");

        gsap.fromTo(watermark, 
          { opacity: 0, scale: 0.8, y: 50 },
          { 
            opacity: 0.35, scale: 1, y: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 50%",
              scrub: 1
            }
          }
        );

        gsap.to(node, {
          scale: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }

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


  return (
    <div
      className="min-h-screen text-foreground font-sans transition-colors duration-300"
      style={{ background: "#000000" }}
    >
      <Navigation />
      <PulseFitHero
        hideHeader={true}
        title="Create professional videos for your brand"
        subtitle="We craft authentic, high-performing video content that captivates your audience and drives real results. From brand stories to social ads."
        primaryAction={{
          label: "Get Started",
          onClick: () => window.location.href = "/contact",
        }}
        secondaryAction={{
          label: "View Portfolio",
          onClick: () => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) },
        }}
        disclaimer="*Professional Production Within 48 Hours"
        programs={heroPrograms.map((p, idx) => ({
          id: idx,
          image: p.image,
          category: p.category,
          title: p.title,
          description: ""
        }))}
      />


      {/* Specialized Services Grid */}
      <section className="py-20 bg-black relative overflow-hidden" ref={servicesRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
              Specialized Services
            </h2>
            <div className="w-24 h-1 bg-purple-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group"
                whileHover={{ y: -10 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}40` }}
                >
                  <service.icon style={{ color: service.accent }} size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Refined GSAP Timeline */}
      <section 
        id="process-section" 
        ref={processRef}
        className="py-32 bg-black border-t border-white/5 relative overflow-hidden"
      >
        {/* Ambient Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-600/[0.02] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-28">
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-8">
              Workflow
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">
              Our Process
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Central Line with GSAP Growth (Desktop Only) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block">
              <div 
                id="central-progress-line"
                className="absolute left-[-1px] top-0 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-600 origin-top h-0"
              />
            </div>

            <div className="space-y-32">
              {processSteps.map((item, index) => (
                <div 
                  key={item.step} 
                  className={`process-item relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-12`}
                >
                  {/* Content Side */}
                  <div className="w-full md:w-5/12 text-center md:text-left relative z-10">
                    <div className="flex flex-col md:items-start items-center">
                      <span className="text-blue-500 font-mono text-sm mb-4 tracking-widest uppercase">Step {item.step}</span>
                      <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-none">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                        {item.description}
                      </p>
                      
                      <div className="mt-8 flex items-center gap-4 group cursor-pointer lg:hover:gap-6 transition-all">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Learn More</span>
                        <div className="w-12 h-[1px] bg-white/20 group-hover:bg-blue-500 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Node & Watermark Side */}
                  <div className="w-full md:w-5/12 relative h-32 md:h-auto flex items-center justify-center">
                    {/* Massive Background Number - High Visibility Solid Style */}
                    <div 
                      className="process-watermark absolute text-[12rem] md:text-[22rem] font-black italic select-none pointer-events-none z-0 tracking-tighter opacity-0 scale-90"
                      style={{ 
                        color: 'rgba(255,255,255,0.2)',
                        WebkitTextStroke: 'none'
                      }}
                    >
                      {item.step}
                    </div>

                    {/* Central Glowing Node */}
                    <div className="absolute left-1/2 md:hidden block top-[-20px] -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-30" />
                    <div className="w-full h-[1px] md:hidden block bg-gradient-to-r from-transparent via-blue-500/20 to-transparent absolute top-[-10px]" />
                  </div>

                  {/* Central Node (Desktop Only) */}
                  <div className="process-node absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-black border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20 hidden md:block scale-0">
                    <div className="absolute inset-[4px] rounded-full bg-blue-500 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Restored from Web Services Structure */}
      <section
        id="pricing"
        className="relative px-4 md:px-6 py-16 md:py-24 bg-black overflow-hidden"
      >
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
              highlighted: false,
            },
            {
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
              highlighted: true,
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
              highlighted: false,
            },
          ]}
        />
      </section>



      {/* Ready to Build CTA Section */}
      <ReadyToBuild />
    </div>
  );
};

export default VideoServices;
