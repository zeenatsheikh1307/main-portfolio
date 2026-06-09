import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

gsap.registerPlugin(ScrollTrigger);

// ─── Process Steps Data ───────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    label: "analysis",
    title: "Discovery & Analysis",
    desc: "We explore your brand's core message and set the direction for the narrative. Deep research, competitor analysis, and strategy.",
  },
  {
    num: "02",
    label: "concept",
    title: "Concept & Strategy",
    desc: "We propose unique concepts for your project, bringing ideas to life with visual mood boards and strategic direction.",
  },
  {
    num: "03",
    label: "visuals & manifesto",
    title: "Visuals & Manifesto",
    desc: "We provide 3D visualizations and a manifesto to convey the key message and ensure lasting impact.",
  },
  {
    num: "04",
    label: "budgeting",
    title: "Budgeting & Delivery",
    desc: "We offer transparent pricing with no hidden costs. Clear timelines, precise delivery, and post-launch support.",
  },
];

// ─── Scrolling marquee items ──────────────────────────────────────────
const MARQUEE = [
  "Web Design", "◆", "Branding", "◆", "Video Production", "◆",
  "Performance Ads", "◆", "AI Automation", "◆", "Social Media", "◆",
  "UI/UX Design", "◆", "SEO & Growth", "◆",
];

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // ─── Mouse tracking for Parallax ────────────────────────────────────
  const mouseRef = useRef({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent) => {
    // Convert to range -0.5 to 0.5
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) - 0.5,
      y: (e.clientY / window.innerHeight) - 0.5,
    };
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ─── GSAP Hero & Interactive Logic ───────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from(".about-hero-word", {
        y: 140,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.15,
      });

      // Interactive Parallax Loop
      gsap.ticker.add(() => {
        const { x, y } = mouseRef.current;
        
        // Move "about" (parallax layer 1)
        gsap.to(".parallax-layer-1", {
          x: x * 40,
          y: y * 25,
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Move "us" (parallax layer 2 - opposite/different intensity)
        gsap.to(".parallax-layer-2", {
          x: x * -60,
          y: y * 40,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Background blobs react to mouse
        gsap.to(".hero-blob-1", { x: 30 + (x * 100), y: -20 + (y * 80), duration: 4, ease: "power2.out", overwrite: "auto" });
        gsap.to(".hero-blob-2", { x: -25 + (x * -80), y: 30 + (y * -60), duration: 5, ease: "power2.out", overwrite: "auto" });
        gsap.to(".hero-blob-3", { x: 15 + (x * 50), y: 25 + (y * 40), duration: 4.5, ease: "power2.out", overwrite: "auto" });
      });

      // Fade in sub elements
      gsap.from(".about-sub", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Marquee infinite scroll ─────────────────────────────────────────
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    gsap.to(el, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  // ─── GSAP SVG Path Draw on Scroll ───────────────────────────────────
  useEffect(() => {
    if (!pathRef.current) return;

    const ctx = gsap.context(() => {
      // Get total path length
      const pathLength = pathRef.current!.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Draw the path as user scrolls
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });

      // Animate the dot along the path
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            autoRotate: false,
          },
          ease: "none",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.2,
          },
        });
      }

      // Animate each step in as scroll reaches it
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Scroll scaling for hero exit ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        scale: 0.95,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ─── Scroll reveal for other sections ───────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Stats Count-up Animation ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray<HTMLElement>(".stat-number");
      stats.forEach((stat) => {
        const target = parseFloat(stat.getAttribute("data-target") || "0");
        const suffix = stat.getAttribute("data-suffix") || "";
        
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            stat.innerText = Math.floor(obj.value) + suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════
          HERO — Pure typography + abstract bg
      ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex flex-col">

        {/* ─── High-end Film Grain / Noise Overlay ─── */}
        <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay overflow-hidden">
          <div className="noise-grain absolute inset-0 bg-[#080808]" />
        </div>

        {/* ─── Abstract atmospheric background blobs ─── */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Large purple blob — top left */}
          <div
            className="hero-blob-1 absolute rounded-full blur-[120px] opacity-30"
            style={{ width: 600, height: 500, top: "-10%", left: "-8%", background: "radial-gradient(circle, #4f00e8 0%, transparent 70%)" }}
          />
          {/* Pink/red blob — top right */}
          <div
            className="hero-blob-2 absolute rounded-full blur-[140px] opacity-20"
            style={{ width: 550, height: 450, top: "5%", right: "-10%", background: "radial-gradient(circle, #e8006f 0%, transparent 70%)" }}
          />
          {/* Cyan blob — bottom center */}
          <div
            className="hero-blob-3 absolute rounded-full blur-[130px] opacity-15"
            style={{ width: 500, height: 400, bottom: "5%", left: "30%", background: "radial-gradient(circle, #00b4e8 0%, transparent 70%)" }}
          />

          {/* Subtle dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* ─── Thin left accent line ─── */}
        <div className="absolute left-6 top-32 bottom-32 w-px bg-white/10 hidden lg:block" />

        {/* ─── Static Status Labels — Repositioned to Top Right ─── */}
        <div className="absolute right-12 top-32 hidden xl:flex flex-col gap-6 text-right pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">established.inc</span>
            <span className="text-xs font-black tracking-widest text-white/40 italic">2021 ©</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">location</span>
            <span className="text-xs font-black tracking-widest text-white/40 italic">BHOPAL, IN</span>
          </div>
        </div>

        {/* ─── Center content ─── */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 pt-28 pb-8">

          {/* Label */}
          <p className="about-sub text-[10px] tracking-[0.45em] uppercase text-white/25 font-medium mb-12">
            metabull universe / about us
          </p>

          {/* ─── GIANT STACKED MAIN TITLE — UPPERCASE ─── */}
          <div className="w-full flex justify-start parallax-layer-1">
            <h1
              className="about-hero-word block font-black leading-[1.1] tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 liquid-text pl-[14vw]"
              style={{ fontSize: "clamp(80px, 22vw, 240px)" }}
            >
              ABOUT
            </h1>
          </div>
          <div className="w-full flex justify-end -mt-[4vw] parallax-layer-2">
            <h1
              className="about-hero-word block font-black leading-[1.1] tracking-[-0.05em] pr-[14vw]"
              style={{
                fontSize: "clamp(80px, 22vw, 240px)",
                WebkitTextStroke: "2px rgba(255,255,255,0.7)",
                color: "transparent",
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))",
              }}
            >
               US
            </h1>
          </div>
        </div>

        {/* ─── Scrolling marquee strip — Slimmer & More Elegant ─── */}
        <div className="relative z-10 border-t border-b border-white/10 overflow-hidden py-8 mt-auto bg-white/[0.02] backdrop-blur-[4px]">
          <div ref={marqueeRef} className="flex items-center gap-16 whitespace-nowrap" style={{ width: "200%" }}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span
                key={i}
                className={`text-2xl font-black tracking-[0.1em] uppercase shrink-0 ${
                  item === "◆" ? "text-white/10" : "text-white/40 italic"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════
          STATS ROW
      ═══════════════════════════════════════════════ */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "200", suffix: "+", label: "Projects Delivered" },
            { num: "50", suffix: "+", label: "Happy Clients" },
            { num: "3", suffix: "×", label: "Avg. ROI for Ads" },
            { num: "3", suffix: "yrs+", label: "In Industry" },
          ].map((s, i) => (
            <div key={i} className="scroll-reveal text-center">
              <div
                className="stat-number font-black leading-none"
                data-target={s.num}
                data-suffix={s.suffix}
                style={{ fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.04em" }}
              >
                0{s.suffix}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div className="max-w-5xl mx-auto mt-12 h-px bg-white/8" />
      </section>

      {/* ═══════════════════════════════════════════════
          PROCESS — Curved SVG Path + Steps
      ═══════════════════════════════════════════════ */}
      <section className="process-section relative px-6 py-28 overflow-hidden" style={{ minHeight: "160vh" }}>
        {/* Section label */}
        <div className="scroll-reveal text-left max-w-6xl mx-auto mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-white/30">process.</span>
        </div>

        {/* SVG curved path — mimics the organic hand-drawn line */}
        <svg
          className="absolute left-0 top-0 w-full pointer-events-none"
          style={{ height: "100%" }}
          viewBox="0 0 800 1600"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* The organic curving path */}
          <path
            ref={pathRef}
            d="M 400 80
               C 300 200, 150 250, 200 380
               C 260 520, 520 480, 480 620
               C 430 780, 180 780, 220 940
               C 260 1080, 560 1060, 520 1200
               C 480 1340, 250 1380, 300 1500"
            stroke="rgba(200, 255, 100, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Moving dot on path */}
          <circle
            ref={dotRef}
            cx="400"
            cy="80"
            r="6"
            fill="rgba(200, 255, 100, 1)"
            style={{ filter: "drop-shadow(0 0 8px rgba(200,255,100,0.8))" }}
          />
        </svg>

        {/* Process Steps — alternating left/right */}
        <div className="relative max-w-5xl mx-auto">
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { if (el) stepRefs.current[i] = el; }}
              className={`flex items-start gap-6 mb-32 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs ${i % 2 !== 0 ? "text-right" : "text-left"}`}
                style={{ paddingLeft: i % 2 === 0 ? "8%" : "0", paddingRight: i % 2 !== 0 ? "8%" : "0" }}
              >
                {/* Bullet + small label */}
                <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? "justify-end" : ""}`}>
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "rgba(200, 255, 100, 0.8)" }}
                  />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">
                    ◦ {step.label}
                  </span>
                </div>

                {/* Step number */}
                <div
                  className="font-black text-white/8 leading-tight pt-2 mb-1 select-none"
                  style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}
                >
                  {step.num}
                </div>

                {/* Step title */}
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>

                {/* Step desc */}
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHO WE ARE — Split text section
      ═══════════════════════════════════════════════ */}
      <section className="px-6 py-24 border-t border-white/8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — big quote */}
          <div className="scroll-reveal">
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-6">who we are</p>
            <blockquote
              className="font-black leading-[1.1] text-white"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.03em" }}
            >
              "We don't just design —{" "}
              <span className="text-white/40">we build experiences that people remember long after they leave."</span>
            </blockquote>
          </div>

          {/* Right — details */}
          <div className="scroll-reveal space-y-6 text-white/60 text-base leading-relaxed">
            <p>
              MetaBull Universe is a full-service creative & technology studio based in Bhopal. We blend performance
              marketing, cinematic content, brand design, and AI-powered automations into one tight, high-impact squad.
            </p>
            <p>
              Our team of designers, developers, marketers, and strategists work as a unified creative unit — no silos,
              no chasing briefs. Just one team obsessed with pushing the work further.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-4 text-white font-semibold text-sm tracking-wide group"
            >
              <span
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-black"
              >
                →
              </span>
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CAPABILITIES — Dark card grid
      ═══════════════════════════════════════════════ */}
      <section className="px-6 py-24 border-t border-white/8">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal mb-16 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">capabilities</p>
              <h2
                className="font-black text-white leading-[1.0]"
                style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.04em" }}
              >
                What we<br />master
              </h2>
            </div>
            <Link to="/services" className="text-sm text-white/40 hover:text-white transition-colors hidden md:block">
              View all services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {[
              { num: "01", title: "Web & App Development", desc: "Next.js, React, WordPress — blazing fast, SEO-ready, pixel-perfect." },
              { num: "02", title: "Brand & Visual Identity", desc: "Logos, design systems, motion guidelines, and component libraries." },
              { num: "03", title: "Performance Marketing", desc: "Meta & Google Ads with creative testing, funnels, and clean tracking." },
              { num: "04", title: "Video Production", desc: "Cinematic reels, product films, social content, and UGC campaigns." },
              { num: "05", title: "AI Automations", desc: "Voice bots, chatbots, and content pipelines to cut cost and time." },
              { num: "06", title: "Social Media", desc: "Strategy, content calendars, post design, and community management." },
            ].map((c, i) => (
              <div
                key={i}
                className="scroll-reveal bg-[#080808] p-8 group hover:bg-[#111] transition-colors duration-300 cursor-default"
              >
                <div className="text-xs text-white/20 font-mono mb-6">{c.num}</div>
                <h3 className="font-bold text-white text-lg mb-3 group-hover:text-white/90">{c.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{c.desc}</p>
                {/* Hover underline */}
                <div className="mt-6 h-px w-0 group-hover:w-full bg-white/20 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Full width minimal
      ═══════════════════════════════════════════════ */}
      <section className="px-6 py-32 border-t border-white/8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="scroll-reveal">
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">let's work together</p>
            <h2
              className="font-black leading-[1.0] text-white mb-10"
              style={{ fontSize: "clamp(42px, 8vw, 110px)", letterSpacing: "-0.04em" }}
            >
              Ready to build<br />
              <span className="text-white/30">something great?</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-white/20 rounded-full px-10 py-5 text-base font-semibold text-white hover:bg-white hover:text-black transition-all duration-300 group"
            >
              Book a discovery call
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Inline styles ────────────────────────── */}
      <style>{`
        /* Smooth antialiasing for big display text */
        h1, h2, h3, blockquote {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Liquid gradient animation for titles */
        .liquid-text {
          background-size: 200% auto;
          animation: liquid 8s linear infinite;
        }

        @keyframes liquid {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }

        /* High-end animated film grain */
        .noise-grain {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          animation: noise 0.2s infinite;
        }

        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </div>
  );
}
