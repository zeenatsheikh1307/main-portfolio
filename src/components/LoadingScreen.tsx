import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "../pages/assets/assests/cropped-WhatsApp_Image_2024-12-02_at_14.02.28_62850caf-removebg-preview.png";
import { useLoading } from "@/contexts/LoadingContext";

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lightBeamRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const { setLoaded } = useLoading();

  useEffect(() => {
    // High-precision numerical counter
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remains = 100 - prev;
        const speed = remains < 15 ? 40 : 70;
        const step = remains < 10 ? 1 : Math.floor(Math.random() * 3 + 1);
        return Math.min(100, prev + step);
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
          setLoaded(true);
        },
      });

      // The "Portal" Exit Sequence
      tl.to([logoRef.current, textRef.current, ".monolith-ui"], {
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 0.6,
        ease: "power2.inOut",
      }).to(
        containerRef.current,
        {
          opacity: 0,
          scale: 1.1,
          filter: "brightness(3) blur(30px)",
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.2",
      );
    }
  }, [percent]);

  useEffect(() => {
    // Initial Architectural Reveal
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
    );

    gsap.fromTo(
      ".split-line",
      { scaleY: 0 },
      { scaleY: 1, duration: 1.2, ease: "expo.inOut" },
    );

    // Architectural Light Sweep
    gsap.to(lightBeamRef.current, {
      x: "150vw",
      duration: 3.5,
      repeat: -1,
      ease: "power1.inOut",
      repeatDelay: 1,
    });

    // Vertical Scanner line
    gsap.to(scannerRef.current, {
      y: "100vh",
      duration: 4,
      repeat: -1,
      ease: "none",
    });

    // Brand Reveal Stagger
    gsap.from(".brand-part", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
    >
      <style>{`
        .monolith-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%);
        }
        
        .architectural-light {
          position: absolute;
          top: 0;
          left: -40vw;
          width: 50vw;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.035), transparent);
          transform: skewX(-25deg);
          pointer-events: none;
          z-index: 1;
        }

        .scanner-beam {
          position: absolute;
          top: -100px;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.02), transparent);
          pointer-events: none;
          z-index: 2;
        }

        .split-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-50%);
          z-index: 0;
        }

        .prism-dot {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px #fff;
          opacity: 0.2;
        }
      `}</style>

      {/* Atmospheric Layers */}
      <div className="monolith-bg" />
      <div className="split-line" />
      <div ref={lightBeamRef} className="architectural-light" />
      <div ref={scannerRef} className="scanner-beam" />

      {/* Subtle Prism Dust */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="prism-dot animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center z-10">
        {/* Floating Logo - Desaturated & Glossy */}
        <div
          ref={logoRef}
          className="relative mb-12 select-none pointer-events-none transform transition-transform duration-1000"
        >
          <div className="absolute inset-[-40px] bg-white/[0.03] blur-[60px] rounded-full" />
          <img
            src={logo}
            alt="MetaBull"
            className="w-24 h-24 object-contain filter grayscale brightness-[1.2] opacity-80"
          />
        </div>

        {/* Elite Brand Typography */}
        <div ref={textRef} className="flex flex-col items-center text-center">
          <h1 className="brand-part text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-[-0.04em] text-white leading-[0.9] mb-2 uppercase">
            MetaBull
          </h1>

          <div className="brand-part flex items-center gap-6 w-full mt-1">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-[clamp(0.75rem,2vw,1.25rem)] font-light tracking-[1.2em] text-white/50 uppercase ml-[1.2em]">
              Universe
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/20 to-transparent" />
          </div>

          {/* Precision Status UI */}
          <div className="monolith-ui mt-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-8 font-mono text-[10px] tracking-[0.3em] text-white/20">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                SECURE_LINK
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                VORTEX_INIT
              </span>
            </div>

            <div className="text-[32px] font-black text-white/90 font-mono tracking-tighter tabular-nums">
              {percent.toString().padStart(3, "0")}
            </div>

            <div className="w-48 h-[1px] bg-white/[0.05] relative">
              <div
                className="absolute inset-y-0 left-0 bg-white/40 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Signature Corner Details */}
      <div className="monolith-ui absolute bottom-12 inset-x-12 flex justify-between items-end opacity-20 pointer-events-none select-none">
        <div className="flex flex-col gap-1 tracking-[0.4em] text-[8px] font-bold text-white/40">
          <span>ARCH_CORE: 0x81F2</span>
          <span>EST_LATENCY: 14MS</span>
        </div>
        <div className="flex flex-col items-end gap-1 tracking-[0.4em] text-[8px] font-bold text-white/40">
          <span>© 2026 METABULL</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
