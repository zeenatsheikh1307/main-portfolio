// src/pages/Index.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Play,
  Zap,
  Rocket,
  Calendar,
  Star as StarIcon,
  LineChart,
  Globe,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navigation from "@/components/Navigation";
import heroPoster from "./assets/assests/hero bg.png";
import servicesBg from "./assets/assests/service bg.png";
import waveBg from "./assets/assests/wave bg.png";
import dynamicBg from "./assets/assests/Dynamic bg.png";
import centerVideo from "./assets/assests/Video.mp4";
import solutionPoster from "./assets/assests/imgi_138_64f6f2c0e3f4c5a91c1e823a%2F67b7b1c276fa500cc47a35a0_Hero_1_circle-poster-00001.jpg";
import websiteImg from "./assets/assests/website.png";
import brandingImg from "./assets/assests/graphics.png";
import socialImg from "./assets/assests/social media.png";
import adsImg from "./assets/assests/ads.png";

// Logos (keep your paths)
// (Client logos removed) - imports were removed since the Client Logos section was deleted

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* ----------------- Small UI helpers ----------------- */
function Dot({ className = "" }: { className?: string }) {
  return <div className={`w-2 h-2 rounded-full animate-pulse ${className}`} />;
}
function SparkleDot() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-white/80"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2l1.7 4.7L18 8l-4.3 1.3L12 14l-1.7-4.7L6 8l4.3-1.3L12 2zm7 9l.9 2.5L22 14l-2.1.5L19 17l-.9-2.5L16 14l2.1-.5L19 11zM4 11l.9 2.5L7 14l-2.1.5L4 17l-.9-2.5L1 14l2.1-.5L4 11z"
      />
    </svg>
  );
}
function IconWrap({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  // Gradient pill used across services & portfolio
  // size: 'md' is default, 'lg' used for larger portfolio icons
  const innerSizeClass =
    size === "lg" ? "h-16 w-16" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const paddingClass =
    size === "lg" ? "p-3" : size === "sm" ? "p-1" : "p-1.5";

  return (
    <span className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur px-3 py-2 shadow-sm">
      <span
        className={`inline-flex ${innerSizeClass} items-center justify-center rounded-lg bg-[conic-gradient(from_180deg_at_50%_50%,#2BC0E4_0deg,#4300FF_120deg,#FF0066_240deg,#2BC0E4_360deg)]`}
      >
        <span className={`rounded-md bg-black/60 ${paddingClass} text-white`}>
          {children}
        </span>
      </span>
    </span>
  );
}

const Index = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const floatRef = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [highlightMode, setHighlightMode] = useState<"typical" | "dynamic">(
    "typical"
  );

  // Button active/inactive classes for both modes (used to match reference visuals)
  const leftActive = highlightMode === "typical";
  const rightActive = highlightMode === "dynamic";
  const leftBase =
    "highlight-btn transition-colors duration-200 focus:outline-none inline-flex items-center justify-center gap-2";
  const rightBase = leftBase;
  const leftActiveClass = leftBase + " highlight-btn--left active";
  const leftInactiveInDynamic =
    leftBase + " highlight-btn--inactive gradient-text";
  const leftInactiveInTypical =
    leftBase + " highlight-btn--inactive white-fade";
  const rightActiveClass = rightBase + " highlight-btn--right active";
  const rightInactiveInTypical =
    rightBase + " highlight-btn--inactive white-fade";
  const rightInactiveInDynamic =
    rightBase + " highlight-btn--inactive dark-fade";
  const leftClassName = leftActive
    ? leftActiveClass
    : highlightMode === "dynamic"
      ? leftInactiveInDynamic
      : leftInactiveInTypical;
  const rightClassName = rightActive
    ? rightActiveClass
    : highlightMode === "typical"
      ? rightInactiveInTypical
      : rightInactiveInDynamic;

  const enableMotion = () =>
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Highlights: when the section scrolls into view, reveal list items sequentially
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
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ------- Smooth Scrolling (GSAP ScrollSmoother) ------- */
  useEffect(() => {
    if (!enableMotion() || !wrapperRef.current || !contentRef.current) return;
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.15,
    });
    return () => smoother?.kill();
  }, []);

  /* ------- Micro Animations ------- */
  useEffect(() => {
    if (!enableMotion()) return;

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

    // HERO reveal + spotlight follow (mouse only)
    if (heroRef.current) {
      gsap
        .timeline()
        .fromTo(
          heroRef.current.querySelectorAll(".hero-el"),
          { opacity: 0, y: 36, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          }
        );

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
  }, []);

  useEffect(() => {
    if (!enableMotion() || !servicesRef.current) return;

    // Services cards: reveal
    gsap.fromTo(
      servicesRef.current.querySelectorAll(".service-card"),
      { opacity: 0, y: 56, rotateX: 5 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 78%" },
      }
    );

    const cards =
      servicesRef.current.querySelectorAll<HTMLElement>(".service-card");

    // ✅ Only image mouse-follow parallax (card stays static)
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
            x: px * 60,
            y: py * 60,
            rotationX: -py * 25, // Increased tilt
            rotationY: px * 25,
            scale: 1.2,
            transformPerspective: 1000, // Essential for 3D effect
            duration: 0.8,
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
            duration: 0.8,
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
        .forEach((c: any) => c.__imgParallaxCleanup && c.__imgParallaxCleanup());
    };
  }, []);

  useEffect(() => {
    if (!enableMotion() || !statsRef.current) return;

    // Animated counters on enter
    const counters =
      statsRef.current.querySelectorAll<HTMLElement>(".stat-number");
    counters.forEach((c) => {
      const target = Number(c.getAttribute("data-target") || "0");
      const run = () => {
        const d = 1400;
        const step = target / (d / 16);
        let curr = 0;
        const tick = () => {
          curr = Math.min(target, curr + step);
          c.textContent = target % 1 ? curr.toFixed(1) : Math.round(curr).toString();
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

  // Testimonials: reveal + subtle tilt (similar to services)
  useEffect(() => {
    if (!enableMotion() || !testimonialsRef.current) return;

    gsap.fromTo(
      testimonialsRef.current.querySelectorAll(".testimonial-card"),
      { opacity: 0, y: 36, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: testimonialsRef.current, start: "top 80%" },
      }
    );

    const cards =
      testimonialsRef.current.querySelectorAll<HTMLElement>(".testimonial-card");
    cards.forEach((card) => {
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotationY: px * 4,
          rotationX: -py * 4,
          transformPerspective: 900,
          duration: 0.25,
          ease: "power2.out",
        });
      };
      const onLeave = () =>
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.45,
          ease: "power3.out",
        });

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      (card as any).__tilt = () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      testimonialsRef.current
        ?.querySelectorAll(".testimonial-card")
        .forEach((c: any) => c.__tilt && c.__tilt());
    };
  }, []);

  // Remove native smooth-scroll (conflicts with ScrollSmoother)
  // + add GPU acceleration helper class
  const localCSS = `
    html, body, #root { -webkit-overflow-scrolling: touch; }

  @keyframes logo-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes hero-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes gradient-x { 0%{ background-position: 0% 50%; } 100%{ background-position: 100% 50%; } }
  /* slightly faster marquee so logos read well */
  .hero-scroll-track { display: flex; animation: hero-scroll 60s linear infinite; will-change: transform; gap: 4rem; }
  .logo-track { animation: logo-marquee 22s linear infinite; will-change: transform; }
  .logo-wrap:hover .logo-track { animation-play-state: paused; }
  .logo-track > span { display: inline-flex; align-items: center; justify-content: center; }
  .logo-track img { transition: opacity .25s ease, filter .25s ease, transform .25s ease; opacity: .9; filter: grayscale(1) contrast(.95); }
  .logo-track img:hover { opacity: 1; filter: grayscale(0) contrast(1); transform: translateY(-2px); }
    @media (prefers-reduced-motion: reduce) {
      .logo-track { animation: none !important; transform: translateX(0) !important; }
    }

    .gpu { transform: translateZ(0); will-change: transform; }

    /* Liquid glass page wrapper (lighter blur for performance) */
    .page-glass { position: relative; padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right); }
    .page-glass::before {
      content: '';
      position: absolute;
      inset: -6%;
      z-index: -30;
      pointer-events: none;
      background:
        radial-gradient(40rem 20rem at 10% 20%, rgba(67,0,255,0.07), transparent 20%),
        radial-gradient(36rem 18rem at 90% 80%, rgba(255,0,102,0.04), transparent 20%),
        linear-gradient(180deg, rgba(10,10,10,0.7), rgba(0,0,0,0.9));
      filter: blur(20px) saturate(110%);
      border-radius: 0px; /* make the background overlay square so inner white sections can merge with no rounding */
      opacity: 0.9;
    }

    .page-glass > section {
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      backdrop-filter: blur(8px) saturate(120%);
      -webkit-backdrop-filter: blur(8px) saturate(120%);
      border: 1px solid rgba(255,255,255,0.04);
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(2,6,23,0.55);
      margin-bottom: 2rem;
    }
    .page-glass > section[aria-label="Hero"] { border-radius: 20px; }

    /* Merge Hero and Services visually: remove border, shadow and spacing
       between Hero and Services sections so they appear as a continuous layout */
    .page-glass > section[aria-label="Hero"] {
      /* remove bottom radius & spacing on hero so it visually connects to services */
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      margin-bottom: 0px;
      /* remove seam shadow/border so hero blends with services */
      box-shadow: none;
      border: none;
    }
    .page-glass > section[aria-label="Services"] {
      /* remove the boxed effect for services so it blends into hero
         keep the background image (the inline background style on the element) */
      border-radius: 0px;
      border: none;
      box-shadow: none;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      margin-top: 0px;
      margin-bottom: 0px;
      position: relative; /* ensure overlay pseudo-element positions correctly */
    }

    /* subtle dark gradient at the top of Services to visually merge with Hero */
    .page-glass > section[aria-label="Services"]::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 8rem;
      pointer-events: none;
      background: linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 100%);
      z-index: 5; /* sits above background but below section content (section content uses higher z-index) */
    }
    @media (max-width: 640px) {
      .page-glass > section[aria-label="Services"]::before { height: 4.5rem; }
    }
    /* Make Why EternaCloud blend with adjacent sections: remove box effect */
    .page-glass > section[aria-label="Why EternaCloud"],
    .page-glass > section[aria-label="Highlights"],
    .page-glass > section[aria-label="EternaCloud Card"] {
      border-radius: 0px;
      border: none;
      box-shadow: none;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      margin-top: 0px;
      margin-bottom: 0px;
    }
    /* removed heavy overlay and hero/back fade to display original background image */

     /* Default hero background position is center to prevent inadvertent bottom-cropping
       on narrow/tall screens. For medium+ screens we prefer top to match the original
       visual composition. */
      /* Default hero: scale to full image height on narrow devices to avoid cropping (auto height)
        and align bottom so the lower parts of the image remain visible. On larger screens we
        switch to cover to preserve visual composition. */
      .page-glass > section[aria-label="Hero"] { background-position: center bottom; background-size: auto 100%; min-height: 100vh; position: relative; }
      @media (min-width: 768px) { .page-glass > section[aria-label="Hero"] { background-position: top; background-size: cover; min-height: 120vh; } }

      /* bottom fade on hero to blend into next section */
      .page-glass > section[aria-label="Hero"]::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 10rem;
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.9) 100%);
        z-index: 6;
      }
      @media (max-width: 640px) { .page-glass > section[aria-label="Hero"]::after { height: 5rem; } }

    .hairline {
      mask-image: radial-gradient(60% 60% at 50% 50%, #000 20%, transparent 70%);
    }

    /* Required structure for ScrollSmoother */
    #smooth-wrapper { position: fixed; inset: 0; overflow: hidden; }
    #smooth-content { will-change: transform; }

    /* Hero text helpers for exact visual match */
    .hero-tagline-gradient {
      /* Exact-match gradient used for the hero CTA headline (blue -> purple -> orange)
         tuned to sit visually centred on 'One partnership' */
      background: linear-gradient(90deg, #2BC0E4 0%, #5D31D8 48%, #FF8A00 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight:600;
    }
    .hero-title-exact { color: #fff; font-weight:900; letter-spacing: -0.02em; }
    .hero-paragraph-exact { color: rgba(255,255,255,0.78); max-width: 60ch; margin-left:auto; margin-right:auto; }

    /* CTA & Tagline exact-match styles */
    .cta-hero { color: #0b1220; }
    .cta-pill { background: #ffffff; color: #0b1220; box-shadow: 0 8px 30px rgba(12,17,32,0.06); }
    .cta-pill .pill-dot { background: linear-gradient(135deg, #2BC0E4 0%, #6C3AC9 45%, #FF8A00 100%); display:inline-block; width: 19px; height: 19px; border-radius: 999px; padding: 3px; }
    .cta-button { background: linear-gradient(90deg, #2BC0E4 0%, #6C3AC9 48%, #FF8A00 100%); box-shadow: 0 8px 18px rgba(67, 0, 255, 0.14), 0 2px 6px rgba(0,0,0,0.08); }
    .cta-button:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(67, 0, 255, 0.18), 0 4px 10px rgba(0,0,0,0.08);}    
    /* Highlight mode pill (exact-match styling) */
    .highlight-pill { display:inline-block; padding: 3px; border-radius: 999px; background: linear-gradient(90deg, #2BC0E4 0%, #6C3AC9 48%, #FF8A00 100%); box-shadow: 0 8px 28px rgba(67, 0, 255, 0.08); }
    .highlight-inner { display:inline-flex; align-items:center; gap:6px; padding: 4px; border-radius: 999px; transition: background-color 220ms ease, color 220ms ease, box-shadow 220ms ease; }
    @media (max-width: 768px) {
      .highlight-inner { display:flex; flex-direction:column; width: 100%; gap:4px; }
      .highlight-pill { width: 100%; }
    }
    .highlight-inner.dark { background: #0b1220; box-shadow: inset 0 -6px 10px rgba(2,6,23,0.5); }
    .highlight-inner.light { background: #ffffff; border: 1px solid rgba(99, 76, 255, 0.08); box-shadow: 0 2px 6px rgba(2,6,23,0.06); }
    .highlight-btn { --btn-h: 36px; display:inline-flex; align-items:center; justify-content:center; height:var(--btn-h); padding: 0 18px; border-radius: 999px; font-weight:700; font-size: 14px; line-height: 1; white-space:nowrap; min-width: 128px; transition: background-color 160ms ease, color 160ms ease, transform 160ms ease; background: transparent; }
    @media (max-width: 768px) {
      .highlight-btn { width: 100%; min-width: auto; font-size: 13px; }
    }
    .highlight-btn:hover { transform: translateY(-2px); }
    .highlight-btn--left.active { background: #0b1220; color: #ffffff; box-shadow: inset 0 -6px 18px rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.06); }
    .highlight-btn--right.active { background: #ffffff; color: #0b1220; box-shadow: inset 0 -3px 10px rgba(2,6,23,0.06); border-radius: 999px; border: 1px solid rgba(99,76,255,0.06); }
    .highlight-btn--inactive.gradient-text { background: linear-gradient(90deg, #6C3AC9 0%, #2BC0E4 48%, #FF8A00 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .highlight-btn--inactive.white-fade { color: rgba(255,255,255,0.72); }
    .highlight-btn--inactive.dark-fade { color: rgba(15, 23, 42, 0.82); }
    .highlight-dot { width:11px; height:11px; border-radius:999px; display:inline-block; margin-right:10px; background: linear-gradient(135deg,#2BC0E4,#6C3AC9,#FF8A00); box-shadow: 0 2px 6px rgba(32,0,80,0.35); position: relative; }
    .highlight-dot::after { content: ''; position: absolute; inset: 0; margin: auto; width: 5px; height: 5px; border-radius:999px; background: #fff; top: 50%; left: 50%; transform: translate(-50%, -50%); }

    /* Merge CTA with previous section (EternaCloud Card) */
    .card-merge { position: relative; overflow: visible; }
    .card-merge.card-merge--on-dark::after { /* white rounded overlay that extends below the dark card */
      content: '';
      position: absolute;
      left: 3.25rem;
      right: 3.25rem;
      bottom: -28px;
      height: 56px;
      border-radius: 999px;
      background: #ffffff;
      box-shadow: 0 8px 28px rgba(2,6,23,0.06);
      pointer-events: none;
      z-index: 2;
    }
    .section-merge { position: relative; z-index: 4; }
    .section-merge.section-merge--on-dark { margin-top: -26px; padding-top: 26px; }
    /* Small screens: soften margins */
    @media (max-width: 640px) {
      .card-merge.card-merge--on-dark::after { left: 1.25rem; right: 1.25rem; bottom: -18px; height: 36px; }
      .section-merge.section-merge--on-dark { margin-top: -18px; padding-top: 20px; }
    }
  `;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <style>{localCSS}</style>

      <Navigation />

      {/* ScrollSmoother wrapper/content */}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <div className="page-glass relative z-0">
            {/* HERO */}
            <section
              ref={heroRef}
              className="relative flex flex-col items-center justify-center text-center pt-16 sm:pt-16 md:pt-28 pb-8 md:pb-20 gpu min-h-[110vh] md:min-h-[140vh] bg-center sm:bg-top bg-no-repeat"
              style={{
                /* We rely on Tailwind classes for size & position, keep the gradient overlay from inline style + background image URL here. */
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroPoster})`,
              }}
              aria-label="Hero"
            >
              {/* Subtle texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
                }}
              />

              {/* Scrolling Text "CREATE BUILD GROW" */}
              <div className="absolute inset-x-0 top-[10%] sm:top-[12%] flex pointer-events-none z-0 overflow-hidden opacity-[0.08]">
                <div className="hero-scroll-track select-none whitespace-nowrap py-4">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="font-black text-[5rem] sm:text-[7rem] lg:text-[9rem] leading-none tracking-tighter shrink-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, #2BC0E4 0%, #5D31D8 50%, #FF8A00 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        filter: "blur(2px)",
                        marginRight: "4rem",
                      }}
                    >
                      CREATE &nbsp; BUILD &nbsp; GROW
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <span className="hero-el hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm md:text-base font-medium mb-6 sm:mb-8 hero-tagline-gradient">
                  Digital Growth • Branding • Website Development • Marketing
                </span>

                <h1
                  className="hero-el hero-title-exact tracking-tight mb-4 sm:mb-6 text-white text-[clamp(2.75rem,6.5vw,4.75rem)] lg:text-[5.5rem] leading-tight"
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
              </div>

              {/* Scroll hint removed per request */}
            </section>

            {/* CLIENTS removed as requested */}

            {/* SERVICES */}
            <section
              ref={servicesRef}
              className="px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24 -mt-16 md:-mt-24 relative overflow-hidden flex flex-col md:justify-center md:min-h-[120vh]"
              aria-label="Services"
              style={{
                backgroundImage: `url(${servicesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* grid overlay removed */}
              <div className="container mx-auto max-w-7xl relative z-20">
                <style>{`
                  .card-cta{
                    display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:9999px;padding:.625rem 1.5rem;font-weight:600;letter-spacing:0.01em;
                    background:linear-gradient(90deg,#8b5cf6 0%,#6C63FF 50%,#3B82F6 100%);color:#fff;box-shadow:0 10px 30px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.12);
                    transition: transform .28s cubic-bezier(.2,.8,.2,1), box-shadow .24s ease, opacity .2s;
                  }
                  .card-cta:hover{ transform: translateY(-3px); box-shadow:0 14px 40px rgba(59,130,246,0.16); }
                  .card-cta:focus{ outline:none; box-shadow:0 0 0 6px rgba(99,102,241,0.10); }
                `}</style>
                <div className="text-center mb-12 md:mb-16 py-12 md:py-20 flex flex-col items-center justify-center">
                  <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold text-white leading-tight max-w-3xl">
                    Your business needs.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61dafb] via-[#8b5cf6] to-[#ff7a59]">
                      Our complete digital services.
                    </span>
                  </h2>
                  <p className="text-sm md:text-base text-white/60 mt-3">
                    Everything you need to build a solid online presence, tell
                    your story and scale your brand — in one place.
                  </p>
                </div>

                <div className="relative">
                  {/* Center vertical glow between cards to match reference */}
                  <div className="pointer-events-none hidden lg:block absolute inset-x-0 top-28 bottom-0 flex items-start justify-center z-0">
                    <div
                      className="w-1/12 max-w-[80px] h-[520px] rounded-full opacity-60"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(255,200,150,0.18), rgba(130,80,255,0.06))",
                        filter: "blur(28px)",
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10 -mt-12 md:-mt-20">
                    {[
                      {
                        tag: "Websites",
                        text: "Modern, fast websites that build trust from the first click.",
                        img: websiteImg,
                      },
                      {
                        tag: "Branding",
                        text: "Logos and brand systems that make your business unforgettable.",
                        img: brandingImg,
                      },
                      {
                        tag: "Social Media",
                        text: "Strategic content that connects and grows your audience.",
                        img: socialImg,
                      },
                      {
                        tag: "Marketing & Ads",
                        text: "Paid campaigns that turn attention into real customers.",
                        img: adsImg,
                      },
                    ].map((c, idx) => (
                      <div key={idx} className="relative service-card">
                        <div
                          className="rounded-3xl overflow-hidden group relative bg-[linear-gradient(180deg,rgba(10,10,12,0.78),rgba(6,6,10,0.64))] border border-white/10 shadow-2xl p-7 md:p-8 h-80 md:h-[26rem] flex flex-col justify-start"
                          style={{
                            backdropFilter: "saturate(120%) blur(7px)",
                          }}
                        >
                          <div className="flex items-start justify-between w-full mb-6">
                            <div
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium z-10"
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                                border: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  background:
                                    "linear-gradient(135deg,#8b5cf6,#ff7a59)",
                                }}
                              />
                              <span className="text-white/90">{c.tag}</span>
                            </div>
                          </div>

                          {/* 3D Floating Image Area */}
                          <div className="relative w-full h-40 md:h-48 mb-4 flex items-center justify-center -mt-2">
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500"></div>
                            <img
                              src={c.img}
                              alt={c.tag}
                              className="service-img h-full w-auto object-contain drop-shadow-2xl will-change-transform"
                            />
                          </div>

                          <div className="mt-auto relative z-10">
                            <p className="text-white/90 font-semibold text-lg md:text-xl leading-snug">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* decorative blur removed */}
            </section>

            {/* WHY (Problems & Solutions) */}
            <section
              aria-label="Why EternaCloud"
              className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative overflow-hidden text-slate-900 mb-0"
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
                  {/* LEFT LISTS – Problems */}
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

                  {/* CENTER - VIDEO */}
                  <div className="flex items-center justify-center md:col-span-1">
                    <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                      {/* Squared radial glow */}
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

                  {/* RIGHT LISTS – Solutions */}
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

            {/* HIGHLIGHTS */}
            <section
              ref={highlightsRef}
              className="px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative overflow-hidden overflow-x-hidden sm:overflow-x-visible text-slate-900 mt-0 md:-mt-2 min-h-[90vh] md:min-h-screen"
              aria-label="Highlights"
              style={{
                backgroundColor: "#ffffff",
                backgroundImage: `url(${dynamicBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                boxShadow: "none",
                border: "none",
              }}
            >
              <div className="absolute bottom-0 left-0 w-full h-36 md:h-52 lg:h-64 pointer-events-none bg-gradient-to-t from-white via-white/90 to-transparent z-0" />

              <div className="container mx-auto max-w-7xl relative z-10">
                {/* pill sits slightly above and overlaps with nav/hero area like the reference */}
                <div className="relative text-center mb-8 md:mb-12 py-4 md:py-6 mt-0 md:mt-0">
                  <div className="absolute -top-6 md:-top-8 lg:-top-10 left-1/2 -translate-x-1/2 z-30">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-sm md:text-sm font-medium shadow-lg bg-white border border-white/60">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full p-0.5 bg-[linear-gradient(135deg,#2BC0E4, #4300FF, #FF0066)]">
                        <span className="w-3.5 h-3.5 rounded-full bg-white inline-flex items-center justify-center">
                          <StarIcon className="w-3 h-3 text-[#6b21a8]" />
                        </span>
                      </span>
                      <span className="hero-tagline-gradient whitespace-nowrap">
                        High-Touch Precision
                      </span>
                    </div>
                  </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-6 md:mb-10 -mt-8 md:-mt-12 lg:-mt-16">
                  <h2 className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold mb-4 text-slate-900 leading-tight">
                    Your teams get to enjoy
                    <br />
                    <span className="hero-tagline-gradient">
                      seamless continuous service
                    </span>
                  </h2>
                  <p className="max-w-3xl mx-auto text-slate-600 mt-4">
                    Unify cross-functional teams the easy way. Rely on us to
                    bridge expectations, serve simplicity and deliver lasting
                    value. We handle the tedious necessities so you don't have
                    to.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6 lg:gap-8 items-start mt-8 md:mt-32 lg:mt-36">
                  <div className="bg-transparent rounded-lg md:rounded-2xl shadow-lg p-2.5 md:p-8 relative overflow-hidden min-h-[9rem] md:min-h-[28rem] lg:min-h-[32rem] backdrop-blur-sm border border-white/10">
                    <h3 className="text-sm md:text-xl font-semibold text-slate-900 mb-1 md:mb-3">
                      Design
                    </h3>
                    <p className="text-[11px] md:text-base text-slate-600 leading-snug md:leading-relaxed">
                      Details you specify once carry forward everywhere. We make
                      sure they don't get bypassed.
                    </p>
                  </div>

                  <div className="bg-transparent rounded-lg md:rounded-2xl shadow-lg p-2.5 md:p-8 relative overflow-hidden min-h-[9rem] md:min-h-[28rem] lg:min-h-[32rem] backdrop-blur-sm border border-white/10">
                    <h3 className="text-sm md:text-xl font-semibold text-slate-900 mb-1 md:mb-3">
                      Engineering
                    </h3>
                    <p className="text-[11px] md:text-base text-slate-600 leading-snug md:leading-relaxed">
                      Your builds have clarity behind it. We create what's
                      needed, what's changed and why it matters.
                    </p>
                  </div>

                  <div className="bg-transparent rounded-lg md:rounded-2xl shadow-lg p-2.5 md:p-8 relative overflow-hidden min-h-[9rem] md:min-h-[28rem] lg:min-h-[32rem] backdrop-blur-sm border border-white/10">
                    <h3 className="text-sm md:text-xl font-semibold text-slate-900 mb-1 md:mb-3">
                      Construction
                    </h3>
                    <p className="text-[11px] md:text-base text-slate-600 leading-snug md:leading-relaxed">
                      Materials you need on site get valorized and tracked on
                      multiple levels. Nothing shows up half-right.
                    </p>
                  </div>
                </div>
              </div>
              {/* subtle bottom accent removed so Highlights and the EternaCloud Card visually merge */}
            </section>

            {/* Large dark card with toggle (Problem vs Solution) */}
            <section
              aria-label="EternaCloud Card"
              className={`${highlightMode === "typical"
                ? "card-merge card-merge--on-dark"
                : "card-merge"
                } relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-slate-900 -mt-6 md:-mt-12 mb-0`}
              style={{ background: "#ffffff" }}
            >
              <div className="container mx-auto max-w-7xl">
                {/* Card */}
                <div
                  className={`${highlightMode === "typical"
                    ? "bg-gradient-to-br from-[#0b1220] to-[#141728] text-white"
                    : "bg-white text-slate-900"
                    } w-full rounded-2xl border-none shadow-[0_6px_24px_rgba(0,0,0,0.12)] overflow-hidden p-4 md:p-10 lg:p-14`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: content */}
                    <div
                      className={`${highlightMode === "typical"
                        ? "text-white/95"
                        : "text-slate-900"
                        }`}
                    >
                      <div
                        className={`inline-flex items-center gap-2 md:gap-3 px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-6 ${highlightMode === "typical"
                          ? "bg-white/[0.03] text-white/60"
                          : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full inline-block ${highlightMode === "typical" ? "bg-pink-500" : "bg-purple-600"
                            }`}
                        />
                        Why MetaBull Universe
                      </div>
                      <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-5 leading-tight">
                        {highlightMode === "typical"
                          ? "Why do modern businesses need a partner like MetaBull Universe?"
                          : "So how does MetaBull Universe fix all this?"}
                      </h3>
                      <p
                        className={`${highlightMode === "typical"
                          ? "text-white/60"
                          : "text-slate-600"
                          } max-w-2xl mb-4 md:mb-6 text-sm md:text-base leading-relaxed`}
                      >
                        {highlightMode === "typical"
                          ? "Digital competition grows every day — and brands without strong websites, consistent content and clear marketing strategies easily fall behind. We help you bring everything into one organised system so your brand can grow smoothly and confidently."
                          : "We unite your branding, website, content, social media and paid campaigns under one reliable team. No scattered vendors, no constant chasing — just a clear plan, structured execution and measurable growth for your business."}
                      </p>

                      <div className="flex flex-col gap-4 items-start">
                        <ul
                          className={`pl-3 md:pl-4 border-l ${highlightMode === "typical"
                            ? "border-white/10 text-white/70"
                            : "border-slate-100 text-slate-700"
                            } text-xs md:text-sm space-y-2 md:space-y-3 mb-2`}
                        >
                          {highlightMode === "typical" ? (
                            <>
                              <li>
                                Online presence feels outdated or disconnected
                                across platforms.
                              </li>
                              <li>
                                Teams keep chasing designs, content and trends
                                without clear direction.
                              </li>
                              <li>
                                Marketing efforts are scattered between tools
                                and vendors, making results hard to track.
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                One powerful, consistent brand identity across
                                website, socials & campaigns.
                              </li>
                              <li>
                                One strategy for content, design and marketing
                                that actually supports your goals.
                              </li>
                              <li>
                                One partner handling everything end-to-end with
                                transparent reporting and communication.
                              </li>
                            </>
                          )}
                        </ul>
                        <div className="mt-4 md:mt-3 w-full md:w-auto flex flex-col md:flex-row gap-2 md:gap-3 justify-center md:justify-start">
                          {/* Typical Function Button */}
                          <div className="inline-block p-[3px] rounded-full bg-gradient-to-r from-[#2BC0E4] via-[#6C3AC9] to-[#FF8A00] w-full md:w-auto">
                            <button
                              role="tab"
                              aria-pressed={highlightMode === "typical"}
                              onClick={() => setHighlightMode("typical")}
                              className={`w-full px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${highlightMode === "typical"
                                ? "bg-[#0b1220] text-white shadow-[inset_0_-6px_18px_rgba(0,0,0,0.55)]"
                                : "bg-white text-slate-800"
                                }`}
                            >
                              {highlightMode === "typical" && (
                                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#2BC0E4] via-[#6C3AC9] to-[#FF8A00] shadow-md relative">
                                  <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </span>
                              )}
                              Typical Function
                            </button>
                          </div>

                          {/* Dynamic Orchestration Button */}
                          <div className="inline-block p-[3px] rounded-full bg-gradient-to-r from-[#2BC0E4] via-[#6C3AC9] to-[#FF8A00] w-full md:w-auto">
                            <button
                              role="tab"
                              aria-pressed={highlightMode === "dynamic"}
                              onClick={() => setHighlightMode("dynamic")}
                              className={`w-full px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${highlightMode === "dynamic"
                                ? "bg-white text-[#0b1220] shadow-[inset_0_-3px_10px_rgba(2,6,23,0.06)]"
                                : highlightMode === "typical"
                                  ? "bg-[#0b1220] text-white/70"
                                  : "bg-white text-slate-700"
                                }`}
                            >
                              {highlightMode === "dynamic" && (
                                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#2BC0E4] via-[#6C3AC9] to-[#FF8A00] shadow-md relative">
                                  <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </span>
                              )}
                              Dynamic Orchestration
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: video / image - Hidden on mobile */}
                    <div className="hidden md:flex items-center justify-center">
                      <div
                        className={`w-full max-w-[36rem] h-[28rem] md:h-[32rem] relative rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl border ${highlightMode === "typical"
                          ? "bg-gradient-to-br from-[#0f1724] to-[#0b0f1a] border-white/6"
                          : "bg-white border-slate-100"
                          }`}
                      >
                        {highlightMode === "typical" ? (
                          <video
                            className="w-full h-full object-cover object-center transform gpu"
                            src={centerVideo}
                            poster={solutionPoster}
                            preload="metadata"
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-hidden="true"
                          />
                        ) : (
                          <img
                            src={solutionPoster}
                            alt="MetaBull Universe solution illustration"
                            className="w-full h-full object-cover object-center"
                          />
                        )}
                        {highlightMode === "typical" && (
                          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 pointer-events-none" />
                        )}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            boxShadow: "inset 0 40px 60px rgba(2,6,23,0.6)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA (Updated to light hero) */}
            <section
              className={`px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center relative overflow-hidden bg-white section-merge ${highlightMode === "typical" ? "section-merge--on-dark" : ""
                }`}
              aria-label="Call to Action"
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: "#ffffff",
              }}
            >
              <div className="container mx-auto max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-sm md:text-sm font-medium mb-6 border border-gray-100 mx-auto cta-pill">
                  <span className="inline-flex items-center justify-center p-[3px] rounded-full pill-dot">
                    <span className="w-3 h-3 rounded-full bg-white inline-flex" />
                  </span>
                  <span className="text-[#0b1220]">Our Promise</span>
                </div>

                <h2 className="text-[clamp(2.75rem,7.5vw,5.25rem)] font-extrabold mb-6 leading-tight cta-hero">
                  <span className="hero-tagline-gradient block">
                    One partnership
                  </span>
                  <span className="block text-[#0b1220]">
                    makes things easy.
                  </span>
                </h2>

                <div className="flex justify-center">
                  <Link to="/about-us" aria-label="About Us">
                    <button className="group relative text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 cta-button">
                      About Us
                    </button>
                  </Link>
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
