import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface VideoCard {
    src: string;
    label?: string;
}

interface HoloHeroProps {
    badge?: string;
    title?: string;
    subtitle?: string;
    primaryAction?: {
        label: string;
        onClick: () => void;
    };
    cards?: VideoCard[];
}

// Base card dimensions
const CARD_W = 190;
const CARD_H = 310;
const GAP = 16;
const SPEED = 1.3;

export function HoloHero({
    badge = "Video Production & AI Content",
    title = "The fastest way to create professional videos for your brand",
    subtitle =
    "We craft authentic, high-performing video content that captivates your audience and drives real results. From concept to delivery.",
    primaryAction,
    cards = [],
}: HoloHeroProps) {
    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                background: "#08080f",
                paddingBottom: "64px",
                display: "flex",
                flexDirection: "column",
            }}
            role="banner"
            aria-label="Hero section"
        >
            {/* ── Text Block ── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "88px 16px 0px", // Reduced bottom padding to bring cards closer
                }}
            >
                {/* Pill badge */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        borderRadius: "999px",
                        padding: "6px 18px",
                        marginBottom: "26px",
                        background: "#fff",
                        border: "1.5px solid transparent",
                        backgroundImage:
                            "linear-gradient(#fff,#fff),linear-gradient(135deg,#a855f7,#ec4899,#f97316)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box,border-box",
                        boxShadow: "0 2px 16px rgba(168,85,247,0.14)",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Inter,sans-serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            background: "linear-gradient(135deg,#a855f7,#ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {badge}
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    style={{
                        fontFamily: "Inter,sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(28px,4.8vw,62px)",
                        lineHeight: 1.07,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        maxWidth: "720px",
                        margin: "0 auto",
                    }}
                >
                    {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.16 }}
                    style={{
                        fontFamily: "Inter,sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(13px,1.5vw,18px)",
                        lineHeight: 1.72,
                        color: "#aaa",
                        maxWidth: "480px",
                        margin: "18px auto 0",
                    }}
                >
                    {subtitle}
                </motion.p>

                {/* CTA */}
                {primaryAction && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.93 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.28 }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={primaryAction.onClick}
                        style={{
                            marginTop: "32px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "13px 30px",
                            borderRadius: "999px",
                            background: "linear-gradient(135deg,#a855f7 0%,#ec4899 100%)",
                            color: "#fff",
                            fontFamily: "Inter,sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            boxShadow: "0 8px 26px rgba(168,85,247,0.3)",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        {primaryAction.label}
                        <ArrowRight style={{ width: 18, height: 18, strokeWidth: 2.5 }} />
                    </motion.button>
                )}
            </div>

            {/* ── Marquee Strip ── */}
            {cards.length > 0 && <HoloMarquee cards={cards} />}
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   Marquee with JS-driven viewport-position scaling
────────────────────────────────────────────────────────── */
function HoloMarquee({ cards }: { cards: VideoCard[] }) {
    const stripRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);
    const pausedRef = useRef(false);
    const rafRef = useRef<number>(0);

    // Duplicate enough to fill viewport + loop seamlessly
    const looped = [...cards, ...cards, ...cards, ...cards, ...cards];

    // Calculate single-set width (card + gap) × original card count
    const singleW = cards.length * (CARD_W + GAP);

    const applyScales = useCallback(() => {
        const track = trackRef.current;
        const strip = stripRef.current;
        if (!track || !strip) return;

        const vw = window.innerWidth;
        const vcx = vw / 2;

        const stripRect = strip.getBoundingClientRect();
        const startX = stripRect.left - posRef.current;

        const cardEls = track.children;
        for (let i = 0; i < cardEls.length; i++) {
            const el = cardEls[i] as HTMLElement;

            const untransformedLeft = startX + (i * (CARD_W + GAP));
            const cardCx = untransformedLeft + (CARD_W / 2);

            // Normalized distance: 0 at center, 1 at viewport edge
            const normalizedDist = (cardCx - vcx) / (vw / 2);
            const distAbs = Math.abs(normalizedDist);
            const sign = Math.sign(normalizedDist);

            // To mimic the exact 7-card shape, we break the screen into 3 zones radially
            // Zone 1: Center (distAbs < 0.25) -> Flat, minimal scaling
            // Zone 2: Mid-Edge (0.25 < distAbs < 0.6) -> Gentle slope up
            // Zone 3: Far Edge (distAbs > 0.6) -> Aggressive spike

            let scale = 0.7; // Base size for center 3 cards
            let translateX = 0;
            let rotateY = 0;

            if (distAbs > 0.15) {
                // Smooth exponential curve pushing cards outwards and scaling them up
                // Start growing slowly, then ramp up fast towards edges
                const curve = Math.pow(distAbs - 0.15, 1.8);
                scale = 0.7 + (curve * 2.5);

                // Rotation increases the further out they go
                rotateY = sign * curve * -90;

                // Very importantly, push the outward cards AWAY from the center
                // so they don't crush the center cards when they scale up
                translateX = sign * curve * 400;
            }

            el.style.transform = `translate(${translateX}px, 0px) scale(${scale}) rotateY(${rotateY}deg)`;
            el.style.transformOrigin = "center center";

            // The huge edge cards must be visually above the flat center cards
            el.style.zIndex = distAbs > 0.4 ? "2" : "1";
        }
    }, [GAP]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const animate = () => {
            if (!pausedRef.current) {
                posRef.current += SPEED;
                if (posRef.current >= singleW) {
                    posRef.current -= singleW;
                }
                track.style.transform = `translateX(-${posRef.current}px)`;
            }
            applyScales();
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [singleW, applyScales]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            ref={stripRef}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
            style={{
                width: "100%",
                marginTop: "-100px", // Pull up even more to engulf text block
                overflow: "hidden",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                maskImage:
                    "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                perspective: "1100px",
                // Increase height so the 2.2x scaled cards (310 * 2.2 = 682) don't get cropped
                height: `${Math.round(CARD_H * 2.2) + 120}px`,
                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    gap: `${GAP}px`,
                    width: "max-content",
                    alignItems: "center",  // center-align cards
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                {looped.map((card, i) => (
                    <MarqueeCard key={i} card={card} />
                ))}
            </div>
        </motion.div>
    );
}

/* ──────────────────────────────────────────────────────────
   Single card (scale applied from parent JS loop)
────────────────────────────────────────────────────────── */
function MarqueeCard({ card }: { card: VideoCard }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => {
                setHovered(true);
                videoRef.current?.play().catch(() => { });
            }}
            onMouseLeave={() => {
                setHovered(false);
                videoRef.current?.pause();
            }}
            style={{
                flexShrink: 0,
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                borderRadius: "16px",
                overflow: "hidden",
                border: "2.5px solid rgba(255,255,255,0.9)",
                boxShadow: hovered
                    ? "0 24px 44px rgba(0,0,0,0.22)"
                    : "0 6px 20px rgba(0,0,0,0.14)",
                background: "#1a1a1a",
                cursor: "pointer",
                position: "relative",
                transition: "box-shadow 0.25s ease",
            }}
        >
            <video
                ref={videoRef}
                muted
                playsInline
                loop
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                }}
            >
                <source src={card.src} type="video/mp4" />
            </video>

            {card.label && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "28px 10px 10px",
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "Inter,sans-serif",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                        }}
                    >
                        {card.label}
                    </span>
                </div>
            )}
        </div>
    );
}
