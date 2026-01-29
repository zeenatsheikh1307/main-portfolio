// LightRays.tsx
import React, { useEffect, useRef } from "react";

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;        // hex or css color
  raysSpeed?: number;        // 0.5 (slow) … 3 (fast)
  lightSpread?: number;      // 0.5 … 2 (wider = broader rays)
  rayLength?: number;        // 0.5 … 2 (how far they reach)
  pulsating?: boolean;       // subtle pulse
  followMouse?: boolean;     // parallax towards mouse
  className?: string;        // extra classes for wrapper
  // The rest of old props are accepted but ignored in this “normal” version:
  fadeDistance?: number;
  saturation?: number;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
}

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

const originToAnchor = (origin: RaysOrigin): { x: number; y: number } => {
  switch (origin) {
    case "top-left":
      return { x: 0.05, y: 0.0 };
    case "top-right":
      return { x: 0.95, y: 0.0 };
    case "left":
      return { x: 0.0, y: 0.5 };
    case "right":
      return { x: 1.0, y: 0.5 };
    case "bottom-left":
      return { x: 0.05, y: 1.0 };
    case "bottom-center":
      return { x: 0.5, y: 1.0 };
    case "bottom-right":
      return { x: 0.95, y: 1.0 };
    default: // "top-center"
      return { x: 0.5, y: 0.0 };
  }
};

const toRGBA = (c: string, a: number) => {
  // supports named, rgb/rgba, hex (#fff/#ffffff)
  if (c.startsWith("rgb")) return c.replace(")", `, ${a})`).replace("rgb(", "rgba(");
  if (c.startsWith("#")) {
    let r = 255, g = 255, b = 255;
    const hex = c.replace("#", "");
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  // named colors -> let browser resolve via CSS var trick
  return `color-mix(in srgb, ${c} ${a * 100}%, transparent)`;
};

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 1.2,
  pulsating = false,
  followMouse = true,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial anchor based on origin
    const { x, y } = originToAnchor(raysOrigin);
    el.style.setProperty("--lx", `${x}`);
    el.style.setProperty("--ly", `${y}`);

    // Spread & length knobs
    el.style.setProperty("--spread", `${clamp(lightSpread, 0.4, 2)}`);
    el.style.setProperty("--len", `${clamp(rayLength, 0.4, 2)}`);

    // Colors
    el.style.setProperty("--c1", toRGBA(raysColor, 0.35));
    el.style.setProperty("--c2", toRGBA(raysColor, 0.14));
    el.style.setProperty("--c3", toRGBA(raysColor, 0.07));

    // Animate rotation with rAF (motion-safe)
    let t0 = performance.now();
    const loop = (t: number) => {
      const dt = (t - t0) / 1000;
      t0 = t;
      // 30 deg/sec at speed=1
      const deg = (parseFloat(getComputedStyle(el).getPropertyValue("--deg")) || 0)
        + 30 * raysSpeed * dt;
      el.style.setProperty("--deg", `${deg % 360}`);
      if (pulsating) {
        const pulse = 0.85 + 0.15 * Math.sin(t * 0.003 * (0.8 + raysSpeed));
        el.style.setProperty("--pulse", `${pulse}`);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      el.style.setProperty("--deg", `0`);
      el.style.setProperty("--pulse", `1`);
    }

    // Mouse follow -> update anchor smoothly
    const onMove = (e: MouseEvent) => {
      if (!followMouse) return;
      const rect = el.getBoundingClientRect();
      const mx = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const my = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      // lerp towards mouse so it feels smooth
      const curx = parseFloat(getComputedStyle(el).getPropertyValue("--lx")) || x;
      const cury = parseFloat(getComputedStyle(el).getPropertyValue("--ly")) || y;
      el.style.setProperty("--lx", `${curx * 0.92 + mx * 0.08}`);
      el.style.setProperty("--ly", `${cury * 0.92 + my * 0.08}`);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, followMouse]);

  return (
    <div
      ref={ref}
      className={[
        "relative pointer-events-none",
        "w-full h-full overflow-hidden",
        className,
      ].join(" ")}
      // CSS custom properties defaults
      style={{
        // anchor (0..1 normalized)
        // @ts-ignore
        "--lx": 0.5,
        "--ly": 0.0,
        "--deg": 0,
        "--pulse": 1,
        "--spread": 1,
        "--len": 1.2,
        // colors
        // @ts-ignore
        "--c1": toRGBA(raysColor, 0.35),
        // @ts-ignore
        "--c2": toRGBA(raysColor, 0.14),
        // @ts-ignore
        "--c3": toRGBA(raysColor, 0.07),
      } as React.CSSProperties}
    >
      {/* Layer stack: subtle gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.03), transparent 60%)",
        }}
      />

      {/* Rays layer — conic gradients masked from an anchor point */}
      <div
        aria-hidden
        className="absolute inset-[-20%] mix-blend-screen"
        style={{
          transform: "translate3d(0,0,0)",
          // rotation animates with --deg
          willChange: "transform, opacity",
          opacity: "var(--pulse)",
          maskImage: `radial-gradient(
            circle at calc(var(--lx) * 100%) calc(var(--ly) * 100%),
            black calc(10% * var(--len)), transparent 90%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle at calc(var(--lx) * 100%) calc(var(--ly) * 100%),
            black calc(10% * var(--len)), transparent 90%
          )`,
          background: `
            conic-gradient(
              from calc(var(--deg) * 1deg) at calc(var(--lx) * 100%) calc(var(--ly) * 100%),
              transparent 0deg,
              var(--c1) calc(6deg * var(--spread)),
              transparent calc(12deg * var(--spread)),
              var(--c2) calc(18deg * var(--spread)),
              transparent calc(24deg * var(--spread)),
              var(--c1) calc(30deg * var(--spread)),
              transparent 60deg
            ),
            conic-gradient(
              from calc((var(--deg) + 90) * 1deg) at calc(var(--lx) * 100%) calc(var(--ly) * 100%),
              transparent 0deg,
              var(--c3) calc(8deg * var(--spread)),
              transparent calc(16deg * var(--spread)),
              var(--c2) calc(24deg * var(--spread)),
              transparent 60deg
            )
          `,
          filter: "blur(24px) brightness(1.15)",
        }}
      />

      {/* soft bloom */}
      <div
        aria-hidden
        className="absolute inset-[-10%]"
        style={{
          background: `radial-gradient(
            60% 60% at calc(var(--lx) * 100%) calc(var(--ly) * 100%),
            ${toRGBA(raysColor, 0.15)} 0%,
            transparent 70%
          )`,
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};

export default LightRays;
