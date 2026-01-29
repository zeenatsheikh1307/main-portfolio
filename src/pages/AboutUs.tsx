import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import {
  Rocket,
  Sparkles,
  Palette,
  Code2,
  Megaphone,
  Target,
  LineChart,
  ShieldCheck,
  Stars,
  Workflow,
  Gauge,
  Globe2,
  MoveRight,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

/** AboutUs – Pro MU theme • Bigger cards • Better structure • Smooth animations (pure Tailwind + tiny JS) */

export default function AboutUs() {
  const ioRef = useRef<IntersectionObserver | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    ioRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            ioRef.current?.unobserve(e.target as Element);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => ioRef.current?.observe(el));
    return () => ioRef.current?.disconnect();
  }, []);

  // Hero entrance animation + subtle decorative float (respects reduced motion)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
      /* ignore if plugin already registered */
    }

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("#about-hero-title", { y: 30, opacity: 0, duration: 0.8 })
        .from(
          ".about-hero-sub",
          { y: 18, opacity: 0, duration: 0.7 },
          "-=0.45"
        )
        .from(
          ".about-hero-ctas a",
          { y: 12, opacity: 0, duration: 0.55, stagger: 0.12 },
          "-=0.4"
        );

      gsap.to(".hero-blob", {
        y: 18,
        x: 10,
        rotation: 6,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#080910] text-white antialiased overflow-x-hidden">
      <Navigation />

      {/* Cosmic background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(1100px 560px at 15% -5%, rgba(67,0,255,0.28), transparent 60%),
            radial-gradient(900px 480px at 85% 8%, rgba(255,0,102,0.22), transparent 55%),
            radial-gradient(800px 520px at 50% 120%, rgba(43,192,228,0.14), transparent 60%)
          `,
        }}
      />

      {/* ===================== HERO (no image) ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(60%_40%_at_50%_30%,black,transparent)]">
          <div className="absolute inset-0 bg-[radial-gradient(650px_320px_at_50%_0%,rgba(255,255,255,0.10),transparent)] animate-pulse" />
        </div>

  <div className="mx-auto max-w-7xl px-8 md:px-12 lg:px-20 pt-28 md:pt-32 lg:pt-36 hero-full flex items-center">
          <div className="mx-auto max-w-6xl text-center reveal opacity-0 translate-y-6 relative z-10 pb-16 md:pb-20 lg:pb-24">
            {/* soft radial spotlight */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-center">
              <div className="absolute -top-16 h-96 w-3/4 rounded-full bg-gradient-to-br from-[#2bc0e4]/6 to-[#4300FF]/6 blur-3xl opacity-40" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-2 text-sm tracking-wide text-white/80 backdrop-blur inline-block">
              <Stars className="h-4 w-4 text-[#2bc0e4]" />
              <Zap className="h-4 w-4 text-[#FF0066]" />
              <span>Metabull Universe — About</span>
            </div>

            <h1 id="about-hero-title" className="mt-6 hero-title font-extrabold leading-[0.92]">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[84px]">We build <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2bc0e4] via-[#4300FF] to-[#FF0066]">performant products</span></span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[84px]">that users love.</span>
            </h1>

            {/* shining stripe */}
            <div className="absolute left-0 top-28 w-2/3 h-16 -skew-x-12 bg-gradient-to-r from-white/30 via-white/8 to-transparent opacity-30 blur-md z-0" style={{ animation: 'shine 3s ease-in-out infinite' }} />

            {/* decorative floating blob (behind heading) */}
            <div className="pointer-events-none">
              <div className="hero-blob absolute right-12 top-8 h-60 w-60 rounded-3xl bg-gradient-to-br from-[#2bc0e4] to-[#4300FF] opacity-10 blur-3xl z-0" />
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-base text-white/75 sm:text-lg about-hero-sub">
              Full-stack development, brand design, performance marketing & AI automations—delivered with clarity,
              speed, and measurable impact.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row about-hero-ctas">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-purple-600 to-violet-600 px-8 py-5 text-base font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:via-violet-600 hover:to-fuchsia-600 hover:shadow-[0_0_60px_rgba(168,85,247,0.45)] hover:scale-[1.02] cta-pul"
              >
                Start a project
                <Rocket className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/services"
                className="group inline-flex items-center justify-center rounded-2xl border border-white/16 bg-white/4 px-8 py-5 text-base font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/36 hover:bg-white/10 hover:scale-[1.02]"
              >
                Explore services
                <MoveRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* trust cards removed per request */}
          </div>
        </div>
      </section>

      {/* ===================== WHO WE ARE ===================== */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-14 md:grid-cols-2 md:py-18">
          <div className="order-2 reveal opacity-0 translate-y-6 md:order-1">
            <SectionHeading eyebrow="Who we are" title="A multi-disciplinary studio">
              We’re a Bhopal-based creative + engineering team crafting high-impact websites, apps, and campaigns.
              Our DNA mixes product thinking, performance marketing, and cinematic content—powered by AI workflows.
            </SectionHeading>

            <ul className="mt-8 space-y-4 text-sm text-white/80">
              {[
                {
                  icon: ShieldCheck,
                  text: "Transparent process, measurable outcomes, clear communication.",
                  color: "#2bc0e4",
                },
                {
                  icon: Target,
                  text: "Obsessed with shipping fast without compromising UX polish.",
                  color: "#4300FF",
                },
                {
                  icon: Sparkles,
                  text: "AI-powered systems that reduce response times and costs.",
                  color: "#FF0066",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5 hover:scale-[1.02]"
                >
                  <span
                    className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg"
                    style={{ backgroundColor: `${item.color}1A` }}
                  >
                    <item.icon className="h-4 w-4" style={{ color: item.color }} />
                  </span>
                  <span className="leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Abstract visual (no stock photo) */}
          <div className="order-1 reveal opacity-0 translate-y-6 md:order-2">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-1 backdrop-blur-xl">
                {/* Replace abstract visual with a team photo from Unsplash (public image) */}
                <div className="relative h-full w-full rounded-2xl bg-[#06060a] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
                    alt="Our team"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* subtle gradient overlay to match site style */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/20 via-transparent to-[#000000]/30" />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>
          </div>
        </div>
      </section>

      {/* ===================== CAPABILITIES (BIGGER CARDS) ===================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
          <SectionHeading eyebrow="What we do" title="Capabilities that move the needle">
            Strategy, design, engineering, and growth—one tight squad.
          </SectionHeading>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "Web & App Development",
                desc: "Next.js + Tailwind with scalable backends (Supabase/Convex). Fast, secure & SEO-ready.",
              },
              {
                icon: Palette,
                title: "Brand & UI/UX",
                desc: "Design systems, motion, accessibility and crisp component libraries.",
              },
              {
                icon: Megaphone,
                title: "Performance Marketing",
                desc: "Meta/Google Ads with clean tracking, funnels, and creative testing.",
              },
              {
                icon: Sparkles,
                title: "AI Integrations",
                desc: "Chatbots, voice agents and automations to reduce cost and response time.",
              },
              {
                icon: LineChart,
                title: "Analytics & CRO",
                desc: "Dashboards, heatmaps and experiments to turn visitors into customers.",
              },
              {
                icon: Gauge,
                title: "Performance & SEO",
                desc: "Core Web Vitals, Lighthouse 95+, server rendering & technical SEO.",
              },
            ].map((f, i) => (
              <FeatureBig key={f.title} {...f} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS (BIGGER, STEPPED) ===================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
          <SectionHeading eyebrow="How we work" title="Process that keeps momentum">
            No fluff—weekly sprints, async clarity, and demo-first collaboration.
          </SectionHeading>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: Workflow, title: "Discover", desc: "Goals, users, constraints. We align on KPIs & guardrails." },
              { icon: Palette, title: "Design", desc: "Flows, wireframes, high-fidelity UI and motion guidelines." },
              { icon: Globe2, title: "Build & Iterate", desc: "Ship in small slices, measure, optimize, then scale." },
            ].map((s, i) => (
              <ProcessCard key={s.title} index={i} {...s} />
            ))}
          </div>

          <ul className="reveal opacity-0 translate-y-6 mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 text-sm text-white/80 sm:grid-cols-2">
            {[
              "Weekly demos & clear milestones",
              "Transparent pricing & scope",
              "Design systems & component libraries",
              "Performance-first development",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition">
                <CheckCircle2 className="h-5 w-5 text-[#2bc0e4]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== MILESTONES (TIMELINE CARD) ===================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
          <SectionHeading eyebrow="Journey" title="Milestones on our path">
            A quick timeline of how we’ve grown with our partners.
          </SectionHeading>

          <div className="mt-12">
            <div className="relative mx-auto rounded-2xl border border-white/6 bg-white/[0.02] p-8 text-white/90">
              <div className="flex items-center gap-3 mb-6">
                <Stars className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold">Milestones</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* left column timeline */}
                <div className="relative pl-10">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
                  <ul className="space-y-8">
                    {[
                      {
                        year: '2022',
                        title: 'Launched Creative + Tech Studio',
                        desc: 'First 20 projects completed with repeat clients.',
                      },
                      {
                        year: '2023',
                        title: 'Performance Marketing Wing',
                        desc: '2× ROI avg. across ecom & local businesses.',
                      },
                      {
                        year: '2024',
                        title: 'AI Assistants & Automation',
                        desc: 'Voice bots, chatbots, content pipelines live.',
                      },
                    ].map((m) => (
                      <li key={m.title} className="relative">
                        <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-purple-500 ring-2 ring-white/6" />
                        <div className="text-sm font-semibold text-purple-400">{m.year}</div>
                        <h4 className="mt-1 text-lg font-semibold">{m.title}</h4>
                        <p className="mt-1 text-sm text-white/70">{m.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* right column timeline */}
                <div className="relative pl-10">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
                  <ul className="space-y-8">
                    {[
                      {
                        year: '2024–25',
                        title: 'Scaling Delivery & Ops',
                        desc: 'Faster turnarounds, tighter QA, better handoffs.',
                      },
                      {
                        year: '2025',
                        title: 'Enterprise-grade Builds',
                        desc: 'Complex dashboards, CRM, and real-time apps.',
                      },
                    ].map((m) => (
                      <li key={m.title} className="relative">
                        <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-purple-500 ring-2 ring-white/6" />
                        <div className="text-sm font-semibold text-purple-400">{m.year}</div>
                        <h4 className="mt-1 text-lg font-semibold">{m.title}</h4>
                        <p className="mt-1 text-sm text-white/70">{m.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:pb-28">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] p-8 text-center backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2bc0e4]/10 via-[#4300FF]/10 to-[#FF0066]/10 opacity-40" />
            <h3 className="relative text-3xl font-bold sm:text-4xl">Ready to build something ambitious?</h3>
            <p className="relative mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
              Let’s align on goals, timelines, and budgets—and then ship.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#2bc0e4] to-[#4300FF] px-8 py-4 font-semibold text-white transition-all duration-300 hover:from-[#4300FF] hover:to-[#FF0066] hover:shadow-[0_0_50px_rgba(67,0,255,0.5)] hover:scale-[1.02]"
              >
                Book a discovery call
                <Rocket className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/portfolio"
                className="group inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-[1.02]"
              >
                View our work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local styles */}
      <style>{`
        .reveal { transition: transform .8s cubic-bezier(.25,.46,.45,.94), opacity .8s; }
        .reveal.in { opacity: 1 !important; transform: translateY(0) scale(1) !important; }
        @keyframes shine { 0%{transform:translateX(-110%) skewX(-15deg);} 100%{transform:translateX(200%) skewX(-15deg);} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        /* Make hero fill viewport minus the fixed nav height (responsive) */
        .hero-full { min-height: calc(100vh - 6rem); }
        @media (min-width: 768px) { .hero-full { min-height: calc(100vh - 7rem); } }
        @media (min-width: 1024px) { .hero-full { min-height: calc(100vh - 8rem); } }

        /* CTA pulse (subtle) */
        @media (prefers-reduced-motion: no-preference) {
          .cta-pulse { animation: ctaPulse 3.6s ease-in-out infinite; }
          @keyframes ctaPulse { 0%{transform:scale(1)} 50%{transform:scale(1.03)} 100%{transform:scale(1)} }
        }

        .trust-card { box-shadow: 0 6px 24px rgba(0,0,0,0.45); }
      `}</style>
    </div>
  );
}

/* -------------------- Reusables -------------------- */

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center reveal opacity-0 translate-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-wide text-white/80 backdrop-blur">
        <Sparkles className="h-4 w-4 text-[#2bc0e4]" />
        {eyebrow}
      </div>
      <h2 className="mt-6 text-3xl font-bold sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
        {title}
      </h2>
      {children && <p className="mx-auto mt-4 max-w-2xl text-white/70">{children}</p>}
    </div>
  );
}

function FeatureBig({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: any;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <div
      className="reveal opacity-0 translate-y-6 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/[0.09] hover:scale-[1.02]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-5">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-white transition-all duration-300 group-hover:scale-110 group-hover:from-[#2bc0e4]/20 group-hover:to-[#4300FF]/20">
            <Icon className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-semibold sm:text-xl">{title}</h4>
        </div>
        <p className="mt-3 text-sm text-white/75 leading-relaxed">{desc}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2bc0e4]/5 via-[#4300FF]/6 to-[#FF0066]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

function ProcessCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: any;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <div className="reveal opacity-0 translate-y-6 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur">
      <div className="relative p-7">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-white">
              <Icon className="h-6 w-6" />
            </div>
            <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#2bc0e4] to-[#4300FF] text-xs font-bold">
              {index + 1}
            </div>
          </div>
          <h4 className="text-xl font-semibold">{title}</h4>
        </div>
        <p className="mt-3 text-sm text-white/75 leading-relaxed">{desc}</p>
      </div>
      <div className="h-1.5 w-full bg-white/5">
        <div className="h-1.5 w-0 bg-gradient-to-r from-[#2bc0e4] via-[#4300FF] to-[#FF0066] transition-all duration-1000 group-hover:w-full" />
      </div>
    </div>
  );
}

function Milestone({
  year,
  title,
  desc,
  delay = 0,
}: {
  year: string;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <div
      className="reveal opacity-0 translate-y-6 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/[0.09] hover:scale-[1.02]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-sm font-semibold text-[#2bc0e4]">{year}</div>
      <h4 className="mt-2 text-xl font-semibold">{title}</h4>
      <p className="mt-3 text-white/75 leading-relaxed">{desc}</p>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#2bc0e4] to-[#4300FF] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
