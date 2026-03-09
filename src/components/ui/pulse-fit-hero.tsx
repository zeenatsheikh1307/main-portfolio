import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationItem {
    label: string;
    hasDropdown?: boolean;
    onClick?: () => void;
}

interface ProgramCard {
    image: string;
    category: string;
    title: string;
    onClick?: () => void;
}

interface PulseFitHeroProps {
    logo?: string;
    navigation?: NavigationItem[];
    ctaButton?: {
        label: string;
        onClick: () => void;
    };
    title: string;
    subtitle: string;
    primaryAction?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    disclaimer?: string;
    socialProof?: {
        avatars: string[];
        text: string;
    };
    programs?: ProgramCard[];
    className?: string;
    children?: React.ReactNode;
    /** Hide the built-in header when the page already has its own Navigation */
    showHeader?: boolean;
}

export function PulseFitHero({
    logo = "PulseFit",
    navigation = [
        { label: "Features" },
        { label: "Programs", hasDropdown: true },
        { label: "Testimonials" },
        { label: "Pricing" },
        { label: "Contact" },
    ],
    ctaButton,
    title,
    subtitle,
    primaryAction,
    secondaryAction,
    disclaimer,
    socialProof,
    programs = [],
    className,
    children,
    showHeader = true,
}: PulseFitHeroProps) {
    return (
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col overflow-hidden",
                className
            )}
            style={{
                background: "radial-gradient(circle at top, #1a1525 0%, #0a0a0f 60%, #0a0a0f 100%)",
            }}
            role="banner"
            aria-label="Hero section"
        >
            {/* Header — hidden when page already has its own Navigation */}
            {showHeader && (
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-20 flex flex-row justify-between items-center px-8 lg:px-16"
                    style={{ paddingTop: "32px", paddingBottom: "32px" }}
                >
                    {/* Logo */}
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "24px", color: "#FFFFFF" }}>
                        {logo}
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex flex-row items-center gap-8" aria-label="Main navigation">
                        {navigation.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className="flex flex-row items-center gap-1 hover:opacity-70 transition-opacity"
                                style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 400, color: "#a1a1aa" }}
                            >
                                {item.label}
                                {item.hasDropdown && (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    {ctaButton && (
                        <button
                            onClick={ctaButton.onClick}
                            className="px-6 py-3 rounded-full transition-all hover:scale-105"
                            style={{
                                background: "#18181b",
                                border: "1px solid #27272a",
                                fontFamily: "Inter, sans-serif",
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "#FFFFFF",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            {ctaButton.label}
                        </button>
                    )}
                </motion.header>
            )}

            {/* Main Content */}
            {children ? (
                <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                    {children}
                </div>
            ) : (
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center text-center max-w-4xl"
                        style={{ gap: "32px" }}
                    >
                        {/* Title */}
                        <h1
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                fontSize: "clamp(36px, 6vw, 72px)",
                                lineHeight: "1.05",
                                color: "#FFFFFF",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            {title}
                        </h1>

                        {/* Subtitle */}
                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 400,
                                fontSize: "clamp(16px, 2vw, 20px)",
                                lineHeight: "1.6",
                                color: "#a1a1aa",
                                maxWidth: "600px",
                            }}
                        >
                            {subtitle}
                        </p>

                        {/* Action Buttons */}
                        {(primaryAction || secondaryAction) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-col sm:flex-row items-center gap-4"
                            >
                                {primaryAction && (
                                    <button
                                        onClick={primaryAction.onClick}
                                        className="flex flex-row items-center gap-2 px-8 py-4 rounded-full transition-all hover:scale-105"
                                        style={{
                                            background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                                            fontFamily: "Inter, sans-serif",
                                            fontSize: "18px",
                                            fontWeight: 600,
                                            color: "#FFFFFF",
                                            boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
                                        }}
                                    >
                                        {primaryAction.label}
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}

                                {secondaryAction && (
                                    <button
                                        onClick={secondaryAction.onClick}
                                        className="px-8 py-4 rounded-full transition-all hover:scale-105"
                                        style={{
                                            background: "transparent",
                                            border: "1px solid #3f3f46",
                                            fontFamily: "Inter, sans-serif",
                                            fontSize: "18px",
                                            fontWeight: 500,
                                            color: "#a1a1aa",
                                        }}
                                    >
                                        {secondaryAction.label}
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {/* Disclaimer */}
                        {disclaimer && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 400, color: "#71717a", fontStyle: "italic" }}
                            >
                                {disclaimer}
                            </motion.p>
                        )}

                        {/* Social Proof */}
                        {socialProof && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="flex flex-row items-center gap-3"
                            >
                                <div className="flex flex-row -space-x-2">
                                    {socialProof.avatars.map((avatar, index) => (
                                        <img
                                            key={index}
                                            src={avatar}
                                            alt={`User ${index + 1}`}
                                            className="rounded-full border-2 border-white"
                                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                        />
                                    ))}
                                </div>
                                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#a1a1aa" }}>
                                    {socialProof.text}
                                </span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Program Cards Carousel */}
            {programs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative z-10 w-full overflow-hidden"
                    style={{ paddingTop: "60px", paddingBottom: "60px" }}
                >
                    {/* Gradient Overlays for smooth scrolling edges */}
                    <div
                        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
                        style={{ width: "200px", background: "linear-gradient(90deg, #0a0a0f 0%, rgba(10,10,15,0) 100%)" }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
                        style={{ width: "200px", background: "linear-gradient(270deg, #0a0a0f 0%, rgba(10,10,15,0) 100%)" }}
                    />

                    {/* Scrolling Container */}
                    <motion.div
                        className="flex items-center"
                        animate={{ x: [0, -((programs.length * 380) / 2)] }}
                        transition={{
                            x: { repeat: Infinity, repeatType: "loop", duration: programs.length * 3, ease: "linear" },
                        }}
                        style={{ gap: "24px", paddingLeft: "24px" }}
                    >
                        {[...programs, ...programs].map((program, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                                onClick={program.onClick}
                                className="flex-shrink-0 cursor-pointer relative overflow-hidden"
                                style={{ width: "356px", height: "480px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255,255,255,0.05)" }}
                            >
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.85) 100%)" }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                        {program.category}
                                    </span>
                                    <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 600, color: "#FFFFFF", lineHeight: "1.3" }}>
                                        {program.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
