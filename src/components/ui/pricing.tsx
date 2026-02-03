'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Check, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Transition } from 'framer-motion';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

export interface Plan {
    name: string;
    info: string;
    price: {
        monthly: number;
        yearly: number;
    };
    accent?: string;
    buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    buttonClass?: string;
    features: {
        text: string;
        tooltip?: string;
    }[];
    btn: {
        text: string;
        href: string;
    };
    highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
    plans: Plan[];
    heading: string;
    description?: string;
}

export function PricingSection({
    plans,
    heading,
    description,
    ...props
}: PricingSectionProps) {
    const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
        'monthly',
    );

    return (
        <div
            className={cn(
                'relative flex w-full flex-col items-center justify-center space-y-5 p-4 overflow-hidden',
                props.className,
            )}
            {...props}
        >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 select-none">
                <h1 className="text-[10rem] md:text-[13rem] font-black text-white/[0.03] tracking-tighter uppercase whitespace-nowrap">
                    Pricing
                </h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                {plans.map((plan) => (
                    <PricingCard plan={plan} key={plan.name} frequency={frequency} />
                ))}
            </div>
        </div>
    );
}

type PricingFrequencyToggleProps = React.ComponentProps<'div'> & {
    frequency: FREQUENCY;
    setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
    frequency,
    setFrequency,
    ...props
}: PricingFrequencyToggleProps) {
    return (
        <div
            className={cn(
                'bg-muted/30 mx-auto flex w-fit rounded-full border p-1 text-foreground bg-background',
                props.className,
            )}
            {...props}
        >
            {frequencies.map((freq) => (
                <button
                    onClick={() => setFrequency(freq)}
                    className="relative px-4 py-1 text-sm capitalize"
                >
                    <span className="relative z-10">{freq}</span>
                    {frequency === freq && (
                        <motion.span
                            layoutId="frequency"
                            transition={{ type: 'spring', duration: 0.4 }}
                            className="bg-foreground absolute inset-0 z-10 rounded-full mix-blend-difference"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}

type PricingCardProps = React.ComponentProps<'div'> & {
    plan: Plan;
    frequency?: FREQUENCY;
};

export function PricingCard({
    plan,
    className,
    frequency = frequencies[0],
    ...props
}: PricingCardProps) {
    return (
        <div
            key={plan.name}
            className={cn(
                'relative flex w-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-8 text-foreground transition-all duration-300 hover:shadow-2xl hover:border-white/20 hover:-translate-y-1',
                plan.highlighted && 'shadow-purple-900/10 border-purple-500/20',
                className,
            )}
            {...props}
        >
            {plan.highlighted && (
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col gap-6 h-full">
                {/* Header */}
                <div className="space-y-2">
                    <h3 className={cn("text-2xl font-medium tracking-wide", plan.accent)}>
                        {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[90%]">
                        {plan.info}
                    </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                    {plan.price[frequency] === 0 ? (
                        <span className="text-6xl font-bold tracking-tighter text-white">Free</span>
                    ) : (
                        <>
                            <span className="text-3xl font-bold align-top text-muted-foreground">$</span>
                            <span className="text-6xl font-bold tracking-tighter text-white">{plan.price[frequency]}</span>
                        </>
                    )}
                </div>

                {/* CTA Button - Placed in middle as per reference */}
                <div className="w-full">
                    <Button
                        className={cn("w-full h-10 rounded-full text-base font-medium transition-all duration-300 bg-white/5 border border-white/10 border-b-white/20 hover:bg-white/10 hover:border-white/20 text-white shadow-lg shadow-black/20", plan.buttonClass)}
                        variant="ghost"
                        asChild
                    >
                        <Link to={plan.btn.href}>{plan.btn.text}</Link>
                    </Button>
                </div>

                {/* Horizontal Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Features */}
                <div className="space-y-4 mt-auto">
                    {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className={cn("mt-1 flex items-center justify-center rounded-full p-1", plan.accent?.replace('text-', 'bg-'))}>
                                <Check className="h-3 w-3 text-black font-bold" strokeWidth={3} />
                            </div>
                            <span className="text-base text-muted-foreground/80 font-medium">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


type BorderTrailProps = {
    className?: string;
    size?: number;
    transition?: Transition;
    delay?: number;
    onAnimationComplete?: () => void;
    style?: React.CSSProperties;
};

export function BorderTrail({
    className,
    size = 60,
    transition,
    delay,
    onAnimationComplete,
    style,
}: BorderTrailProps) {
    const BASE_TRANSITION = {
        repeat: Infinity,
        duration: 5,
        ease: 'linear',
    };

    return (
        <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
            <motion.div
                className={cn('absolute aspect-square bg-zinc-500', className)}
                style={{
                    width: size,
                    offsetPath: `rect(0 auto auto 0 round ${size}px)`,
                    ...style,
                }}
                animate={{
                    offsetDistance: ['0%', '100%'],
                }}
                transition={{
                    ...(transition ?? BASE_TRANSITION),
                    delay: delay,
                }}
                onAnimationComplete={onAnimationComplete}
            />
        </div>
    );
}
