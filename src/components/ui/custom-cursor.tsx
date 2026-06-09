import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    const [cursorText, setCursorText] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Detect mobile
        const isMobile = window.matchMedia("(max-width: 768px)").matches ||
            ("ontouchstart" in window) ||
            (navigator.maxTouchPoints > 0);

        if (isMobile) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // GSAP quickTo for smooth performance
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

        const fxTo = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3" });
        const fyTo = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            xTo(e.clientX);
            yTo(e.clientY);
            fxTo(e.clientX);
            fyTo(e.clientY);

            // Check for data-cursor attributes
            const target = e.target as HTMLElement;
            const cursorTarget = target.closest("[data-cursor]") as HTMLElement;

            if (cursorTarget) {
                setCursorText(cursorTarget.getAttribute("data-cursor") || "");
                setIsActive(true);
            } else {
                setCursorText("");
                // ONLY trigger active state if explicitly marked with data-cursor
                setIsActive(false);
            }
        };

        const handleMouseDown = () => gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
        const handleMouseUp = () => gsap.to([cursor, follower], { scale: 1, duration: 0.2 });

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible]);

    if (typeof window !== "undefined" && (window.matchMedia("(max-width: 768px)").matches)) {
        return null;
    }

    return (
        <>
            <style>{`
        * { cursor: none !important; }
        a, button, [role='button'], input, textarea, select { 
          cursor: pointer !important; 
        }
        [data-cursor], [data-cursor] * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * { cursor: auto !important; }
        }
      `}</style>

            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transform: "translate(-50%, -50%)" }}
            />

            <div
        ref={followerRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out mix-blend-difference ${isVisible ? "opacity-100" : "opacity-0"} ${isActive ? "w-20 h-20 bg-white" : "w-10 h-10 border border-white/30"}`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <span
          ref={labelRef}
          className={`text-[10px] uppercase font-bold tracking-widest text-black transition-opacity duration-200 ${cursorText ? "opacity-100" : "opacity-0"}`}
        >
          {cursorText}
        </span>
      </div>
        </>
    );
};

export default CustomCursor;
