"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: {
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
  };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, index, total, phase, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={`social-media-${index}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-purple-900 to-blue-900 flex flex-col items-center justify-center p-4 border border-purple-500/30"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <p className="text-[8px] font-bold text-purple-300 uppercase tracking-widest mb-1">
              Engage
            </p>
            <p className="text-xs font-medium text-white">
              +{Math.floor(Math.random() * 500 + 100)}%
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 1500; // Reduced virtual scroll range

// Social Media Themed Unsplash Images
const IMAGES = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80",
  "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=300&q=80",
  "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=300&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&q=80",
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&q=80",
  "https://images.unsplash.com/photo-1579869847557-1f67382cc158?w=300&q=80",
  "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=300&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
  "https://images.unsplash.com/photo-1557838923-2985c318be48?w=300&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&q=80",
  "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=300&q=80",
  "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300&q=80",
  "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=300&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&q=80",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=300&q=80",
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&q=80",
  "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=300&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&q=80",
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

export default function ScrollMorphHero() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Container Size ---
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    // Initial set
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // --- Virtual Scroll Logic ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If animation is complete and user scrolls down, allow normal scroll
      if (
        animationComplete &&
        e.deltaY > 0 &&
        scrollRef.current >= MAX_SCROLL
      ) {
        return; // Allow default scroll behavior
      }

      // If scrolling up at the top, allow normal scroll
      if (scrollRef.current <= 0 && e.deltaY < 0) {
        return; // Allow default scroll behavior
      }

      // Prevent default during animation
      e.preventDefault();
      e.stopPropagation();

      // Asymmetric velocity: Normal forward, Fast reverse
      const velocity = e.deltaY < 0 ? 15 : 4;
      const newScroll = Math.min(
        Math.max(scrollRef.current + e.deltaY * velocity, 0),
        MAX_SCROLL,
      );
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);

      // Mark animation as complete when reaching the end
      if (newScroll >= MAX_SCROLL) {
        setAnimationComplete(true);
      }
      // Reset animation complete when scrolling back
      if (newScroll < MAX_SCROLL && animationComplete) {
        setAnimationComplete(false);
      }
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      // Similar logic for touch
      if (animationComplete && deltaY > 0 && scrollRef.current >= MAX_SCROLL) {
        return;
      }

      if (scrollRef.current <= 0 && deltaY < 0) {
        return;
      }

      e.preventDefault();

      const velocity = deltaY < 0 ? 12 : 3;
      const newScroll = Math.min(
        Math.max(scrollRef.current + deltaY * velocity, 0),
        MAX_SCROLL,
      );
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);

      if (newScroll >= MAX_SCROLL) {
        setAnimationComplete(true);
      }
      // Reset animation complete when scrolling back
      if (newScroll < MAX_SCROLL && animationComplete) {
        setAnimationComplete(false);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll, animationComplete]);

  // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 50, damping: 25 });

  // 2. Scroll Rotation (Shuffling)
  const scrollRotate = useTransform(virtualScroll, [600, 1500], [0, 180]);
  const smoothScrollRotate = useSpring(scrollRotate, {
    stiffness: 50,
    damping: 25,
  });

  // --- Mouse Parallax ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 50); // Reduced parallax intensity
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // --- Intro Sequence ---
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 300);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // --- Random Scatter Positions ---
  const scatterPositions = useMemo(() => {
    return IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // --- Render Loop ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // --- Content Opacity ---
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden"
    >
      {/* Scroll Hint - appears when animation is complete */}
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className="text-xs text-gray-400 font-medium">
            Scroll to continue
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400"
          >
            ↓
          </motion.div>
        </motion.div>
      )}

      {/* Container */}
      <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
        {/* Intro Text (Fades out) */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl"
          >
            Grow Your <br /> Social Presence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.5 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-400"
          >
            SCROLL TO EXPLORE
          </motion.p>
        </div>

        {/* Arc Active Content (Fades in) */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[20%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Our Social Media Expertise
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
            From viral content to community building, we create strategies{" "}
            <br className="hidden md:block" />
            that turn followers into loyal brand advocates.
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="relative flex items-center justify-center w-full h-full">
          {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            // 1. Intro Phases (Scatter -> Line)
            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 70;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              // 2. Circle Phase & Morph Logic
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(
                containerSize.width,
                containerSize.height,
              );

              // A. Calculate Circle Position
              const circleRadius = Math.min(minDimension * 0.35, 350);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              // Added vertical offset (+40) to move it below nav
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius + 40,
                rotation: circleAngle + 90,
              };

              // B. Calculate Bottom Arc Position
              const baseRadius = Math.min(
                containerSize.width,
                containerSize.height * 1.5,
              );
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              // Apply Scroll Rotation
              const scrollProgress = Math.min(
                Math.max(rotateValue / 180, 0),
                1,
              );
              const maxRotation = spreadAngle * 0.6;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              // C. Interpolate (Morph)
              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                src={src}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
