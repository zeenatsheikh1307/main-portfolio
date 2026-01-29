// Navigation.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Settings,
    Code,
    Video,
    Share2,
    Mail,
    Menu,
    X,
    ChevronDown,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import logo from "../pages/assets/assests/cropped-WhatsApp_Image_2024-12-02_at_14.02.28_62850caf-removebg-preview.png";

/**
 * Key fixes:
 * - True 3-zone layout: Brand (left), perfectly centered links (middle), CTA (right)
 * - Even spacing & same visual weight for all links (no oversized "Home" chip)
 * - Slim active underline + soft border (subtle, premium)
 * - Services dropdown centered under its trigger; no layout shift
 * - Mobile: clean drawer, sections tidy
 */

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    const navLinks = [
        { path: "/", label: "Home", icon: Home },
        {
            path: "/services",
            label: "Services",
            icon: Settings,
            dropdown: [
                { path: "/web-services", label: "Web Development", icon: Code },
                { path: "/ads-service", label: "Ads / Performance Marketing", icon: Share2 },
                { path: "/video-services", label: "Video Editing & Production", icon: Video },
                { path: "/social-services", label: "Social Media Marketing", icon: Share2 },
            ],
        },
        { path: "/about-us", label: "About Us" },
        { path: "/team", label: "Team" },
        // Contact removed from the central nav; CTA button on the right still links to /contact
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // outside click to close dropdown
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            // If mobile drawer is open, ignore document-level outside clicks here
            // because mobile drawer handles its own close logic. Closing the
            // desktop dropdown on mousedown stole the click from mobile submenu
            // links (their DOM was removed before the click event), preventing
            // navigation. Skipping when mobileOpen is true preserves the click.
            if (mobileOpen) return;
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [mobileOpen]);

    // lock body scroll for mobile
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    // close mobile drawer on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const isActive = (path?: string) => (path ? location.pathname === path : false);


    return (
        <nav aria-label="Primary" className={`fixed top-0 inset-x-0 z-50 flex justify-center items-start py-4 md:py-6 bg-transparent`}>
            <style>{`
        .navbar-ss {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid rgba(255, 255, 255, 0.5);
          padding: 0.55rem 1.5rem;
          max-width: 1320px;
          margin: 0 auto;
          position: relative;
          display: flex;
          gap: 1rem;
          align-items: center;
          width: 95%; /* Mobile width */
          min-height: 60px; /* Taller on mobile for better touch targets */
          transition: all 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @media (min-width: 768px) {
            .navbar-ss { width: 100%; min-height: 54px; padding: 0.55rem 3.5rem; }
        }
        
        /* Mobile specific adjustments */
        .mobile-glass-drawer {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .hamburger-line {
            height: 2px;
            width: 24px;
            background: #181C32;
            border-radius: 2px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        
        /* Animations */
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .navbar-logo-img { height: 2rem; width: 2rem; border-radius: 50%; transition: all 0.5s ease; }
          .navbar-ss.shrink { box-shadow: 0 4px 16px rgba(20,20,40,0.06); }
          @media (min-width: 768px) {
            .navbar-ss.shrink { padding: 0.55rem 1rem; max-width: 820px; border-radius: 16px; min-height: 54px; }
            .navbar-ss.shrink .navbar-logo-img { height: 1.5rem; width: 1.5rem; }
            .navbar-ss.shrink .navbar-ss-links { gap: 1.2rem; }
          }
        .navbar-ss-logo {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 1.08rem;
          letter-spacing: -0.01em;
          user-select: none;
        }
        .navbar-ss-brand {
          margin-left: 0.5rem;
          font-weight: 700;
          font-size: 1.15rem;
          color: #181C32;
          letter-spacing: -0.02em;
        }
        .navbar-ss-links {
          display: none;
          align-items: center;
          gap: 2.1rem;
          margin: 0 1rem 0 1rem;
          font-size: 1.01rem;
          font-weight: 400;
        }
        @media (min-width: 768px) {
          .navbar-ss { display: grid; grid-template-columns: auto 1fr auto; }
          .navbar-ss-links { display: flex; justify-self: center; position: static; transform: none; pointer-events: auto; z-index: 20; }
        }
        .navbar-ss-link {
          color: #181C32;
          text-decoration: none;
          font-weight: 400;
          letter-spacing: 0.01em;
          transition: all 0.2s;
          padding: 2px 0;
          position: relative;
        }
        .navbar-ss-link:hover { transform: translateY(-2px); opacity: 0.8; }
        .navbar-ss-link.active {
          color: #1A4DB3;
          font-weight: 600;
        }
        .navbar-ss-link.active::after {
          content: '';
          display: block;
          margin: 0 auto;
          margin-top: 2px;
          width: 50%;
          height: 2px;
          border-radius: 1.5px;
          background: #1A4DB3;
        }
        .navbar-ss-contact {
          background: #181C32;
          color: #fff;
          border-radius: 12px;
          padding: 0.6rem 1.4rem;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(24, 28, 50, 0.15);
        }
        .navbar-ss-contact:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(24, 28, 50, 0.25);
            background: #000;
        }
        
        @media (min-width: 768px) {
            .navbar-ss-contact {
              background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%);
              border-radius: 16px;
              padding: 0.5rem 2.1rem;
              font-size: 1.01rem;
              border: 1.5px solid rgba(168, 85, 247, 0.3);
              box-shadow: 0 2px 8px 0 rgba(168, 85, 247, 0.25), 0 0 20px rgba(168, 85, 247, 0.15);
            }
            .navbar-ss-contact:hover {
              background: linear-gradient(135deg, #c026d3 0%, #a855f7 50%, #8b5cf6 100%);
              border-color: rgba(192, 38, 211, 0.5);
              box-shadow: 0 4px 16px 0 rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.25);
            }
        }

          /* Lift animation */
          :root { --nav-lift-mobile: -10px; --nav-lift-desktop: -18px; }
          .navigation-lift { transform: translateY(var(--nav-lift-mobile)); transition: transform 280ms cubic-bezier(0.2,0.8,0.2,1); }
          @media (min-width: 768px) { .navigation-lift { transform: translateY(var(--nav-lift-desktop)); } }
        @media (prefers-reduced-motion: reduce) { .navigation-lift { transform: none !important; } }
        
        /* Dropdown entrance animation */
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-8px) scale(0.992); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dropdown-panel { animation: dropdownFade 260ms cubic-bezier(0.2,0.8,0.2,1) both; transform-origin: top center; }
        @media (prefers-reduced-motion: reduce) { .dropdown-panel { animation: none; } }
      `}</style>
            <div className={`navbar-ss ${scrolled ? 'shrink' : ''} navigation-lift`} style={{ width: '100%', zIndex: 1001 }}>
                <div style={{ display: 'flex', alignItems: 'center', minWidth: '0' }}>
                    <Link to="/" className="navbar-ss-logo" style={{ marginRight: '2.2rem' }}>
                        <img src={logo} alt="Logo" className="navbar-logo-img" />
                        <span className="navbar-ss-brand">Metabull</span>
                    </Link>
                </div>
                <div className="navbar-ss-links hidden md:flex" style={{ justifyContent: 'center', alignItems: 'center', minWidth: '0', position: 'relative' }}>
                    <Link to="/" className={`navbar-ss-link${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} onMouseEnter={() => setOpenDropdown('services')} onMouseLeave={() => setOpenDropdown(null)}>
                        <button type="button" className={`navbar-ss-link${location.pathname.startsWith('/services') ? ' active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} aria-haspopup="menu" aria-expanded={openDropdown === 'services'}>
                            Services
                            <ChevronDown size={14} className={openDropdown === 'services' ? 'rotate-180 transition-transform' : 'transition-transform'} />
                        </button>
                        {openDropdown === 'services' && (
                            <div className="dropdown-panel" style={{
                                position: 'absolute',
                                top: 'calc(100% - 5px)',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#fff',
                                border: '1px solid rgba(0,0,0,0.06)',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.1)',
                                padding: '0.5rem',
                                paddingTop: '1rem',
                                zIndex: 100,
                                minWidth: '280px',
                            }} onMouseLeave={() => setOpenDropdown(null)}>
                                <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expertise</div>
                                {/* Reusing existing logic for dropdown map logic simpler here */}
                                {[
                                    { path: "/web-services", label: "Web Development", Icon: Code },
                                    { path: "/ads-service", label: "Ads / Performance", Icon: Share2 },
                                    { path: "/video-services", label: "Video Production", Icon: Video },
                                    { path: "/social-services", label: "Social Media", Icon: Share2 }
                                ].map((item) => (
                                    <Link key={item.path} to={item.path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <item.Icon size={16} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="/about-us" className={`navbar-ss-link${location.pathname === '/about-us' ? ' active' : ''}`}>About</Link>
                    <Link to="/team" className={`navbar-ss-link${location.pathname === '/team' ? ' active' : ''}`}>Team</Link>
                </div>

                {/* RIGHT ACTION: HAMBURGER (Mobile) / CTA (Desktop) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '0', flex: 1, gap: '1rem' }}>
                    <Link to="/contact" className="navbar-ss-contact hidden md:block">Get Started</Link>

                    {/* Custom Hamburger Button - Enhanced */}
                    <button
                        className="md:hidden relative w-12 h-12 flex flex-col justify-center items-center gap-[5px] z-[1000] focus:outline-none bg-gray-50 rounded-full shadow-sm border border-gray-100 active:scale-95 transition-all"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span className={`hamburger-line ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} style={{ width: '20px' }}></span>
                        <span className={`hamburger-line ${mobileOpen ? 'opacity-0' : ''}`} style={{ width: '20px' }}></span>
                        <span className={`hamburger-line ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} style={{ width: '20px' }}></span>
                    </button>
                </div>
            </div>

            {/* PREMIUM MOBILE DRAWER */}
            <div className={`fixed inset-0 z-[999] md:hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="mobile-glass-drawer h-full w-full overflow-y-auto p-6 pt-32 flex flex-col gap-6">

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col gap-3 mt-6">
                        {navLinks.map((link, idx) => {
                            if ((link as any).dropdown) {
                                return (
                                    <div key={link.label} className="overflow-hidden rounded-2xl bg-white/50 border border-white/60 shadow-sm">
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                                            className="w-full flex items-center justify-between p-5 text-lg font-bold text-gray-900 tracking-wide"
                                        >
                                            <span className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-indigo-600 ring-1 ring-black/5">
                                                    <Settings size={20} />
                                                </div>
                                                {link.label}
                                            </span>
                                            <ChevronDown size={20} className={`transform transition-transform duration-300 text-gray-500 ${openDropdown === link.label ? 'rotate-180 text-indigo-600' : ''}`} />
                                        </button>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openDropdown === link.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="p-2 pb-3 pt-0 flex flex-col gap-2">
                                                {(link as any).dropdown.map((sub: any) => (
                                                    <Link
                                                        key={sub.path}
                                                        to={sub.path}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/80 active:bg-white transition-all ml-2 border border-transparent hover:border-white/50"
                                                    >
                                                        <div className="text-indigo-500 bg-indigo-50/50 p-2 rounded-lg">{sub.icon && <sub.icon size={18} />}</div>
                                                        <span className="text-base font-semibold text-gray-800">{sub.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            const LinkIcon = (link as any).icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path!}
                                    onClick={() => setMobileOpen(false)}
                                    className={`group flex items-center justify-between p-5 rounded-2xl border border-white/60 bg-white/50 backdrop-blur-md active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:border-indigo-100/50`}
                                >
                                    <span className="flex items-center gap-4 text-lg font-bold text-gray-900 tracking-wide">
                                        {LinkIcon && <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-indigo-600 ring-1 ring-black/5 group-hover:text-indigo-700 transition-colors"><LinkIcon size={20} /></div>}
                                        {link.label}
                                    </span>
                                    <ArrowRight size={20} className="text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </Link>
                            )
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-auto pb-8">
                        <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full p-4 rounded-2xl bg-[#181C32] text-white text-lg font-bold shadow-xl active:scale-95 transition-transform">
                            <Sparkles className="mr-2" size={18} />
                            Start Your Project
                        </Link>
                        <div className="mt-6 flex justify-center gap-6 text-gray-400">
                            <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:text-indigo-600 transition-colors"><Mail size={20} /></a>
                            <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:text-indigo-600 transition-colors"><Share2 size={20} /></a>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navigation;
