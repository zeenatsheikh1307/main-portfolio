// src/pages/Index.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star as StarIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Navigation from "@/components/Navigation";

import heroPoster from "./assets/assests/hero bg.png";
import servicesBg from "./assets/assests/service bg.png";
import dynamicBg from "./assets/assests/Dynamic bg.png";

import centerVideo from "./assets/assests/Video.mp4";
import solutionPoster from "./assets/assests/imgi_138_64f6f2c0e3f4c5a91c1e823a%2F67b7b1c276fa500cc47a35a0_Hero_1_circle-poster-00001.jpg";

import websiteImg from "./assets/assests/website.png";
import brandingImg from "./assets/assests/graphics.png";
import socialImg from "./assets/assests/social media.png";
import adsImg from "./assets/assests/ads.png";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Index = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const floatRef = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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

    // HERO reveal + spotlight follow
    if (heroRef.current) {
      gsap.timeline().fromTo(
        heroRef.current.querySelectorAll(".hero-el"),
        { opacity: 0, y: 28, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        },
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
      padding-top: clamp(3rem, 6vw, 6.5rem);
      padding-bottom: clamp(3rem, 6vw, 6.5rem);
    }

    /* HERO text helpers */
    .hero-tagline-gradient {
      background: linear-gradient(90deg, #2BC0E4 0%, #5D31D8 48%, #FF8A00 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 600;
    }
    .hero-title-exact { color: #fff; font-weight: 900; letter-spacing: -0.02em; }
    .hero-paragraph-exact { color: rgba(255,255,255,0.78); max-width: 62ch; margin-left:auto; margin-right:auto; }

    /* HERO background spotlight (subtle, premium) */
    .hero-spot {
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(700px 420px at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.10), transparent 60%),
        radial-gradient(520px 360px at 15% 30%, rgba(43,192,228,0.14), transparent 62%),
        radial-gradient(520px 360px at 85% 70%, rgba(255,138,0,0.10), transparent 62%);
      mix-blend-mode: screen;
      opacity: 0.65;
      transition: opacity 500ms var(--ease-premium);
    }

    /* Marquee (lighter) */
    @keyframes hero-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .hero-scroll-track { display:flex; animation: hero-scroll 70s linear infinite; will-change: transform; gap: 4rem; }
    @media (prefers-reduced-motion: reduce) { .hero-scroll-track { animation: none !important; } }

    /* Card CTA style (kept premium) */
    .card-cta{
      display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:9999px;padding:.625rem 1.5rem;font-weight:600;letter-spacing:0.01em;
      background:linear-gradient(90deg,#8b5cf6 0%,#6C63FF 50%,#3B82F6 100%);
      color:#fff;box-shadow:0 10px 30px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.12);
      transition: transform .28s var(--ease-premium), box-shadow .24s ease, opacity .2s;
    }
    .card-cta:hover{ transform: translateY(-3px); box-shadow:0 14px 40px rgba(59,130,246,0.16); }

    /* Services blend: no weird -mt gaps */
    .services-top-fade::before{
      content:'';
      position:absolute; left:0; right:0; top:0;
      height: clamp(3.25rem, 6vw, 6rem);
      pointer-events:none;
      background: linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 100%);
      z-index: 2;
    }

    /* Section card styling is handled by Tailwind; keep motion safe */
    @media (prefers-reduced-motion: reduce) {
      * { scroll-behavior: auto !important; }
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
                pt-[clamp(5rem,10vh,8rem)]
                pb-[clamp(2.5rem,6vh,5rem)]
                min-h-[100svh]
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

              {/* marquee (kept but positioned tighter so it doesn't create weird whitespace feeling) */}
              <div className="absolute inset-x-0 top-[12%] sm:top-[14%] pointer-events-none z-0 overflow-hidden opacity-[0.075]">
                <div className="hero-scroll-track select-none whitespace-nowrap py-4">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="font-black text-[4.2rem] sm:text-[6.2rem] lg:text-[8.2rem] leading-none tracking-tighter shrink-0"
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

              <div className="relative z-10 w-full max-w-7xl mx-auto">
                <span className="hero-el hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm md:text-base font-medium mb-6 hero-tagline-gradient">
                  Digital Growth • Branding • Website Development • Marketing
                </span>

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

                <div className="hero-el flex items-center justify-center gap-3">
                  <Link to="/about-us">
                    <button className="card-cta px-7 py-3 text-[15px] md:text-[16px]">
                      Explore About Us
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] md:text-[16px] font-semibold text-white/90 border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10 transition">
                      Talk to Team
                    </button>
                  </Link>
                </div>
              </div>

              {/* hero bottom fade -> services blend */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-[1]" />
            </section>

            {/* SERVICES */}
            <section
              ref={servicesRef}
              aria-label="Services"
              className="
                relative overflow-hidden
                px-4 sm:px-6 lg:px-8
                section-pad-y
                services-top-fade
              "
              style={{
                backgroundImage: `url(${servicesBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-10 md:mb-14">
                  <h2 className="text-[clamp(1.85rem,4.5vw,3.05rem)] font-extrabold text-white leading-tight max-w-3xl mx-auto">
                    Your business needs.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61dafb] via-[#8b5cf6] to-[#ff7a59]">
                      Our complete digital services.
                    </span>
                  </h2>
                  <p className="text-sm md:text-base text-white/60 mt-3 max-w-2xl mx-auto">
                    Everything you need to build a solid online presence, tell
                    your story and scale your brand — in one place.
                  </p>
                </div>

                <div className="relative">
                  {/* subtle center glow */}
                  <div className="pointer-events-none hidden lg:block absolute inset-x-0 top-24 bottom-0 flex items-start justify-center z-0">
                    <div
                      className="w-[92px] h-[520px] rounded-full opacity-60"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(255,200,150,0.18), rgba(130,80,255,0.06))",
                        filter: "blur(28px)",
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
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
                          className="
                            rounded-3xl overflow-hidden group relative
                            bg-[linear-gradient(180deg,rgba(10,10,12,0.78),rgba(6,6,10,0.62))]
                            border border-white/10 shadow-2xl
                            p-7 md:p-8
                            min-h-[22rem] md:min-h-[25rem]
                            flex flex-col
                          "
                          style={{ backdropFilter: "saturate(120%) blur(7px)" }}
                        >
                          <div className="flex items-start justify-between w-full mb-6">
                            <div
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium z-10"
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                                border: "1px solid rgba(255,255,255,0.06)",
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

                          {/* Image area (responsive, no extra space) */}
                          <div className="relative w-full flex-1 min-h-[8.5rem] md:min-h-[10.5rem] flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500" />
                            <img
                              src={c.img}
                              alt={c.tag}
                              className="service-img h-[9.5rem] md:h-[11.5rem] w-auto object-contain drop-shadow-2xl will-change-transform"
                            />
                          </div>

                          <div className="mt-5">
                            <p className="text-white/90 font-semibold text-[16px] md:text-[18px] leading-snug">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 text-center">
                    <Link to="/services">
                      <button className="card-cta">View All Services</button>
                    </Link>
                  </div>
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
                <div className="relative text-center mb-10 md:mb-14">
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
                </div>

                <div className="text-center mb-8 md:mb-10">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 lg:gap-8 items-start mt-8">
                  {[
                    {
                      title: "Design",
                      desc: "Details you specify once carry forward everywhere. We make sure they don't get bypassed.",
                    },
                    {
                      title: "Engineering",
                      desc: "Your builds have clarity behind it. We create what's needed, what's changed and why it matters.",
                    },
                    {
                      title: "Construction",
                      desc: "Materials you need on site get valorized and tracked on multiple levels. Nothing shows up half-right.",
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

            {/* BIG CARD + TOGGLE */}
            {/* <section
              aria-label="EternaCloud Card"
              className="px-4 sm:px-6 lg:px-8 section-pad-y text-slate-900"
              style={{ background: "#ffffff" }}
            >
              <div className="container mx-auto max-w-7xl">
                <div
                  className={`${
                    highlightMode === "typical"
                      ? "bg-gradient-to-br from-[#0b1220] to-[#141728] text-white"
                      : "bg-white text-slate-900"
                  } w-full rounded-2xl border-none shadow-[0_10px_40px_rgba(0,0,0,0.12)] overflow-hidden p-5 md:p-10 lg:p-14`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div
                      className={`${
                        highlightMode === "typical"
                          ? "text-white/95"
                          : "text-slate-900"
                      }`}
                    >
                      <div
                        className={`inline-flex items-center gap-3 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-5 ${
                          highlightMode === "typical"
                            ? "bg-white/[0.03] text-white/60"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full inline-block ${
                            highlightMode === "typical"
                              ? "bg-pink-500"
                              : "bg-purple-600"
                          }`}
                        />
                        Why MetaBull Universe
                      </div>

                      <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
                        {highlightMode === "typical"
                          ? "Why do modern businesses need a partner like MetaBull Universe?"
                          : "So how does MetaBull Universe fix all this?"}
                      </h3>

                      <p
                        className={`${
                          highlightMode === "typical"
                            ? "text-white/60"
                            : "text-slate-600"
                        } max-w-2xl mb-6 text-sm md:text-base leading-relaxed`}
                      >
                        {highlightMode === "typical"
                          ? "Digital competition grows every day — and brands without strong websites, consistent content and clear marketing strategies easily fall behind. We help you bring everything into one organised system so your brand can grow smoothly and confidently."
                          : "We unite your branding, website, content, social media and paid campaigns under one reliable team. No scattered vendors, no constant chasing — just a clear plan, structured execution and measurable growth for your business."}
                      </p>

                      <ul
                        className={`pl-4 border-l ${
                          highlightMode === "typical"
                            ? "border-white/10 text-white/70"
                            : "border-slate-100 text-slate-700"
                        } text-sm space-y-3`}
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
                              Marketing efforts are scattered between tools and
                              vendors, making results hard to track.
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

                      <div className="mt-7 flex flex-col sm:flex-row gap-3">
                        <div className="inline-block p-[3px] rounded-full bg-gradient-to-r from-[#2BC0E4] via-[#6C3AC9] to-[#FF8A00] w-full sm:w-auto">
                          <button
                            role="tab"
                            aria-pressed={highlightMode === "typical"}
                            onClick={() => setHighlightMode("typical")}
                            className={`w-full px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
                              highlightMode === "typical"
                                ? "bg-[#0b1220] text-white shadow-[inset_0_-6px_18px_rgba(0,0,0,0.55)]"
                                : "bg-white text-slate-800"
                            }`}
                          >
                            Typical Function
                          </button>
                        </div>

                        <div className="inline-block p-[3px] rounded-full bg-gradient-to-r from-[#2BC0E4] via-[#6C3AC9] to-[#FF8A00] w-full sm:w-auto">
                          <button
                            role="tab"
                            aria-pressed={highlightMode === "dynamic"}
                            onClick={() => setHighlightMode("dynamic")}
                            className={`w-full px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
                              highlightMode === "dynamic"
                                ? "bg-white text-[#0b1220] shadow-[inset_0_-3px_10px_rgba(2,6,23,0.06)]"
                                : highlightMode === "typical"
                                  ? "bg-[#0b1220] text-white/70"
                                  : "bg-white text-slate-700"
                            }`}
                          >
                            Dynamic Orchestration
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                      <div
                        className={`w-full max-w-[36rem] h-[28rem] md:h-[32rem] relative rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl border ${
                          highlightMode === "typical"
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
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/10 to-black/25" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            {/* CTA */}
            <section
              aria-label="Call to Action"
              className="px-4 sm:px-6 lg:px-8 section-pad-y text-center bg-white"
            >
              <div className="container mx-auto max-w-5xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-gray-100 mx-auto bg-white shadow-sm">
                  <span className="inline-flex items-center justify-center p-[3px] rounded-full bg-gradient-to-r from-[#2BC0E4] via-[#6C3AC9] to-[#FF8A00]">
                    <span className="w-3 h-3 rounded-full bg-white inline-flex" />
                  </span>
                  <span className="text-[#0b1220]">Our Promise</span>
                </div>

                <h2 className="text-[clamp(2.2rem,6.2vw,4.9rem)] font-bold mb-7 leading-[1.05] text-[#0b1220]">
                  <span className="hero-tagline-gradient block">
                    One partnership
                  </span>
                  <span className="block">makes things easy.</span>
                </h2>

                <div className="flex justify-center">
                  <Link to="/about-us" aria-label="About Us">
                    <button className="card-cta px-10 py-4 text-lg">
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
