// contact.tsx — Full Replace Code
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";

// Local assets (update paths if different)
import what from "./assets/assests/vecteezy_whatsapp-square-logo-on-a-transparent-background_42127116.png";
import Insta from "./assets/assests/Instagram_logo_2016.svg.webp";
import x from "./assets/assests/vecteezy_social-media-x-logo-black-and-white-png_36623772.png";
import fb from "./assets/assests/vecteezy_facebook-logo-png-facebook-icon-transparent-png_18930698.png";

gsap.registerPlugin(ScrollTrigger);

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      ".hero-pill",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        ".hero-title-line",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(
        ".hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.2"
      )
      .fromTo(
        ".hero-stats .stat",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        "-=0.2"
      );

    gsap.utils.toArray(".contact-card").forEach((card: any, i: number) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0, rotateX: -6 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.to(".bg-blob", {
          y: 30,
          x: 20,
          rotate: 10,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, heroRef);
      return () => ctx.revert();
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (status !== "idle") setStatus("idle");
  };

  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !validEmail(form.email) || !form.message.trim()) {
      setStatus("error");
      return;
    }

    try {
      setLoading(true);
      setStatus("idle");

      const waMsg = encodeURIComponent(
        `Hey MetaBull Universe 👋\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
      );
      window.open(`https://wa.me/918982285510?text=${waMsg}`, "_blank");

      // Optional backend submit (Formspree/API)
      // await fetch("https://formspree.io/f/YOUR_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const info = [
    {
      icon: <Mail className="w-5 h-5 text-purple-300" />,
      badge: "bg-purple-500/15 border-purple-500/30",
      title: "Email",
      content: "metabulls2@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-blue-300" />,
      badge: "bg-blue-500/15 border-blue-500/30",
      title: "Phone",
      content: "+91 82220 37010",
    },
    {
      icon: <MapPin className="w-5 h-5 text-pink-300" />,
      badge: "bg-pink-500/15 border-pink-500/30",
      title: "Office",
      content: "Metabull Universe, MP Nagar Zone-2, Bhopal",
    },
    {
      icon: <Clock className="w-5 h-5 text-cyan-300" />,
      badge: "bg-cyan-500/15 border-cyan-500/30",
      title: "Hours",
      content: "Mon–Sat: 10AM – 7PM",
    },
  ];

  const socials = [
    {
      logo: what,
      name: "WhatsApp",
      href: "https://wa.me/918982285510",
      wrapper: "bg-green-500/10 hover:bg-green-500/20 border-green-500/30",
    },
    {
      logo: Insta,
      name: "Instagram",
      href: "https://www.instagram.com/metabulluniverse?igsh=MTB1aWZhNHpvMjU3Mg==",
      wrapper: "bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30",
    },
    {
      logo: x,
      name: "Twitter",
      href: "https://x.com/Metabullunivers",
      wrapper: "bg-neutral-800/20 hover:bg-neutral-800/40 border-neutral-700/50",
    },
    {
      logo: fb,
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61565142882919",
      wrapper: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-purple-500/20 selection:text-foreground/90">
      <Navigation />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative md:pl-24 px-4 sm:px-6 md:px-8 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-20 min-h-screen flex items-center"
      >
        {/* Gradient grid bg */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,.18),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,.16),transparent_35%)]" />
          <div className="bg-blob absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-purple-500 to-cyan-400" />
        </div>

        {/* Subtle video on large screens */}
        <div className="absolute top-0 right-0 w-full md:w-[32%] h-full overflow-hidden opacity-15 hidden md:block">
          <video autoPlay muted loop className="w-full h-full object-cover" playsInline>
            <source
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <style>{`@keyframes gradient-x { 0%{ background-position: 0% 50%; } 100%{ background-position: 100% 50%; } }`}</style>
          <div className="hero-pill inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 text-base font-semibold text-lg">
            <Send className="w-4 h-4 mr-2" />
            Get In Touch
          </div>

          <h1 className="mt-6 font-bold tracking-tight leading-[1.02]">
            <span className="hero-title-line block text-7xl sm:text-8xl md:text-[140px]">CONTACT</span>
            <span className="hero-title-line block text-5xl sm:text-7xl md:text-[88px] text-muted-foreground">
              OUR{" "}
              <span className="bg-clip-text text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#2BC0E4_0deg,#4300FF_120deg,#FF0066_240deg,#2BC0E4_360deg)] [background-size:200%_200%] animate-[gradient-x_6s_infinite_alternate]">
                TEAM
              </span>
            </span>
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-4xl text-xl sm:text-2xl md:text-3xl text-foreground/90">
            Tell us about your project — we know how to take it to the next level. Let’s build something amazing together. 🚀
          </p>

          <div className="hero-stats mt-12 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: "24h", label: "Response Time" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "50+", label: "Happy Clients" },
            ].map((s, i) => (
              <div className="stat flex items-center gap-3" key={i}>
                {i > 0 && <div className="h-8 w-px bg-white/15" />}
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold">{s.value}</div>
                  <div className="text-lg md:text-xl text-foreground/80">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="md:pl-24 px-4 sm:px-6 md:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* FORM CARD */}
          <div className="contact-card relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-card/50 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            <div className="p-5 sm:p-7 md:p-9">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Tell us about your project</h2>
              <p className="text-foreground/80 mb-6">
                Fill out the form — we'll get back to you within 24 hours. Or connect directly via WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground/70 mb-1">Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 outline-none focus:(ring-2 ring-purple-400 border-purple-400) transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 outline-none focus:(ring-2 ring-purple-400 border-purple-400) transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-foreground/70 mb-1">Phone (optional)</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 outline-none focus:(ring-2 ring-purple-400 border-purple-400) transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-foreground/70 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={5}
                    placeholder="What do you want to build?"
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 outline-none focus:(ring-2 ring-purple-400 border-purple-400) transition resize-y"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-amber-400 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Please fill Name, a valid Email, and Message.
                  </div>
                )}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Message sent! We’ll get back shortly (also opened WhatsApp).
                  </div>
                )}

                <div className="mt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center rounded-full px-6 py-3 font-medium border border-purple-400/60 bg-gradient-to-r from-purple-600/40 to-blue-600/40 hover:from-purple-600/60 hover:to-blue-600/60 transition focus:outline-none"
                  >
                    <span className="absolute inset-0 -z-10 blur-2xl opacity-30 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/918982285510?text=${encodeURIComponent(
                      "Hey MetaBull Universe, I want to discuss a project."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium border border-white/15 hover:border-emerald-400/60 transition"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </form>
            </div>
          </div>

          {/* INFO + SOCIALS */}
          <div className="space-y-6">
            <div className="contact-card rounded-2xl sm:rounded-3xl border border-white/10 bg-card/50 backdrop-blur-md p-5 sm:p-7 md:p-9">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {info.map((it, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border ${it.badge}`}>{it.icon}</div>
                    <div>
                      <div className="text-sm text-muted-foreground">{it.title}</div>
                      <div className="text-base md:text-lg font-medium">{it.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-card rounded-2xl sm:rounded-3xl border border-white/10 bg-card/50 backdrop-blur-md p-5 sm:p-7 md:p-9">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 rounded-xl border px-3 py-3 transition ${s.wrapper}`}
                  >
                    <img
                      src={s.logo}
                      alt={`${s.name} icon`}
                      className="h-8 w-8 object-contain transition-transform group-hover:scale-110"
                    />
                    <span className="text-sm md:text-base font-medium">{s.name}</span>
                    <ArrowRight className="ml-auto h-4 w-4 opacity-70 transition group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="md:pl-24 px-4 sm:px-6 md:px-8 pb-20">
        <div className="relative overflow-hidden max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md p-8 sm:p-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
              READY TO COLLABORATE?
            </h2>
            <p className="mt-2 text-foreground/90">
              Ideas ko reality me convert karte hain — services page check karo ya seedha call set karo.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/services" className="inline-flex">
                <button className="border border-foreground/70 text-foreground px-6 py-3 rounded-full font-medium hover:bg-white/10 transition">
                  Go To Services
                </button>
              </Link>
              <a
                href="mailto:metabulls2@gmail.com?subject=Let%E2%80%99s%20Build%20Something%20Great&body=Hi%20MetaBull%20Universe%2C%0A%0A"
                className="inline-flex"
              >
                <button className="border border-purple-400/60 bg-purple-600/30 hover:bg-purple-600/45 px-6 py-3 rounded-full font-medium transition">
                  Mail Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
