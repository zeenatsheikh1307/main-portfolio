import React, { useCallback, useEffect, useState } from "react";
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
};

const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({
    items,
    options,
    className,
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

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const autoplayInterval = setInterval(() => {
            if (emblaApi.canScrollNext()) {
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
    isSelected
}: {
    item: Project;
    index: number;
    emblaApi: EmblaCarouselType | undefined;
    isSelected?: boolean;
}) => {
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [isHovered, setIsHovered] = useState(false);

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

        // Coverflow math
        // Center: scale 1, rotateY 0, zIndex 10
        // Sides: scale 0.8, rotateY +/- 45, zIndex < 10

        const scale = Math.max(0.7, 1 - absDist * 0.35);
        const opacity = Math.max(0.4, 1 - absDist * 0.5);
        const rotateY = dist * -45; // Rotate inward
        const zIndex = 50 - Math.round(absDist * 20);
        const translateZ = -absDist * 100; // Push back matching coverflow

        setStyle({
            transform: `perspective(1000px) translateX(${dist * -15}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            // translateX overlap adjustment
            zIndex: zIndex,
            opacity: opacity,
            filter: `blur(${Math.max(0, absDist * 4 - 0.5)}px)`,
        });

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
            className={cn(
                "relative min-w-[70%] md:min-w-[50%] lg:min-w-[40%] pl-4 transition-all duration-75 ease-out will-change-transform"
            )}
            style={style}
        >
            {/* Browser Window Card from WebServices.tsx */}
            <article
                className="project-card group relative flex flex-col h-[350px] md:h-[420px] w-full transition-all duration-700 ease-out overflow-visible"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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
                                        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
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
        </div>
    );
};

export default CoverflowCarousel;
