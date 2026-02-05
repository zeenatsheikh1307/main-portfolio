import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../pages/assets/assests/cropped-WhatsApp_Image_2024-12-02_at_14.02.28_62850caf-removebg-preview.png";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownWrapRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    {
      path: "/services",
      label: "Services",
      dropdown: [
        { path: "/ads-service", label: "Ads / Performance Marketing" },
        { path: "/video-services", label: "Video Editing & Production" },
        { path: "/web-services", label: "Web Development" },
        { path: "/social-services", label: "Social Media Marketing" },
      ],
    },
    { path: "/about-us", label: "About" },
    { path: "/team", label: "Team" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll for mobile
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // close dropdown on outside click (desktop only)
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (mobileOpen) return;
      if (!dropdownWrapRef.current) return;
      if (!dropdownWrapRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [mobileOpen]);

  // ESC closes mobile
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (path?: string) =>
    path ? location.pathname === path : false;
  const isServicesActive =
    location.pathname.startsWith("/services") ||
    location.pathname.includes("-services") ||
    location.pathname.includes("ads-service") ||
    location.pathname.includes("social-services") ||
    location.pathname.includes("video-services") ||
    location.pathname.includes("web-services");

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 md:pt-6"
    >
      <style>{`
        :root{
          --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Main shell */
        .mb-nav {
          width: min(1320px, calc(100% - 32px));
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow: 0 8px 30px rgba(20,20,40,0.06);
          transition: 
            width 600ms var(--ease-premium),
            padding 600ms var(--ease-premium),
            border-radius 600ms var(--ease-premium),
            background 600ms var(--ease-premium),
            box-shadow 600ms var(--ease-premium),
            transform 600ms var(--ease-premium);
          will-change: width, padding, border-radius, transform;
          border-radius: 18px;
          padding: 10px 20px;
          transform: translateY(-10px);
        }

        /* Shrink state: smaller, pill, more “tight” */
        @media (min-width: 768px){
          .mb-nav { padding: 10px 32px; transform: translateY(-16px); }
          .mb-nav.mb-nav--shrink{
            width: min(900px, calc(100% - 32px));
            border-radius: 999px;
            padding: 8px 32px;
            background: rgba(255,255,255,0.70);
            box-shadow: 0 18px 45px rgba(20,20,40,0.10);
          }
        }

        /* Mobile shrink: subtle only */
        @media (max-width: 767px){
          .mb-nav.mb-nav--shrink{
            border-radius: 16px;
            background: rgba(255,255,255,0.72);
            box-shadow: 0 14px 34px rgba(20,20,40,0.08);
          }
        }

        /* Link underline animation */
        .mb-link{
          position: relative;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: transform 220ms var(--ease-premium), opacity 220ms var(--ease-premium), color 220ms var(--ease-premium);
        }
        .mb-link:hover{ transform: translateY(-1px); opacity: 0.9; }

        .mb-link::after{
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 4px;
          height: 2px;
          border-radius: 99px;
          background: rgba(37, 99, 235, 0.95);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 320ms var(--ease-premium);
        }
        .mb-link.active{
          color: rgb(37 99 235);
          font-weight: 700;
        }
        .mb-link.active::after{ transform: scaleX(1); }

        .mb-nav-links-container {
          gap: 2.25rem;
          transition: gap 600ms var(--ease-premium);
        }
        .mb-nav--shrink .mb-nav-links-container {
          gap: 1.25rem;
        }

        .mb-dropdown{
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(10px) scale(0.95);
          top: calc(100% + 12px);
          width: 320px;
          opacity: 0;
          visibility: hidden;
          transition: 
            opacity 300ms var(--ease-premium),
            transform 300ms var(--ease-premium),
            visibility 300ms var(--ease-premium);
          transform-origin: top center;
          z-index: 100;
        }
        .mb-dropdown.is-open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        /* Move the needle button effect */
        .mb-btn-needle {
          background: conic-gradient(from 180deg at 50% 50%, #2BC0E4 0deg, #4300FF 120deg, #FF0066 240deg, #2BC0E4 360deg);
          background-size: 200% 200%;
          animation: gradient-x 6s infinite alternate;
          transition: all 400ms var(--ease-premium);
        }
        .mb-btn-needle:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(67, 0, 255, 0.25);
          filter: brightness(1.1);
        }

        @keyframes gradient-x { 
          0%{ background-position: 0% 50%; } 
          100%{ background-position: 100% 50%; } 
        }

        /* 3D Logo Pop */
        .mb-logo-wrap {
          perspective: 1000px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .mb-logo-3d {
          transition: transform 400ms var(--ease-premium), filter 400ms var(--ease-premium), box-shadow 400ms var(--ease-premium);
          transform-style: preserve-3d;
        }
        .mb-logo-wrap:hover .mb-logo-3d {
          transform: translateZ(30px) scale(1.15) rotateY(-5deg);
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15));
        }

        @media (prefers-reduced-motion: reduce){
          .mb-nav, .mb-link, .mb-link::after, .mb-logo-3d { transition: none !important; }
          .mb-dropdown{ animation: none !important; }
        }
      `}</style>

      <div className={`mb-nav relative z-[70] ${scrolled ? "mb-nav--shrink" : ""}`}>
        {/* Grid layout: Left / Center / Right */}
        <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-3">
          {/* LEFT: Brand */}
          <Link to="/" className="mb-logo-wrap">
            <img
              src={logo}
              alt="MetaBull"
              className={`mb-logo-3d object-contain transition-all duration-500`}
              style={{
                width: scrolled ? 48 : 56,
                height: scrolled ? 48 : 56,
              }}
            />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[18px] tracking-[-0.02em] text-[#181C32] truncate">
                MetaBull
              </span>
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#181C32]/60 uppercase">
                Universe
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Links */}
          <div className="hidden md:flex items-center justify-center mb-nav-links-container">
            <Link
              to="/"
              className={`mb-link text-[#181C32] ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>

            <div
              ref={dropdownWrapRef}
              className="relative"
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`mb-link text-[#181C32] ${isServicesActive ? "active" : ""}`}
                style={{ background: "transparent", border: "none" }}
                onClick={() =>
                  setOpenDropdown((p) => (p === "services" ? null : "services"))
                }
                aria-haspopup="menu"
                aria-expanded={openDropdown === "services"}
              >
                <span className="inline-flex items-center gap-1.5">
                  Services
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${openDropdown === "services" ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              <div
                className={`mb-dropdown rounded-2xl border border-black/5 bg-white/90 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] p-2 ${openDropdown === "services" ? "is-open" : ""}`}
                role="menu"
              >
                <div className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-[0.14em] text-gray-400 uppercase">
                  Services
                </div>

                <div className="flex flex-col">
                  {navLinks
                    .find((l) => l.label === "Services")
                    ?.dropdown?.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="group flex items-center justify-between gap-3 rounded-xl px-3 py-3 hover:bg-black/5 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="flex flex-col">
                          <span className="text-[14px] font-semibold text-[#181C32]">
                            {item.label}
                          </span>
                          <span className="text-[12px] text-gray-500 group-hover:text-gray-600">
                            Explore details & pricing
                          </span>
                        </div>
                        <span className="text-gray-400 group-hover:text-gray-700 transition-colors">
                          →
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <Link
              to="/about-us"
              className={`mb-link text-[#181C32] ${isActive("/about-us") ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              to="/team"
              className={`mb-link text-[#181C32] ${isActive("/team") ? "active" : ""}`}
            >
              Team
            </Link>
          </div>

          {/* RIGHT: CTA + Mobile Menu */}
          <div className="flex items-center justify-end gap-2">
            <Link
              to="/contact"
              className={`mb-btn-needle hidden md:inline-flex items-center justify-center px-6 py-2.5 text-[14px] font-bold text-white shadow-lg transition-all duration-[600ms] ${scrolled ? 'rounded-full' : 'rounded-2xl'
                }`}
            >
              Get Started
            </Link>

            <button
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-black/5 bg-white/80 backdrop-blur-xl shadow-sm active:scale-95 transition text-black"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* overlay */}
        <div
          className="absolute inset-0 bg-black/25"
          onClick={() => setMobileOpen(false)}
        />

        {/* panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-[360px]
            bg-white/85 backdrop-blur-2xl border-l border-white/40
            shadow-[0_30px_80px_rgba(0,0,0,0.35)]
            transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="pt-20 px-5 pb-6 flex flex-col gap-2">
            <div className="text-[12px] uppercase tracking-[0.18em] text-gray-400 font-semibold px-2 pb-2">
              Menu
            </div>

            {/* Top links */}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between rounded-2xl px-4 py-4 border border-black/5 bg-white/60 hover:bg-white transition`}
            >
              <span className="font-semibold text-[#181C32]">Home</span>
              <span className="text-gray-400">→</span>
            </Link>

            {/* Services accordion */}
            <div className="rounded-2xl border border-black/5 bg-white/60 overflow-hidden">
              <button
                onClick={() =>
                  setOpenDropdown((p) =>
                    p === "m_services" ? null : "m_services",
                  )
                }
                className="w-full flex items-center justify-between px-4 py-4"
              >
                <span className="font-semibold text-[#181C32]">Services</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${openDropdown === "m_services" ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${openDropdown === "m_services"
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden px-2 pb-3">
                  {navLinks
                    .find((l) => l.label === "Services")
                    ?.dropdown?.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setMobileOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-black/5 transition"
                      >
                        <span className="text-[14px] font-semibold text-[#181C32]">
                          {item.label}
                        </span>
                        <span className="text-gray-400">→</span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <Link
              to="/about-us"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-4 border border-black/5 bg-white/60 hover:bg-white transition"
            >
              <span className="font-semibold text-[#181C32]">About</span>
              <span className="text-gray-400">→</span>
            </Link>

            <Link
              to="/team"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-4 border border-black/5 bg-white/60 hover:bg-white transition"
            >
              <span className="font-semibold text-[#181C32]">Team</span>
              <span className="text-gray-400">→</span>
            </Link>

            <div className="pt-4">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mb-btn-needle w-full inline-flex items-center justify-center rounded-2xl px-5 py-4 text-[15px] font-bold text-white shadow-lg active:scale-[0.98]"
              >
                Get Started
              </Link>
              <p className="text-[12px] text-gray-500 mt-3 px-1">
                Quick reply, clear process, premium delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navigation;
