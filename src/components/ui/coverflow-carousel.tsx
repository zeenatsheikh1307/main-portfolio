import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import webVideo from "@/pages/assets/assests/web .mp4";

type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    tech?: string[];
    category: string;
    url?: string;
    video?: string;
};

type CoverflowCarouselProps = {
    items: Project[];
    options?: EmblaOptionsType;
    className?: string;
    variant?: "browser" | "dark";
};

const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({
    items,
    options,
    className,
    variant = "browser",
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
        dragFree: false,
        ...options,
    });

    // Duplicate items to ensure smooth infinite loop
    const loopedItems = [...items, ...items];

    const [selectedIndex, setSelectedIndex] = useState(0);
    // Use a ref so the interval callback always reads the latest value
    // without needing to re-mount the interval on every pause/resume toggle
    const isPausedRef = useRef(false);

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const autoplayInterval = setInterval(() => {
            if (!isPausedRef.current) {
                emblaApi.scrollNext();
            }
        }, 2000);

        return () => clearInterval(autoplayInterval);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className={cn("relative w-full max-w-[1400px] mx-auto py-12", className)}>
            <div className="overflow-hidden perspective-[1000px] px-4 md:px-12" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4 items-center h-[550px]">
                    {loopedItems.map((item, index) => (
                        <CarouselCard
                            key={`${item.id}-${index}`}
                            item={item}
                            index={index}
                            emblaApi={emblaApi}
                            isSelected={selectedIndex === index}
                            isPausedRef={isPausedRef}
                            variant={variant}
                        />
                    ))}
                </div>
            </div>

            {/* Mobile Controls - Removed as per request */}
        </div>

    );
};

const CarouselCard = ({
    item,
    index,
    emblaApi,
    isSelected,
    isPausedRef,
    variant
}: {
    item: Project;
    index: number;
    emblaApi: EmblaCarouselType | undefined;
    isSelected?: boolean;
    isPausedRef: React.MutableRefObject<boolean>;
    variant: "browser" | "dark";
}) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        isPausedRef.current = true;
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(e => console.log(e));
        }
    }, [isPausedRef]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        isPausedRef.current = false;
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isPausedRef]);

    const handleVideoEnded = useCallback(() => {
        isPausedRef.current = false;
    }, [isPausedRef]);

    const updateStyle = useCallback(() => {
        if (!emblaApi) return;

        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();

        // Calculate accurate distance from center of viewport in scroll progress units
        // Embla's scrollProgress is 0-1 (for loop: false) or unbounded/wrapped (loop: true)

        // Use a simpler approach: get the node's position relative to center
        // We need to handle the loop correctly.
        // emblaApi.scrollSnapList()[index] gives the anchor point of the slide

        const scrollSnap = emblaApi.scrollSnapList()[index];
        let diff = scrollSnap - scrollProgress;

        // Handle loop wrap-around logic
        if (engine.options.loop) {
            const scrollLen = engine.limit.max - engine.limit.min; // Usually negative for RTL? No, standard is left (-len) to 0 or 0 to -len. Embla stores negatives.
            // Actually emblaApi.scrollSnapList() are negative values usually.
            // scrollProgress is also negative.

            // Let's normalize difference to [-0.5, 0.5] range relative to track
            // But doing this perfectly manually is hard without internal helper.
            // Let's try `emblaApi.scrollProgress()` vs loop length.

            // Simpler visual approximation: 
            // distance = MIN distance accounting for loop
            // It's tricky to get exact "distance from center" from API without getting deep into internals
            // BUT, we can just use the DOM rects which is updated by Embla engine
        }

        // Rect approach (Robust)
        const nodes = emblaApi.slideNodes();
        const node = nodes[index];
        if (!node) return;

        const nodeRect = node.getBoundingClientRect();
        const rootRect = emblaApi.rootNode().getBoundingClientRect();

        const center = rootRect.width / 2;
        const nodeCenter = nodeRect.left + nodeRect.width / 2 - rootRect.left;

        // Normalize distance by viewport availability
        const dist = (nodeCenter - center) / center; // -1 (left edge) to 1 (right edge) basically

        // Clamp
        const absDist = Math.min(Math.abs(dist), 1.5);
        const zIndex = 50 - Math.round(absDist * 20);

        if (variant === "dark") {
            // Matching the provided reference image (exact gaps and no overlap)
            const scale = Math.max(0.85, 1 - absDist * 0.05); // Less aggressive scaling to match reference
            const opacity = 1; // No fade in the reference image
            const rotateY = dist * 22; // Rotate inwards towards center
            const rotateZ = 0; // No tilt
            const translateY = 0; // No vertical arc
            const translateZ = -absDist * 20; // Very subtle depth push
            const translateX = dist * -2; // Slight pull-in to create an extremely tight gap

            setStyle({
                transform: `perspective(1200px) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                // No blur in the reference
                filter: `blur(0px)`,
            });
        } else {
            // Standard Coverflow Math (for Browser window look)
            const scale = Math.max(0.7, 1 - absDist * 0.35);
            const opacity = Math.max(0.4, 1 - absDist * 0.5);
            const rotateY = dist * -45; // Rotate inward
            const translateZ = -absDist * 100; // Push back matching coverflow
            const translateX = dist * -35; // Pulling cards closer

            setStyle({
                transform: `perspective(1000px) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                filter: `blur(${Math.max(0, absDist * 4 - 0.5)}px)`,
            });
        }

    }, [emblaApi, index]);

    useEffect(() => {
        if (!emblaApi) return;

        const onScroll = () => {
            // Run in optimized frame
            requestAnimationFrame(updateStyle);
        };

        updateStyle();
        emblaApi.on("scroll", onScroll);
        emblaApi.on("reInit", onScroll);
        emblaApi.on("resize", onScroll);

        return () => {
            emblaApi.off("scroll", onScroll);
            emblaApi.off("reInit", onScroll);
            emblaApi.off("resize", onScroll);
        };
    }, [emblaApi, updateStyle]);

    return (
        <div
            className="relative flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4 h-full flex items-center justify-center"
        >
            <div
                className="w-full transition-all duration-75 ease-out will-change-transform"
                style={style}
            >
                {variant === "browser" ? (
                    <article
                        className="project-card group relative flex flex-col h-[350px] md:h-[420px] w-full transition-all duration-700 ease-out overflow-visible"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Compact Folder Tab */}
                        <div className="absolute -top-3 right-6 z-20 flex items-center gap-2 bg-black/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10 transition-opacity duration-300">
                            <span className="text-white/90 text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.15em]">
                                {item.category}
                            </span>
                        </div>

                        {/* Main Card Body */}
                        <div className="w-full h-full bg-white flex flex-col relative z-10 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/10">

                            {/* Image Container */}
                            <div className="relative h-[250px] md:h-[300px] w-full bg-[#0a0a0f] flex items-center justify-center p-0 overflow-hidden">
                                {/* Browser Frame Mockup */}
                                <div className="relative w-full h-full bg-transparent overflow-hidden border-b border-gray-200/50">
                                    {/* Browser Top Bar */}
                                    <div className="h-8 bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-200 flex items-center px-3 gap-2 transition-all duration-500 group-hover:h-0 group-hover:opacity-0 overflow-hidden">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                        </div>
                                        <div className="flex-1 flex justify-center">
                                            <div className="bg-white/60 px-3 py-0.5 rounded text-[7px] text-gray-400 font-medium truncate max-w-[150px]">
                                                {item.url || 'project-preview.com'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="w-full h-[calc(100%-2rem)] group-hover:h-full bg-transparent overflow-hidden relative transition-all duration-500">
                                        {/* Video rendering logic */}
                                        {item.video && (
                                            <video
                                                ref={videoRef}
                                                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                                muted
                                                playsInline
                                                onEnded={handleVideoEnded}
                                            >
                                                <source src={item.video} type="video/mp4" />
                                            </video>
                                        )}

                                        {/* Static image for non-video or fallback */}
                                        {!item.video || !isHovered ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${item.video && isHovered ? 'opacity-0 scale-105' : 'group-hover:scale-105'}`}
                                                loading="lazy"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex-1 flex items-center justify-between p-4 md:p-6 bg-white">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                                        DESIGN • 2025
                                    </p>
                                </div>

                                <a
                                    href={item.url || '#'}
                                    target="_blank"
                                    className="flex items-center justify-center w-[45px] h-[45px] md:w-[50px] md:h-[50px] bg-[#FF4D4D] hover:bg-[#ff3333] text-white rounded-full transition-all duration-500 shadow-lg group-hover:scale-110 shrink-0"
                                >
                                    <ArrowRight className="w-5 h-5 -rotate-45 stroke-[3]" />
                                </a>
                            </div>
                        </div>
                    </article>
                ) : (
                    <article
                        className="project-card group relative flex flex-col h-[350px] md:h-[420px] w-full rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer border border-white/5 bg-gradient-to-b from-[#161622] to-[#0a0a0f]"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Centered Image Container */}
                        <div className="relative w-full flex-1 flex flex-col items-center justify-center p-8 pb-4 z-10 overflow-visible pointer-events-none">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out scale-[1.15] group-hover:scale-[1.25]"
                                loading="lazy"
                            />
                            {item.video && (
                                <div className={`absolute inset-0 flex items-center justify-center p-8 pb-4 transition-opacity duration-500 ${isHovered ? 'opacity-100 z-20' : 'opacity-0 -z-10'}`}>
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-contain rounded-xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] scale-[1.15] group-hover:scale-[1.25] transition-transform duration-700 ease-out"
                                        muted
                                        playsInline
                                        onEnded={handleVideoEnded}
                                    >
                                        <source src={item.video} type="video/mp4" />
                                    </video>
                                </div>
                            )}
                        </div>

                        {/* Subtle Glow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Text Content at Bottom */}
                        <div className="relative z-30 flex flex-col shrink-0 p-6 md:p-8 pt-0 mt-auto">
                            <span className="text-[#a1a1aa] text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] mb-1.5 md:mb-2 drop-shadow-md">
                                {item.category}
                            </span>
                            <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-white leading-tight tracking-tight drop-shadow-lg">
                                {item.title}
                            </h3>
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
};

export default CoverflowCarousel;
