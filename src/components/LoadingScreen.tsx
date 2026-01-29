import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "../pages/assets/assests/cropped-WhatsApp_Image_2024-12-02_at_14.02.28_62850caf-removebg-preview.png";
import { useLoading } from "@/contexts/LoadingContext";

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const orbit1Ref = useRef<HTMLDivElement>(null);
  const orbit2Ref = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const { setLoaded } = useLoading();

  useEffect(() => {
    // Smoother percentage acceleration
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remains = 100 - prev;
        const speedFactor = remains < 20 ? 0.3 : 1;
        const step = Math.max(
          1,
          Math.floor(Math.random() * (remains / 15 + 3) * speedFactor),
        );
        return Math.min(100, prev + step);
      });
    }, 80);
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

      tl.to([logoRef.current, textRef.current, ".orbit-wrap", ".status-wrap"], {
        opacity: 0,
        scale: 1.15,
        filter: "blur(30px) brightness(2)",
        duration: 1.2,
        letterSpacing: "1.2em",
        ease: "expo.inOut",
      }).to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1.5,
          ease: "power4.inOut",
        },
        "-=0.8",
      );
    }
  }, [percent]);

  useEffect(() => {
    // Initial State
    gsap.set(containerRef.current, { opacity: 1 });

    // Mouse Parallax for Light Leak
    const moveLight = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      gsap.to(lightRef.current, { x, y, duration: 2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", moveLight);

    // Split Text Animation for Brand
    if (textRef.current) {
      const text = "METABULL";
      textRef.current.innerHTML = text
        .split("")
        .map(
          (char) => `<span class="char opacity-0 inline-block">${char}</span>`,
        )
        .join("");
      gsap.to(".char", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.5,
      });
    }

    // Advanced Perpetual Cycles
    const orbits = [orbit1Ref.current, orbit2Ref.current];
    orbits.forEach((orb, i) => {
      gsap.to(orb, {
        rotation: i === 0 ? 360 : -360,
        duration: i === 0 ? 5 : 3.5,
        repeat: -1,
        ease: "none",
      });
    });

    return () => window.removeEventListener("mousemove", moveLight);
  }, []);

  // Update visual intensity based on progress
  useEffect(() => {
    const intensity = percent / 100;
    gsap.to(".orbit-glow", {
      opacity: 0.2 + intensity * 0.4,
      scale: 1 + intensity * 0.2,
      duration: 0.5,
    });
  }, [percent]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020205] overflow-hidden"
    >
      <style>{`
        .grain {
          position: absolute;
          inset: -150%;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.12;
          pointer-events: none;
          animation: grain-shift 8s steps(10) infinite;
          mix-blend-mode: soft-light;
        }
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5%, -5%); }
        }

        .scanlines {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.01) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 5;
        }

        .shimmer-text {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 4s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .glint-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.3) 50%, transparent 55%);
          background-size: 300% 300%;
          animation: glint 6s infinite ease-in-out;
          pointer-events: none;
        }
        @keyframes glint {
          0% { background-position: -150% -150%; }
          30% { background-position: 150% 150%; }
          100% { background-position: 150% 150%; }
        }

        .orbital-line {
            mask-image: linear-gradient(to right, transparent, black, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
        }
      `}</style>

      {/* Aesthetic Layers */}
      <div className="grain" />
      <div className="scanlines" />

      {/* Interactive Light Leaks */}
      <div
        ref={lightRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      >
        <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vw] bg-violet-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-pink-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Orbital System */}
        <div className="orbit-wrap absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={orbit1Ref}
            className="absolute inset-[-100px] rounded-full border border-white/[0.02] orbital-line"
          >
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full blur-[2px] shadow-[0_0_20px_#8b5cf6]" />
          </div>

          <div
            ref={orbit2Ref}
            className="absolute inset-[-70px] rounded-full border border-white/[0.04] orbital-line"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full blur-[1.5px] shadow-[0_0_15px_#ec4899]" />
          </div>
        </div>

        {/* Logo - Floating & Glinting */}
        <div
          ref={logoRef}
          className="glint-wrap relative z-10 mb-14 select-none group pointer-events-none"
        >
          <div className="orbit-glow absolute inset-[-30px] bg-violet-600/10 blur-[60px] rounded-full opacity-20 transition-all duration-1000" />
          <img
            src={logo}
            alt="MetaBull"
            className="w-28 h-28 object-contain filter drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] saturate-[1.1]"
          />
        </div>

        {/* Masterclass Typography */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1
            ref={textRef}
            className="text-4xl font-light tracking-[0.6em] uppercase text-white/95 font-sans mb-4"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
          >
            METABULL
          </h1>

          <div className="status-wrap flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
              <span className="shimmer-text text-[11px] font-bold tracking-[1em] text-white/20 uppercase ml-[1em]">
                {percent}% UNIVERSE
              </span>
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="w-40 h-[1.5px] bg-white/[0.03] relative overflow-hidden mt-6 rounded-full shadow-inner">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-500 ease-out"
                style={{ width: "60px", left: `calc(${percent}% - 30px)` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Signature Detail */}
      <div className="absolute bottom-10 flex items-center gap-6 opacity-[0.08] select-none pointer-events-none">
        <span className="text-[10px] tracking-[0.5em] font-light text-white uppercase">
          Neural Engine Syncinging
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] tracking-[0.5em] font-light text-white uppercase">
          Vortex v2.08
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
