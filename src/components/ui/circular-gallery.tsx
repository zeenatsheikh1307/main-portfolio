import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
    common: string;
    binomial: string;
    photo: {
        url: string;
        text: string;
        pos?: string;
        by: string;
    };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[];
    /** Controls how far the items are from the center. */
    radius?: number;
    /** Controls the speed of auto-rotation when not scrolling. */
    autoRotateSpeed?: number;
    hideTextOverlay?: boolean;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
    ({ items, className, radius = 600, autoRotateSpeed = 0.02, hideTextOverlay = false, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const rotationRef = useRef(0);
        const [isDragging, setIsDragging] = useState(false);
        const [isPaused, setIsPaused] = useState(false);
        const lastXRef = useRef(0);
        const dragDistance = useRef(0);
        const animationFrameRef = useRef<number | null>(null);

        const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
            setIsDragging(true);
            dragDistance.current = 0;
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
            lastXRef.current = clientX;
        };

        const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
            if (!isDragging) return;
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
            const deltaX = clientX - lastXRef.current;
            dragDistance.current += Math.abs(deltaX);

            rotationRef.current += deltaX * 0.3;
            if (containerRef.current) {
                containerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
            }
            lastXRef.current = clientX;
        };

        const handleDragEnd = () => {
            if (isDragging && dragDistance.current < 5) {
                setIsPaused(prev => !prev);
            }
            setIsDragging(false);
        };

        useEffect(() => {
            const autoRotate = () => {
                if (!isDragging && !isPaused) {
                    rotationRef.current += autoRotateSpeed;
                    if (containerRef.current) {
                        containerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
                    }
                }
                animationFrameRef.current = requestAnimationFrame(autoRotate);
            };

            animationFrameRef.current = requestAnimationFrame(autoRotate);
            return () => {
                if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            };
        }, [isDragging, isPaused, autoRotateSpeed]);

        const anglePerItem = 360 / items.length;

        return (
            <div
                ref={ref}
                role="region"
                aria-label="Circular 3D Gallery"
                className={cn("relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing", className)}
                style={{ perspective: '2000px', touchAction: 'pan-y' }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={() => {
                    setIsDragging(false);
                    setIsPaused(false);
                }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                data-cursor="DRAG"
                {...props}
            >
                <div
                    ref={containerRef}
                    className="relative w-full h-full"
                    style={{
                        transform: `rotateY(${rotationRef.current}deg)`,
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
                    }}
                >
                    {items.map((item, i) => {
                        const itemAngle = i * anglePerItem;
                        return (
                            <div
                                key={`${item.photo.url}-${i}`}
                                role="group"
                                aria-label={item.common}
                                className="absolute w-[300px] h-[400px]"
                                style={{
                                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: '-150px',
                                    marginTop: '-200px',
                                    backfaceVisibility: 'hidden',
                                    willChange: 'transform',
                                }}
                            >
                                <div className="relative w-full h-full rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden group border border-white/20 bg-[#0a0a0f] select-none pointer-events-none" style={{ transform: 'translateZ(0)' }}>
                                    {item.photo.url.includes('.mp4') ? (
                                        <video
                                            ref={(el) => {
                                                if (el) {
                                                    el.playbackRate = 1.0;
                                                    if (!isPaused && !isDragging) {
                                                        el.play().catch(() => { });
                                                    } else {
                                                        el.pause();
                                                    }
                                                }
                                            }}
                                            src={item.photo.url}
                                            loop
                                            muted
                                            playsInline
                                            disablePictureInPicture
                                            preload="auto"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            style={{ objectPosition: item.photo.pos || 'center' }}
                                        />
                                    ) : (
                                        <img
                                            src={item.photo.url}
                                            alt={item.photo.text}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            style={{ objectPosition: item.photo.pos || 'center' }}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
