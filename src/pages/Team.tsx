import React, { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import { Search, ChevronDown, X as XIcon } from "lucide-react";

/* ------------------------------------------
   TYPES & TEAM DATA
------------------------------------------- */
type Member = {
  name: string;
  role: string;
  image: string;
  bio: string;
  short?: string;
  tags?: string[];
  featured?: boolean;
};

const TEAM: Member[] = [
  {
    name: "Priyansh Gour",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Visionary leader with a passion for digital innovation and client success.",
    short: "Scaling brands with performance + design.",
    tags: ["Leadership", "Strategy", "Growth"],
    featured: true,
  },
  {
    name: "Aarav Sharma",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Expert in web technologies and building scalable digital products.",
    short: "Next.js, Tailwind, Supabase — ship fast.",
    tags: ["Next.js", "Supabase", "CI/CD"],
  },
  {
    name: "Isha Verma",
    role: "Marketing Head",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Strategist focused on creative campaigns and brand growth.",
    short: "Full-funnel ads + brand storytelling.",
    tags: ["Funnels", "Creatives", "Analytics"],
    featured: true,
  },
  {
    name: "Riya Singh",
    role: "Content Specialist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Storyteller and content creator with a flair for engaging audiences.",
    short: "Long-form + shorts that convert.",
    tags: ["Copy", "SEO", "Shorts"],
  },
];

/* ------------------------------------------
   UTILS + HOOKS
------------------------------------------- */
const cn = (...a: (string | false | undefined)[]) => a.filter(Boolean).join(" ");

function useReveal<T extends HTMLElement>(stagger = 0.06) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px) scale(.98)";
      (el.style as any).filter = "blur(2px)";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = items.indexOf(e.target as HTMLElement);
            const t = (e.target as HTMLElement).style;
            t.transition = `opacity .6s cubic-bezier(.2,.8,.2,1) ${i * stagger}s, transform .6s cubic-bezier(.2,.8,.2,1) ${i * stagger}s, filter .6s ${i * stagger}s`;
            t.opacity = "1";
            t.transform = "translateY(0) scale(1)";
            (t as any).filter = "blur(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stagger]);
  return ref;
}

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm sm:text-base rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-foreground/80 shadow-sm">
    {children}
  </span>
);

/* ------------------------------------------
   LIGHT STARFIELD
------------------------------------------- */
function Starfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      style={{
        backgroundImage:
          "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.25) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 60% 70%, rgba(255,255,255,.22) 50%, transparent 51%), radial-gradient(1.2px 1.2px at 80% 20%, rgba(255,255,255,.18) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 35% 80%, rgba(255,255,255,.20) 50%, transparent 51%)",
        animation: "twinkle 8s ease-in-out infinite",
      }}
    />
  );
}

/* ------------------------------------------
   PAGE
------------------------------------------- */
const Team: React.FC = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Member | null>(null);

  const gridAnchorRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useReveal<HTMLDivElement>(0.05);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEAM.filter((m) => {
      const inText =
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        (m.tags || []).join(" ").toLowerCase().includes(q) ||
        (m.short || "").toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q);
      return q ? inText : true;
    }).sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [query]);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-foreground">
      {/* soft cosmic bg */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-24 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(67,0,255,.22),transparent_60%)] blur-2xl" />
        <div className="absolute -top-24 right-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_70%_20%,rgba(255,0,102,.18),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-[-14rem] left-1/2 -translate-x-1/2 h-[40rem] w-[46rem] rounded-full bg-[radial-gradient(circle_at_50%_70%,rgba(43,192,228,.18),transparent_60%)] blur-2xl" />
      </div>

      <style>{`
        @keyframes shimmer { 0%{ transform: translateX(-10%);} 100%{ transform: translateX(10%);} }
        @keyframes gradient-x { 0%{ background-position: 0% 50%; } 100%{ background-position: 100% 50%; } }
        @keyframes twinkle { 0%,100%{opacity:.45} 50%{opacity:.9} }
      `}</style>

      <Navigation />

      {/* HERO: true full-screen (accounts for mobile browser UI) */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[100svh] pt-16 sm:pt-20 flex items-center">
        <Starfield />
        <div className="w-full text-center mx-auto" data-reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[12px] sm:text-sm tracking-wide backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-[#2BC0E4] to-[#4300FF] animate-pulse" />
            MetaBull Universe · Cross-functional team
          </div>

          <h1 className="mt-4 text-[42px] leading-[1.06] sm:text-6xl md:text-7xl font-extrabold">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#2BC0E4_0deg,#4300FF_120deg,#FF0066_240deg,#2BC0E4_360deg)] [background-size:200%_200%] animate-[gradient-x_6s_infinite_alternate]">
              Team
            </span>
          </h1>

          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Metabull Universe — crafting immersive digital experiences, product design, and growth-driven engineering.
          </p>

          {/* Search */}
          <div className="mx-auto max-w-xl sm:max-w-2xl mt-6 sm:mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-6 w-6 text-foreground/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, role, or skill…"
                className="w-full rounded-2xl bg-foreground/[0.06] border border-white/15 py-4 pl-14 pr-4 outline-none placeholder-foreground/40 focus:border-white/30 shadow-[0_0_28px_-8px_rgba(67,0,255,0.55)]"
              />
            </div>
          </div>

          {/* Avatars + chips */}
          <div className="mt-6 sm:mt-7 flex flex-col items-center gap-4 sm:gap-5">
            <div className="flex -space-x-3">
              {TEAM.map((m) => (
                <img key={m.name} src={m.image} alt={m.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 object-cover" />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-[720px]">
              {["Next.js + Tailwind", "Meta & Google Ads", "Brand Storytelling", "Supabase", "CI/CD"].map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#team-grid"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("team-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-7 sm:mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#2BC0E4] to-[#4300FF] px-6 sm:px-8 py-3 sm:py-3.5 text-white text-base sm:text-lg font-semibold shadow-[0_12px_50px_-18px_rgba(67,0,255,0.6)] hover:scale-[1.035] hover:shadow-[0_0_36px_-6px_rgba(67,0,255,0.7)] transition"
          >
            Explore Team <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* GRID */}
      <section id="team-grid" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div ref={gridRef} className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((m, idx) => (
            <Card key={m.name + idx} member={m} onOpen={() => setActive(m)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground mt-12 sm:mt-16">No members found.</div>
        )}
      </section>

      {active && <ProfileModal member={active} onClose={() => setActive(null)} />}
    </div>
  );
};

export default Team;

/* ------------------------------------------
   CARD
------------------------------------------- */
function Card({ member, onOpen }: { member: Member; onOpen: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article
      data-reveal
      onClick={onOpen}
      className="group relative cursor-pointer rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]
                 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_30%),linear-gradient(135deg,rgba(43,192,228,.45),rgba(67,0,255,.35),rgba(255,0,102,.4))]"
      style={{ backgroundClip: "padding-box, border-box", border: "1px solid transparent" }}
    >
      <div className="rounded-2xl bg-background/80 backdrop-blur border border-white/15 overflow-hidden shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]">
        {/* image with fixed aspect */}
        <div className="relative">
          {!imgLoaded && (
            <div className="aspect-[4/3] w-full overflow-hidden bg-foreground/[0.06]">
              <div className="h-full w-[140%] -translate-x-10 animate-[shimmer_1.2s_infinite] bg-[linear-gradient(110deg,rgba(255,255,255,0.04)_8%,rgba(255,255,255,0.16)_18%,rgba(255,255,255,0.04)_33%)] [background-size:200%_100%]" />
            </div>
          )}
          <img
            src={member.image}
            alt={member.name}
            className={cn(
              "aspect-[4/3] w-full object-cover object-center select-none transition-opacity duration-500",
              imgLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/90 to-transparent" />
        </div>

        {/* content */}
        <div className="p-4 sm:p-5 group-hover:[transform:perspective(900px)_rotateX(0.6deg)] transition-transform duration-300">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-[#9b7cff] relative inline-block after:block after:h-0.5 after:w-0 after:bg-[#9b7cff] after:transition-all group-hover:after:w-full">
                {member.role}
              </p>
            </div>
            {member.featured && (
              <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wide text-foreground/70">
                Featured
              </span>
            )}
          </div>

          <p className="mt-3 text-[13px] sm:text-sm text-muted-foreground">{member.short || member.bio}</p>

          {!!member.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {member.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_0_2px_rgba(67,0,255,0.25),0_10px_30px_-10px_rgba(67,0,255,0.45)]" />
    </article>
  );
}

/* ------------------------------------------
   MODAL
------------------------------------------- */
function ProfileModal({ member, onClose }: { member: Member; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-background/90 backdrop-blur-md shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg border border-white/15 bg-white/10 p-2 text-foreground/80 hover:bg-white/20"
          aria-label="Close"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <img src={member.image} alt={member.name} className="h-56 w-full object-cover md:h-full" />
          </div>
          <div className="md:col-span-2 p-6">
            <h3 className="text-2xl font-semibold">{member.name}</h3>
            <p className="text-[#9b7cff]">{member.role}</p>
            <p className="mt-4 text-foreground leading-relaxed">{member.bio}</p>
            {!!member.tags?.length && (
              <div className="mt-5 flex flex-wrap gap-2">
                {member.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
