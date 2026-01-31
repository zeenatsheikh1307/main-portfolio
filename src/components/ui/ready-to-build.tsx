import { ArrowRight } from "lucide-react";

export function ReadyToBuild() {
    return (
        <section className="relative py-6 md:py-10 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
                {/* Main Headline */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-1">
                    One <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] via-[#4300FF] to-[#2bc0e4] animate-gradient-x">partnership</span>
                </h2>
                <p className="font-serif italic text-4xl md:text-6xl text-muted-foreground/80 mb-5">
                    makes things easy.
                </p>

                {/* CTA Button */}
                <div className="flex justify-center mb-6">
                    <a
                        href="/about-us"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        EXPLORE OUR JOURNEY
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Trust Label */}
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-white/30 uppercase">
                    Trusted by modern innovators worldwide
                </p>
            </div>

            {/* Background Gradients/Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </section>
    );
}
