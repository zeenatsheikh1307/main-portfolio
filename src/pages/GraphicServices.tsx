import React, { useState, useEffect, useRef } from "react";
import {
    Palette,
    PenTool,
    Layout,
    Image,
    Layers,
    Star,
    ArrowRight,
    Check,
} from "lucide-react";
import { gsap } from "gsap";
import { motion, useAnimate, stagger } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import { PricingSection } from "@/components/ui/pricing";
import { ReadyToBuild } from "@/components/ui/ready-to-build";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import CoverflowCarousel from "@/components/ui/coverflow-carousel";

import graphic1 from "./assets/assests/graphic1.png";
import graphic2 from "./assets/assests/graphic2.png";
import graphic3 from "./assets/assests/graphic3.png";
import graphic4 from "./assets/assests/graphic4.png";
import graphic5 from "./assets/assests/graphic5.png";
import graphic6 from "./assets/assests/graphic 6.png";
import graphic7 from "./assets/assests/graphic7.png";
import graphic8 from "./assets/assests/graphic8.png";

gsap.registerPlugin(ScrollTrigger);

const workItems = [
    { image: graphic1, category: "BRANDING", title: "Visual Identity" },
    { image: graphic2, category: "SOCIAL", title: "Social Content" },
    { image: graphic3, category: "UI/UX", title: "App Interface" },
    { image: graphic4, category: "PRINT", title: "Marketing Material" },
    { image: graphic5, category: "PACKAGING", title: "Product Packaging" },
    { image: graphic6, category: "ILLUSTRATION", title: "Custom Concept Art" },
    { image: graphic7, category: "LOGOS", title: "Brand Logo System" },
    { image: graphic8, category: "CAMPAIGNS", title: "Digital Campaign" },
];

const floatingImages = [
    { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop", alt: "Brand Identity" },
    { url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=500&fit=crop", alt: "Brochure Design" },
    { url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=500&fit=crop", alt: "UI Design" },
    { url: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=500&fit=crop", alt: "Social Media" },
    { url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=500&fit=crop", alt: "Packaging" },
    { url: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=500&fit=crop", alt: "Illustration" },
    { url: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=500&fit=crop", alt: "Typography" },
    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop", alt: "Logo Design" },
];

const heroPrograms = [
    {
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop",
        category: "BRANDING",
        title: "Brand Identity Design",
    },
    {
        image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=500&fit=crop",
        category: "SOCIAL MEDIA",
        title: "Social Media Graphics",
    },
    {
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=500&fit=crop",
        category: "PRINT",
        title: "Brochure & Flyer Design",
    },
    {
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=500&fit=crop",
        category: "UI/UX",
        title: "UI Design & Mockups",
    },
    {
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=500&fit=crop",
        category: "PACKAGING",
        title: "Product Packaging",
    },
    {
        image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=500&fit=crop",
        category: "ILLUSTRATION",
        title: "Custom Illustrations",
    },
];

const GraphicServices = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.children,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
            );
        }
    }, []);

    useEffect(() => {
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
        <div className="min-h-screen text-foreground font-sans transition-colors duration-300" style={{ background: "#08080f" }}>
            <Navigation />

            {/* Hero Section — Parallax Floating (exact demo layout) */}
            <section
                className="relative w-full flex items-center justify-center overflow-hidden"
                ref={heroRef}
                style={{ background: "#08080f", height: "100vh", paddingTop: "80px" }}
            >
                {/* Background glow matching the reference image */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                    <div className="w-[800px] h-[800px] rounded-full opacity-[0.12] blur-[80px]"
                        style={{ background: "radial-gradient(circle, #3b82f6 0%, #ec4899 50%, transparent 70%)" }} />
                </div>

                {/* Center text - Moved down and Scaled moderately */}
                <motion.div
                    className="z-50 text-center flex flex-col items-center px-4 md:px-6 w-full max-w-5xl mx-auto mt-16 md:mt-24"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.88, delay: 1.5, ease: "easeOut" }}
                >
                    {/* Main heading - Impactful but fitting */}
                    <h1 className="text-[32px] sm:text-[40px] md:text-6xl lg:text-[5.5rem] font-black text-white leading-[1.1] md:leading-[1.05] tracking-tighter mb-6">
                        Designs that make your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">brand </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">unforgettable</span>
                    </h1>

                    <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        Stunning visual identities, social media graphics, and packaging — so your brand stands out in every single medium.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-[15px] hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                        >
                            Start a Project <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                        <a
                            href="#work"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                        >
                            Explore Our Work
                        </a>
                    </div>
                </motion.div>

                {/* Parallax Floating Images — hidden on mobile to avoid overlap */}
                <div className="hidden md:block absolute inset-0 pt-[80px]">
                    <Floating sensitivity={-1} className="overflow-hidden">
                        <FloatingElement depth={0.5} className="top-[15%] left-[12%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
                                src={floatingImages[0].url} alt={floatingImages[0].alt}
                                className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-none transition-transform" data-cursor="VIEW" />
                        </FloatingElement>

                        <FloatingElement depth={1} className="top-[18%] left-[32%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                                src={floatingImages[1].url} alt={floatingImages[1].alt}
                                className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform" />
                        </FloatingElement>

                        <FloatingElement depth={2} className="top-[12%] left-[72%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }}
                                src={floatingImages[2].url} alt={floatingImages[2].alt}
                                className="w-24 h-32 md:w-32 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform" />
                        </FloatingElement>

                        <FloatingElement depth={1} className="top-[8%] left-[93%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
                                src={floatingImages[3].url} alt={floatingImages[3].alt}
                                className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform" />
                        </FloatingElement>

                        {/* Middle elements pushed to edges */}
                        <FloatingElement depth={1.5} className="top-[50%] left-[8%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.75 }}
                                src={floatingImages[4].url} alt={floatingImages[4].alt}
                                className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform" />
                        </FloatingElement>

                        <FloatingElement depth={2} className="top-[55%] left-[92%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}
                                src={floatingImages[7].url} alt={floatingImages[7].alt}
                                className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform" />
                        </FloatingElement>

                        {/* Bottom elements pushed down and corners */}
                        <FloatingElement depth={4} className="top-[85%] left-[15%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.05 }}
                                src={floatingImages[5].url} alt={floatingImages[5].alt}
                                className="w-32 h-48 md:w-44 md:h-64 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform" />
                        </FloatingElement>

                        <FloatingElement depth={1} className="top-[88%] left-[82%]">
                            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }}
                                src={floatingImages[6].url} alt={floatingImages[6].alt}
                                className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform" />
                        </FloatingElement>
                    </Floating>
                </div>
            </section>

            {/* Our Work — 3D Carousel Gallery */}
            <section
                id="work"
                className="px-4 md:px-6 py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden"
            >
                <div className="max-w-7xl mx-auto mb-12">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
                            Our Work
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    </div>
                </div>

                <div className="relative -mt-4 w-full">
                    <CoverflowCarousel
                        items={workItems.map((p, i) => ({
                            id: i,
                            title: p.title,
                            description: "Professional graphic design",
                            image: p.image,
                            category: p.category,
                        }))}
                        options={{ loop: true, align: "center" }}
                        variant="dark"
                        containerHeight="h-[800px]"
                        cardHeight="h-[600px] md:h-[700px]"
                    />
                </div>
            </section>

            {/* Pricing Section */}
            <section className="relative px-4 md:px-6 py-16 md:py-24 overflow-hidden">
                <PricingSection
                    className="text-white w-full"
                    heading="Pricing"
                    description="Professional graphic design services at transparent, flat rates"
                    plans={[
                        {
                            name: "Social Media Posts",
                            info: "Stunning graphics for your social channels",
                            price: { monthly: 0, yearly: 0 },
                            priceFormatted: "₹399 - ₹899",
                            accent: "text-purple-400",
                            buttonVariant: "outline",
                            buttonClass: "border-purple-400/20 hover:bg-purple-400/10 text-purple-400",
                            features: [
                                { text: "Instagram / Facebook posts" },
                                { text: "Story & Reel covers" },
                                { text: "Custom brand colors" },
                                { text: "2 revisions included" },
                                { text: "48-hour delivery" },
                            ],
                            btn: { text: "Get Started", href: "/contact" },
                        },
                        {
                            name: "Posters & Flyers",
                            info: "Brochures, flyers, banners & more",
                            price: { monthly: 0, yearly: 0 },
                            priceFormatted: "₹499 - ₹999",
                            accent: "text-emerald-400",
                            buttonVariant: "outline",
                            buttonClass: "border-emerald-400/20 hover:bg-emerald-400/10 text-emerald-400",
                            features: [
                                { text: "Flyers & brochures" },
                                { text: "Posters & banners" },
                                { text: "Packaging design" },
                                { text: "Print-ready files" },
                                { text: "Multiple formats" },
                            ],
                            btn: { text: "Get Started", href: "/contact" },
                        },
                        {
                            highlighted: true,
                            name: "Logo & Brand Identity",
                            info: "Complete visual identity for your brand",
                            price: { monthly: 0, yearly: 0 },
                            priceFormatted: "₹799 - ₹2499",
                            accent: "text-pink-400",
                            buttonVariant: "default",
                            buttonClass: "bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20",
                            features: [
                                { text: "Logo design (3 concepts)" },
                                { text: "Brand color palette" },
                                { text: "Typography system" },
                                { text: "Business card design" },
                                { text: "Brand guidelines PDF" },
                                { text: "Unlimited revisions" },
                            ],
                            btn: { text: "Get Started", href: "/contact" },
                        },
                    ]}
                />
            </section>

            {/* Ready to Build CTA */}
            <ReadyToBuild />
        </div>
    );
};

export default GraphicServices;
