import { PricingSection, Plan } from '@/components/ui/pricing';
import { ReadyToBuild } from '@/components/ui/ready-to-build';

export default function PricingDemo() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
            <div className="py-12 flex justify-center w-full">
                <PricingSection
                    className="text-white"
                    plans={PLANS}
                    heading="Plans that Scale with You"
                    description="Whether you're just starting out or growing fast, our flexible pricing has you covered — with no hidden costs."
                />
            </div>

            <ReadyToBuild />
        </div>
    );
}

const PLANS: Plan[] = [
    {
        name: 'Starter Campaign',
        info: '₹1,000/day budget - Perfect for small businesses',
        price: {
            monthly: 0,
            yearly: 0,
        },
        priceFormatted: '₹10,620/week',
        accent: 'text-purple-400',
        buttonVariant: 'outline',
        buttonClass: 'border-purple-400/20 hover:bg-purple-400/10 text-purple-400',
        features: [
            { text: 'Google & Meta Ads Setup' },
            { text: 'Basic Audience Targeting' },
            { text: 'Free Landing Page' },
            { text: 'Free Graphics' },
            { text: 'Ad Handling' },
        ],
        btn: {
            text: 'Get Started',
            href: '/contact',
        },
    },
    {
        highlighted: true,
        name: 'Growth Plan',
        info: '₹2,000/day budget - For brands aiming to scale',
        price: {
            monthly: 0,
            yearly: 0,
        },
        priceFormatted: '₹19,180/week',
        accent: 'text-blue-400',
        buttonVariant: 'default',
        buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20',
        features: [
            { text: 'Google, Meta & LinkedIn Ads' },
            { text: 'A/B Testing & Optimization' },
            { text: 'Free Landing Page' },
            { text: 'Free Graphics' },
            { text: 'Ad Handling' },
        ],
        btn: {
            text: 'Get Started',
            href: '/contact',
        },
    },
    {
        name: 'Enterprise',
        info: '₹5,000/day budget - Full-funnel growth marketing',
        price: {
            monthly: 0,
            yearly: 0,
        },
        priceFormatted: '₹46,256/week',
        accent: 'text-emerald-400',
        buttonVariant: 'outline',
        buttonClass: 'border-emerald-400/20 hover:bg-emerald-400/10 text-emerald-400',
        features: [
            { text: 'Multi-platform Ad Management' },
            { text: 'Dynamic Retargeting' },
            { text: 'Free Landing Page' },
            { text: 'Free Graphics' },
            { text: 'Ad Handling' },
        ],
        btn: {
            text: 'Get Started',
            href: '/contact',
        },
    },
];
