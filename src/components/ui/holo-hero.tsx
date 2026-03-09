import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface VideoCard {
  src: string;
  label?: string;
  image?: string;
}

interface HoloHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryAction?: { label: string; onClick: () => void };
  cards?: VideoCard[];
}

const CARD_W = 180;
const CARD_H = 340;
const GAP = 32;
const SPEED = 1.0;

const DEFAULT_CARDS: VideoCard[] = [
  {
    src: "",
    label: "Brand Documentary",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop",
  },
  {
    src: "",
    label: "Product Showcase",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=800&fit=crop",
  },
  {
    src: "",
    label: "Cinematic Reel",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=800&fit=crop",
  },
  {
    src: "",
    label: "Social Content",
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=800&fit=crop",
  },
  {
    src: "",
    label: "AI Model Video",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=800&fit=crop",
  },
  {
    src: "",
    label: "UGC Campaign",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&h=800&fit=crop",
  },
  {
    src: "",
    label: "Event Highlight",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=800&fit=crop",
  },
  {
    src: "",
    label: "Testimonial Film",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop",
  },
];

export function HoloHero({
  badge = "Video Production & AI Content",
  title = "The fastest way to create\nprofessional videos for your brand",
  subtitle = "We craft authentic, high-performing video content that captivates your audience and drives real results.",
  primaryAction,
  cards = [],
}: HoloHeroProps) {
  const display = cards.length > 0 ? cards : DEFAULT_CARDS;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "#07070e",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "0px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          marginTop: "80px",
          textAlign: "center",
          zIndex: 10,
          position: "relative",
        }}
      >
        {badge && (
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#a855f7",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            {badge}
          </div>
        )}

        {title && (
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
              marginBottom: "24px",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </h1>
        )}

        {subtitle && (
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.6)",
              maxWidth: "600px",
              margin: "0 auto 40px auto",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}

        {primaryAction && (
          <motion.button
            whileHover={{ scale: 1.06 }}
            onClick={primaryAction.onClick}
            style={{
              padding: "16px 40px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #a855f7 0%, #ec4899 55%, #f97316 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              border: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              boxShadow: "0 14px 44px rgba(168,85,247,0.5)",
              margin: "0 auto",
            }}
          >
            {primaryAction.label}
            <ArrowRight size={18} />
          </motion.button>
        )}
      </div>

      <CylinderCarousel cards={display} marginTopOverride="-160px" />
    </section>
  );
}

function CylinderCarousel({ cards, marginTopOverride }: { cards: VideoCard[]; marginTopOverride?: string }) {
  const cylinderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);

  // We need enough cards to form a smooth immersive 3D cylinder wall.
  // We duplicate the cards until we have at least 18 cards to create a very tight, circular wall.
  const minCards = 18; // Smaller physical circle = sharper arc curve
  const multiplier = Math.max(1, Math.ceil(minCards / cards.length));
  const totalCards = cards.length * multiplier;

  const displayCards: VideoCard[] = [];
  for (let i = 0; i < multiplier; i++) {
    displayCards.push(...cards);
  }

  // 3D Geometry
  const theta = 360 / totalCards;
  // Calculate exact radius required so the cards form a seamless circle
  const radius = Math.round(
    (CARD_W + GAP) / 2 / Math.tan((Math.PI * 2) / (totalCards * 2)),
  );

  useEffect(() => {
    const cylinder = cylinderRef.current;
    if (!cylinder) return;

    const tick = () => {
      // Always rotate — no pause on hover
      angleRef.current -= SPEED * 0.08;
      cylinder.style.transform = `translateZ(${radius - 300}px) rotateY(${angleRef.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius]);

  // Pure mathematical rendering without any custom scale hacks.
  // Shrinking the perspective and forcing the Z-depth pushes the CSS engine
  // to organically scale the cylinder wall smoothly along the elliptical arc.

  return (
    <div
      style={{
        width: "100%",
        height: `${CARD_H + 280}px`,
        marginTop: marginTopOverride ?? "0px",
        // A much shorter perspective creates an extreme fisheye/ultra-wide angle lens.
        // This forces the top and bottom edges of the cylinder to bow heavily, rounding the arc.
        perspective: "380px",
        perspectiveOrigin: "center center",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div
        ref={cylinderRef}
        style={{
          width: CARD_W,
          height: CARD_H,
          position: "relative",
          // preserve-3d ensures the cards physically bow out into space
          transformStyle: "preserve-3d",
          // Initialize at the exact translated coordinate to prevent render-pop
          transform: `translateZ(${radius - 300}px)`,
          willChange: "transform",
        }}
      >
        {displayCards.map((card, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: CARD_W,
              height: CARD_H,
              // Fan cards out in a pure U-circle mapping. No arbitrary scalar noise.
              transform: `rotateY(${i * theta}deg) translateZ(${-radius}px)`,
              backfaceVisibility: "hidden",
              transformOrigin: "center center",
            }}
          >
            <VideoTile card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoTile({ card }: { card: VideoCard }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  const isVideo = Boolean(card.src && card.src.endsWith(".mp4"));

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHover(false);
        videoRef.current?.pause();
      }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "18px",
        overflow: "hidden",
        position: "relative",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        backfaceVisibility: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        boxShadow: hover
          ? "0 0 0 1px rgba(255,255,255,0.20), 0 20px 60px rgba(0,0,0,0.7)"
          : "none",
      }}
    >
      {/* Background image always shown */}
      {card.image && (
        <img
          src={card.image}
          alt={card.label || ""}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.4s ease",
            opacity: hover && isVideo ? 0 : 1,
          }}
        />
      )}

      {/* Video plays on hover */}
      {isVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <source src={card.src} type="video/mp4" />
        </video>
      )}

      {/* Bottom gradient + label */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />

      {card.label && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "14px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            {card.label}
          </span>
        </div>
      )}
    </div>
  );
}
