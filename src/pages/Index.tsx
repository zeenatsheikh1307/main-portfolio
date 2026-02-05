// src/pages/Index.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star as StarIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Navigation from "@/components/Navigation";
import { useLoading } from "@/contexts/LoadingContext";
import TestimonialDemo from "@/pages/TestimonialDemo";

import heroPoster from "./assets/assests/hero bg.png";
import servicesBg from "./assets/assests/service bg.png";
import dynamicBg from "./assets/assests/Dynamic bg.png";

import centerVideo from "./assets/assests/Video.mp4";
import solutionPoster from "./assets/assests/imgi_138_64f6f2c0e3f4c5a91c1e823a%2F67b7b1c276fa500cc47a35a0_Hero_1_circle-poster-00001.jpg";

import websiteImg from "./assets/assests/website.png";
import brandingImg from "./assets/assests/graphics.png";
import socialImg from "./assets/assests/social media.png";
import adsImg from "./assets/assests/ads.png";

// Logo Imports
import globeLogo from "./assets/assests/imgi_13_6751b0f88d7433fd25b4d5b9_globe-blue.svg";
import ai2Logo from "./assets/assests/imgi_34_67b7ae29a34054d481ed86f8_ai2.svg";
import leonardoLogo from "./assets/assests/imgi_36_67b7afe2d51809648db7a00a_leonardo.svg";
import snorkelLogo from "./assets/assests/imgi_37_67b7aff15ddb92f9803e857b_snorkel.svg";
import zohoLogo from "./assets/assests/imgi_38_67b7b01204013240ce111e90_zoho.svg";
import quoraLogo from "./assets/assests/imgi_39_67b7b01b76fa500cc4788094_quora.svg";
import zoomLogo from "./assets/assests/imgi_41_67b7b02c1b74f147051a8243_zoom.svg";
import wordwareLogo from "./assets/assests/imgi_45_67b7b0666959b020059524f4_wordware.svg";
import latitudeLogo from "./assets/assests/imgi_46_67b7b083c401542e937e7344_latitude.svg";
import pikaLogo from "./assets/assests/imgi_47_67b7b08affcaaddc02fdb34e_pika.svg";
import sphereLogo from "./assets/assests/imgi_59_650091497a540a18ebadbb53_sphere.svg";
import { Testimonial } from "@/components/ui/design-testimonial";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Index = () => {
  const { isLoaded } = useLoading();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const floatRef = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ctaSectionRef = useRef<HTMLElement | null>(null);
  const magneticBtnRef = useRef<HTMLButtonElement | null>(null);

  const [highlightMode, setHighlightMode] = useState<"typical" | "dynamic">(
    "typical",
  );

  const enableMotion = () =>
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Highlights intersection
  const highlightsRef = useRef<HTMLElement | null>(null);
  const [highlightsInView, setHighlightsInView] = useState(false);

  useEffect(() => {
    const el = highlightsRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHighlightsInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.18 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ------- Smooth Scrolling ------- */
  useEffect(() => {
    if (!enableMotion() || !wrapperRef.current || !contentRef.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.1,
      effects: true,
      smoothTouch: 0.12,
    });

    return () => smoother?.kill();
  }, []);

  /* ------- Micro Animations ------- */
  useEffect(() => {
    if (!enableMotion() || !isLoaded) return;

    // Floating ambient auras
    floatRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: i % 2 === 0 ? -16 : 16,
        x: i % 2 === 0 ? 10 : -10,
        duration: 3.2 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // HERO reveal + spotlight follow
    if (heroRef.current) {
      // Force ScrollTrigger to recognize the new layout after loader is gone
      ScrollTrigger.refresh();

      gsap.timeline({ delay: 0.1 }).fromTo(
        heroRef.current.querySelectorAll(".hero-el"),
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
        },
      );

      // Hero Marquee Parallax
      gsap.to(".marquee-parallax", {
        x: (i, target) => -(target.scrollWidth / 3), // Move left by one set of words
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2, // Smooth follow-through
        },
      });

      const node = heroRef.current;
      const onMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        node.style.setProperty("--my", `${e.clientY - rect.top}px`);
      };

      if (!("ontouchstart" in window)) {
        node.addEventListener("mousemove", onMove);
        node.addEventListener("mouseleave", () => {
          node.style.setProperty("--mx", "50%");
          node.style.setProperty("--my", "50%");
        });
      }

      return () => {
        node.removeEventListener("mousemove", onMove);
      };
    }
  }, [isLoaded]);

  /* ------- Services animations + image parallax only ------- */
  useEffect(() => {
    if (!enableMotion() || !servicesRef.current) return;

    gsap.fromTo(
      servicesRef.current.querySelectorAll(".service-card"),
      { opacity: 0, y: 42, rotateX: 4 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 78%" },
      },
    );

    const cards =
      servicesRef.current.querySelectorAll<HTMLElement>(".service-card");

    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>(".service-img");
      if (img) gsap.set(img, { x: 0, y: 0 });

      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;

        if (img) {
          gsap.to(img, {
            x: px * 46,
            y: py * 46,
            rotationX: -py * 18,
            rotationY: px * 18,
            scale: 1.12,
            transformPerspective: 900,
            duration: 0.55,
            ease: "power3.out",
          });
        }
      };

      const onLeave = () => {
        if (img) {
          gsap.to(img, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        }
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);

      (card as any).__imgParallaxCleanup = () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      servicesRef.current
        ?.querySelectorAll(".service-card")
        .forEach(
          (c: any) => c.__imgParallaxCleanup && c.__imgParallaxCleanup(),
        );
    };
  }, []);

  /* ------- Stats counters (kept) ------- */
  useEffect(() => {
    if (!enableMotion() || !statsRef.current) return;

    const counters =
      statsRef.current.querySelectorAll<HTMLElement>(".stat-number");
    counters.forEach((c) => {
      const target = Number(c.getAttribute("data-target") || "0");
      const run = () => {
        const d = 1300;
        const step = target / (d / 16);
        let curr = 0;
        const tick = () => {
          curr = Math.min(target, curr + step);
          c.textContent =
            target % 1 ? curr.toFixed(1) : Math.round(curr).toString();
          if (curr < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      ScrollTrigger.create({
        trigger: c,
        start: "top 85%",
        onEnter: run,
        once: true,
      });
    });
  }, []);

  /* ------- Magnetic Button Effect ------- */
  useEffect(() => {
    if (!enableMotion() || !magneticBtnRef.current) return;

    const btn = magneticBtnRef.current;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < 120) {
        gsap.to(btn, {
          x: distanceX * 0.35,
          y: distanceY * 0.35,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ------- CTA Section Entrance Animation ------- */
  useEffect(() => {
    if (!enableMotion() || !ctaSectionRef.current) return;

    const section = ctaSectionRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });

    tl.fromTo(
      section.querySelectorAll(
        ".promise-badge, h2, .cta-footer, .btn-cta-premium-wrap",
      ),
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 1,
        ease: "expo.out",
      },
    );
  }, []);

  /* ----------------- POLISHED CSS (core fix) ----------------- */
  const localCSS = `
    html, body, #root { -webkit-overflow-scrolling: touch; }

    /* Required structure for ScrollSmoother */
    #smooth-wrapper { position: fixed; inset: 0; overflow: hidden; }
    #smooth-content { will-change: transform; }

    :root{
      --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
    }

    .gpu { transform: translateZ(0); will-change: transform; }

    /* Page background + rhythm */
    .page-glass { position: relative; padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right); }
    .page-glass::before {
      content: '';
      position: absolute;
      inset: -6%;
      z-index: -30;
      pointer-events: none;
      background:
        radial-gradient(42rem 22rem at 10% 18%, rgba(67,0,255,0.08), transparent 28%),
        radial-gradient(40rem 22rem at 92% 80%, rgba(255,0,102,0.05), transparent 28%),
        linear-gradient(180deg, rgba(10,10,10,0.72), rgba(0,0,0,0.92));
      filter: blur(18px) saturate(115%);
      opacity: 0.95;
    }

    /* Smooth section spacing across screens (no random gaps) */
    .section-pad-y {
      padding-top: clamp(2rem, 4vw, 4rem);
      padding-bottom: clamp(2rem, 4vw, 4rem);
    }

    /* HERO text helpers */
    .hero-tagline-gradient {
      background: linear-gradient(90deg, #2BC0E4 0%, #5D31D8 48%, #FF8A00 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
    }
    .hero-title-exact { 
      color: #fff; 
      font-weight: 800; 
      letter-spacing: -0.04em; 
      font-family: 'Plus Jakarta Sans', sans-serif;
      text-transform: capitalize;
    }
    .hero-paragraph-exact { 
      color: rgba(255,255,255,0.78); 
      max-width: 62ch; 
      margin-left:auto; 
      margin-right:auto; 
      font-family: 'Outfit', sans-serif;
      font-weight: 400;
    }

    .hero-el { opacity: 0; }

    /* HERO background spotlight (Vibrant & Atmospheric) */
    .hero-spot {
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(900px 500px at var(--mx, 50%) var(--my, 35%), rgba(139, 92, 246, 0.12), transparent 70%),
        radial-gradient(600px 400px at 10% 20%, rgba(43,192,228,0.18), transparent 65%),
        radial-gradient(600px 400px at 90% 80%, rgba(236,72,153,0.15), transparent 65%);
      mix-blend-mode: screen;
      opacity: 0.8;
      transition: opacity 500ms var(--ease-premium);
    }

    /* Marquee (lighter) */
    @keyframes hero-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .hero-scroll-track { display:flex; animation: hero-scroll 120s linear infinite; will-change: transform; gap: 4rem; }
    @media (prefers-reduced-motion: reduce) { .hero-scroll-track { animation: none !important; } }

    /* Pro Hero Button Primary */
    .hero-btn-pro {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.9rem 2.8rem;
      font-weight: 800;
      color: #fff;
      background: conic-gradient(from 180deg at 50% 50%, #2BC0E4 0deg, #4300FF 120deg, #FF0066 240deg, #2BC0E4 360deg);
      background-size: 200% 200%;
      animation: gradient-x 6s infinite alternate;
      border-radius: 9999px;
      transition: all 500ms var(--ease-premium);
      box-shadow: 
        0 10px 30px -5px rgba(79, 70, 229, 0.4),
        0 4px 6px -2px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    .hero-btn-pro:hover {
      transform: translateY(-4px) scale(1.02);
      filter: brightness(1.1);
      box-shadow: 
        0 20px 40px -10px rgba(79, 70, 229, 0.5),
        0 8px 12px -2px rgba(0, 0, 0, 0.1);
    }

    /* Pro Hero Button Secondary */
    .hero-btn-glass {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.9rem 2.8rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      transition: all 400ms var(--ease-premium);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .hero-btn-glass:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      color: #fff;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    }

    /* Services blend: no weird -mt gaps */
    .services-top-fade::before{
      content:'';
      position:absolute; left:0; right:0; top:0;
      height: clamp(3.25rem, 6vw, 6rem);
      pointer-events:none;
      background: linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 100%);
      z-index: 2;
    }

    /* Pro Service Cards Refinement */
    .service-premium-card {
      transition: all 500ms var(--ease-premium);
      transform-style: preserve-3d;
      background: rgba(15, 15, 25, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 1px rgba(255, 255, 255, 0.05);
    }
    .service-premium-card:hover {
      transform: translateY(-12px) scale(1.02);
      background: rgba(25, 25, 35, 0.6);
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8);
    }
    .service-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08) 0%, transparent 65%);
      opacity: 0;
      transition: opacity 400ms ease;
      pointer-events: none;
    }
    .service-premium-card:hover .service-glow {
      opacity: 1;
    }
    .service-img-wrap {
      transition: transform 600ms var(--ease-premium);
      filter: drop-shadow(0 0 20px rgba(0,0,0,0.3));
    }
    .service-premium-card:hover .service-img-wrap {
      transform: scale(1.15) translateY(-8px) translateZ(20px);
    }

    /* Professional Button Styling with Theme-Colored Shadows */
    .btn-view-all {
      background: #ffffff;
      color: #000000;
      padding: 1rem 3.5rem;
      font-size: 1.05rem;
      font-weight: 700;
      border-radius: 999px;
      transition: all 400ms var(--ease-premium);
      /* Multi-colored atmospheric shadow */
      box-shadow: 
        0 12px 24px -8px rgba(59, 130, 246, 0.35), /* blue glow */
        0 12px 24px -8px rgba(236, 72, 153, 0.35), /* pink glow */
        0 8px 16px -4px rgba(0, 0, 0, 0.1);
    }
    .btn-view-all:hover {
      transform: translateY(-4px);
      background: #ffffff;
      box-shadow: 
        0 24px 48px -12px rgba(59, 130, 246, 0.5), 
        0 24px 48px -12px rgba(236, 72, 153, 0.5),
        0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    /* 'Liquid Aura' CTA Button (High-End Glass) */
    .btn-cta-premium {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem 3.5rem;
      font-size: 1.05rem;
      font-weight: 800;
      color: #0b1220;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 9999px;
      transition: all 450ms var(--ease-premium);
      box-shadow: 
        0 15px 35px -12px rgba(0, 0, 0, 0.1),
        0 20px 40px -20px rgba(79, 70, 229, 0.2),
        0 20px 40px -20px rgba(236, 72, 153, 0.2);
      overflow: hidden;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    /* Liquid Gradient Inflow Layer */
    .btn-cta-premium::before {
      content: '';
      position: absolute;
      inset: 0;
      background: conic-gradient(from 180deg at 50% 50%, #2BC0E4 0deg, #4300FF 120deg, #FF0066 240deg, #2BC0E4 360deg);
      background-size: 200% 200%;
      animation: gradient-x 6s infinite alternate;
      opacity: 0;
      transform: translateY(100%);
      transition: all 600ms var(--ease-premium);
      z-index: 1;
    }

    .btn-cta-premium span,
    .btn-cta-premium svg {
      position: relative;
      z-index: 2;
      transition: color 400ms ease;
    }

    .btn-cta-premium:hover {
      transform: translateY(-5px) scale(1.05);
      border-color: rgba(255, 255, 255, 0.5);
      color: #fff;
      box-shadow: 
        0 30px 60px -15px rgba(79, 70, 229, 0.45),
        0 30px 60px -15px rgba(236, 72, 153, 0.45);
    }
    
    .btn-cta-premium:hover::before {
      opacity: 1;
      transform: translateY(0);
    }

    .promise-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1.4rem;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 9999px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: all 400ms var(--ease-premium);
    }
    
    .promise-badge:hover {
      transform: translateY(-2px);
      background: #fff;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
      border-color: rgba(79, 70, 229, 0.2);
    }

    .promise-dot-outer {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
    }
    
    .promise-dot-inner {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: linear-gradient(135deg, #2BC0E4, #EC4899);
    }
    
    .promise-dot-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid rgba(79, 70, 229, 0.4);
      animation: badge-pulse 2s infinite;
    }

    @keyframes badge-pulse {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(2.2); opacity: 0; }
    }

    /* Atmospheric Background */
    .cta-mesh {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.04) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.04) 0%, transparent 40%);
      pointer-events: none;
    }
    
    .cta-grid {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
      pointer-events: none;
      opacity: 0.5;
    }

    @keyframes gradient-x { 0%{ background-position: 0% 50%; } 100%{ background-position: 100% 50%; } }
    @keyframes twinkle { 0%,100%{opacity:.45} 50%{opacity:.9} }

    @media (prefers-reduced-motion: reduce) {
      * { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
    }
  `;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <style>{localCSS}</style>

      <Navigation />

      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <div className="page-glass relative z-0">
            {/* HERO */}
            <section
              ref={heroRef}
              aria-label="Hero"
              className="
                relative isolate
                flex flex-col items-center justify-center text-center
                px-4 sm:px-6 lg:px-8
                pt-[clamp(14rem,28vh,20rem)]
                pb-[clamp(6rem,12vh,9rem)]
                min-h-[105vh]
                bg-no-repeat bg-cover bg-center
                gpu
              "
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)), url(${heroPoster})`,
              }}
            >
              {/* spotlight */}
              <div className="hero-spot" />

              {/* subtle texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
                }}
              />

              {/* marquee (Enhanced Visibility: Fill + Stroke Mix) */}
              <div
                className="absolute inset-x-0 top-[16%] sm:top-[20%] pointer-events-none z-0 overflow-hidden opacity-[0.22] select-none"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                }}
              >
                <div className="hero-scroll-track marquee-parallax select-none whitespace-nowrap py-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="inline-flex items-center">
                      <span
                        className="font-black text-[6.5rem] sm:text-[9.5rem] lg:text-[14rem] leading-none shrink-0 inline-block text-white"
                        style={{
                          opacity: 0.12,
                          marginRight: "4rem",
                          letterSpacing: "-0.01em",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          textTransform: "uppercase",
                        }}
                      >
                        CREATE
                      </span>
                      <span
                        className="font-black text-[6.5rem] sm:text-[9.5rem] lg:text-[14rem] leading-none shrink-0 inline-block"
                        style={{
                          color: "transparent",
                          WebkitTextStroke: "2px rgba(255,255,255,0.4)",
                          marginRight: "4rem",
                          letterSpacing: "-0.01em",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          textTransform: "uppercase",
                        }}
                      >
                        BUILD
                      </span>
                      <span
                        className="font-black text-[6.5rem] sm:text-[9.5rem] lg:text-[14rem] leading-none shrink-0 inline-block text-white"
                        style={{
                          opacity: 0.12,
                          marginRight: "4rem",
                          letterSpacing: "-0.01em",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          textTransform: "uppercase",
                        }}
                      >
                        GROW
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto">
                <span className="hero-el hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm md:text-base font-medium mb-6 hero-tagline-gradient"></span>

                <h1
                  className="hero-el hero-title-exact tracking-tight mb-4 sm:mb-6 text-white text-[clamp(2.6rem,6.2vw,5.25rem)] leading-[1.03]"
                  style={{ textShadow: "0 10px 30px rgba(2,6,23,0.6)" }}
                >
                  <span className="block">Build, launch & grow</span>
                  <span className="block">your digital brand.</span>
                </h1>

                <p className="hero-el hero-paragraph-exact text-base md:text-lg lg:text-xl mb-8 md:mb-10 mx-auto leading-relaxed max-w-2xl text-white/75">
                  MetaBull Universe designs clean websites, strong visual
                  identities and performance-led campaigns. One team to make
                  your brand look premium, sound clear and show up everywhere
                  that matters.
                </p>

                <div className="hero-el flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                  <Link to="/about-us">
                    <button className="hero-btn-pro group">
                      Contact Us
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="hero-btn-glass group">
                      Talk to Team
                      <span className="ml-2 opacity-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* hero bottom fade -> services blend */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-[1]" />
            </section>

            {/* BRANDING MARQUEE */}
            <div className="w-full bg-black h-16 py-0 overflow-hidden relative z-20 border-y border-white/10 select-none">
              <div className="hero-scroll-track whitespace-nowrap flex items-center h-full">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-32 mx-16 shrink-0 min-w-max">
                    {[
                      zohoLogo,
                      zoomLogo,
                      quoraLogo,
                      leonardoLogo,
                      pikaLogo,
                      snorkelLogo,
                      wordwareLogo,
                      latitudeLogo,
                      ai2Logo,
                    ].map((logo, idx) => (
                      <img
                        key={`${i}-${idx}`}
                        src={logo}
                        alt="Partner Logo"
                        className="h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-125 cursor-pointer"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES SECTION */}
            <section
              ref={servicesRef}
              aria-label="Services"
              className="
                relative overflow-hidden
                px-4 sm:px-6 lg:px-8
                py-[clamp(6rem,12vh,10rem)]
                services-top-fade
              "
              style={{
                backgroundImage: `url(${servicesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
              }}
            >
              <div className="container mx-auto max-w-[1440px] relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full hero-btn-glass text-xs font-bold uppercase tracking-wider mb-6">
                      Our Expertise
                    </div>
                    <h2 className="text-[clamp(2.5rem,5vw,3.75rem)] font-black text-white leading-[1.1] tracking-tight">
                      We build things that <br />
                      <span className="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#2BC0E4_0deg,#4300FF_120deg,#FF0066_240deg,#2BC0E4_360deg)] [background-size:200%_200%] animate-[gradient-x_6s_infinite_alternate]">
                        move the needle.
                      </span>
                    </h2>
                  </div>
                  <p className="text-white/90 text-base md:text-lg max-w-sm font-medium leading-relaxed">
                    Strategy-led design and engineering for brands that want to
                    lead their industry.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                  {[
                    {
                      tag: "01",
                      title: "Strategic Marketing",
                      text: "ROI-focused performance marketing campaigns.",
                      img: websiteImg,
                    },
                    {
                      tag: "02",
                      title: "Video Production",
                      text: "High-impact video content for brands that want to stand out.",
                      img: socialImg,
                    },
                    {
                      tag: "03",
                      title: "Web Platforms",
                      text: "High-performance, scalable web ecosystems.",
                      img: adsImg,
                    },
                    {
                      tag: "04",
                      title: "Social Media Management",
                      text: "Strategic visual identities that tell your story.",
                      img: brandingImg,
                    },
                  ].map((c, idx) => (
                    <div
                      key={idx}
                      className="group relative service-premium-card rounded-[24px] overflow-hidden flex flex-col p-8 h-[26rem] md:h-[29rem]"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        e.currentTarget.style.setProperty(
                          "--mouse-x",
                          `${x}px`,
                        );
                        e.currentTarget.style.setProperty(
                          "--mouse-y",
                          `${y}px`,
                        );
                      }}
                    >
                      <div className="service-glow" />

                      <div className="relative z-10 flex justify-between items-start mb-8">
                        <span className="text-[11px] font-black text-white/30 tracking-widest">
                          {c.tag}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                          <span className="text-white group-hover:text-black transition-colors">
                            →
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3">
                          {c.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed font-medium group-hover:text-white transition-opacity duration-300">
                          {c.text}
                        </p>
                      </div>

                      <div className="service-img-wrap flex-1 flex items-center justify-center mt-6">
                        <img
                          src={c.img}
                          alt={c.title}
                          className="w-4/5 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 md:mt-20 text-center">
                  <Link to="/services">
                    <button className="btn-view-all group">
                      Explore All Services
                      <span className="ml-3 group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </section>

            {/* HIGHLIGHTS */}
            <section
              ref={highlightsRef}
              aria-label="Highlights"
              className="px-4 sm:px-6 lg:px-8 section-pad-y relative overflow-hidden text-slate-900"
              style={{
                backgroundColor: "#ffffff",
                backgroundImage: `url(${dynamicBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow: "none",
                border: "none",
              }}
            >
              <div className="absolute bottom-0 left-0 w-full h-36 md:h-52 lg:h-64 pointer-events-none bg-gradient-to-t from-white via-white/90 to-transparent z-0" />

              <div className="container mx-auto max-w-7xl relative z-10">
                {/* <div className="relative text-center mb-10 md:mb-14">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-sm font-medium shadow-lg bg-white border border-white/60">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full p-0.5 bg-[linear-gradient(135deg,#2BC0E4, #4300FF, #FF0066)]">
                      <span className="w-3.5 h-3.5 rounded-full bg-white inline-flex items-center justify-center">
                        <StarIcon className="w-3 h-3 text-[#6b21a8]" />
                      </span>
                    </span>
                    <span className="hero-tagline-gradient whitespace-nowrap">
                      High-Touch Precision
                    </span>
                  </div>
                </div> */}

                <div className="text-center mb-8 md:mb-10">
                  <h2 className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold mb-4 text-slate-900 leading-tight">
                    Why teams trust MetaBull Universe
                    <br />
                    <span className="hero-tagline-gradient">
                      clarity, consistency & continuous support
                    </span>
                  </h2>
                  <p className="max-w-3xl mx-auto text-slate-600 mt-4">
                    We work as an extension of your team — ensuring smooth communication, clear execution, and reliable delivery at every stage.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 lg:gap-8 items-start mt-8">
                  {[
                    {
                      title: "Clear Communication",
                      desc: "No confusion. No guesswork. We keep everything transparent — from planning to delivery. You always know what’s happening, what’s next, and why it matters for your business.",
                    },
                    {
                      title: "Consistent Quality",
                      desc: "Every task, update, and delivery follows the same high standard. We focus on details, timelines, and finishing — nothing rushed, nothing half-done, ever.",
                    },
                    {
                      title: "Reliable Partnership",
                      desc: "We don’t disappear after delivery. We work as a long-term partner, supporting, improving, and growing your business as it evolves.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-transparent rounded-2xl shadow-lg p-5 md:p-8 relative overflow-hidden min-h-[12rem] md:min-h-[22rem] backdrop-blur-sm border border-white/10"
                    >
                      <h3 className="text-[15px] md:text-xl font-semibold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[13px] md:text-base text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY (white section) */}
            <section
              aria-label="Why EternaCloud"
              className="px-4 sm:px-6 lg:px-8 section-pad-y relative overflow-hidden text-slate-900"
              style={{ background: "#ffffff" }}
            >
              <div className="absolute bottom-0 left-0 w-full h-36 md:h-52 lg:h-64 pointer-events-none bg-gradient-to-t from-white via-white/90 to-transparent z-0" />

              <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-10 md:mb-14">
                  <h2 className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold mb-3">
                    Stop struggling with scattered digital efforts.
                    <br />
                    <span className="hero-tagline-gradient">
                      Enjoy clarity, consistency & real growth.
                    </span>
                  </h2>
                  <p className="max-w-3xl mx-auto text-slate-600 mt-3">
                    We bring structure to your online presence — so your
                    website, branding, content and marketing work together
                    instead of fighting each other.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 md:col-span-1">
                    {[
                      "Weak or outdated online presence hurts trust.",
                      "Social media content is random, inconsistent and off-brand.",
                      "Ads feel expensive and confusing, without clear results.",
                      "Different vendors handle different pieces — everything feels scattered.",
                      "Too many small digital tasks slow down your actual business growth.",
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="rounded-2xl p-4 bg-white border border-slate-100 shadow-sm text-sm text-slate-700"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/90 border border-slate-100 text-slate-400 flex items-center justify-center text-xs">
                            x
                          </div>
                          <div>{t}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center md:col-span-1">
                    <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                      <div
                        className="absolute inset-0"
                        style={{
                          borderRadius: 16,
                          background:
                            "radial-gradient(40% 40% at 50% 50%, rgba(98, 12, 255, 0.08), rgba(255,165,0,0.05) 60%)",
                        }}
                      />
                      <video
                        className="w-full h-full object-cover object-center transform scale-110 gpu"
                        src={centerVideo}
                        poster={solutionPoster}
                        preload="metadata"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-1">
                    {[
                      "Strong, modern & conversion-focused digital presence across all touchpoints.",
                      "Consistent social media content built around your brand story and goals.",
                      "ROI-driven campaigns that focus on leads and customers, not just impressions.",
                      "All your digital work handled under one roof with one clear point of contact.",
                      "Clear communication, planned calendars and transparent performance tracking.",
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="rounded-2xl p-4 bg-white border border-slate-100 shadow-sm text-sm text-slate-700"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                            ✓
                          </div>
                          <div>{t}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <Testimonial />

            {/* CTA */}
            <section
              ref={ctaSectionRef}
              aria-label="Call to Action"
              className="px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center bg-white relative overflow-hidden"
            >
              {/* Decorative Background Elements */}
              <div className="cta-mesh" />
              <div className="cta-grid" />

              {/* Tighter background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/30 rounded-full blur-[100px] pointer-events-none" />

              <div className="container mx-auto max-w-4xl relative z-10">
                <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black mb-10 leading-[1.02] tracking-tighter text-slate-900">
                  One{" "}
                  <span className="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#2BC0E4_0deg,#4300FF_120deg,#FF0066_240deg,#2BC0E4_360deg)] [background-size:200%_200%] animate-[gradient-x_6s_infinite_alternate]">
                    partnership
                  </span>
                  <span className="block italic font-serif font-light text-slate-800/80 mt-1">
                    makes things easy.
                  </span>
                </h2>

                <div className="flex flex-col items-center gap-6">
                  <Link
                    to="/about-us"
                    aria-label="About Us"
                    className="btn-cta-premium-wrap"
                  >
                    <button
                      ref={magneticBtnRef}
                      className="btn-cta-premium group origin-center"
                    >
                      <span className="relative z-10">Explore Our Journey</span>
                      <svg
                        className="ml-4 w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-500 ease-out"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </Link>

                  <p className="text-slate-400 text-[9px] md:text-xs font-bold tracking-[0.25em] uppercase mt-4">
                    Trusted by modern innovators worldwide
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
