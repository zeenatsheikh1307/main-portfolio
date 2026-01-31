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
        name: 'Basic',
        info: 'Perfect for small teams and freelancers to stay organized and on track.',
        price: {
            monthly: 0,
            yearly: 0,
        },
        accent: 'text-green-400',
        buttonVariant: 'outline',
        buttonClass: 'border-green-400/20 hover:bg-green-400/10 text-green-400',
        features: [
            { text: 'Manage up to 5 projects effortlessly' },
            { text: 'Store up to 10 GB of essential files' },
        ],
        btn: {
            text: 'Get Started',
            href: '#',
        },
    },
    {
        highlighted: true,
        name: 'Pro',
        info: 'Designed for growing teams seeking advanced features and integrations.',
        price: {
            monthly: 30,
            yearly: 300,
        },
        accent: 'text-purple-400',
        buttonVariant: 'default',
        buttonClass: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20',
        features: [
            { text: 'Handle 20 projects simultaneously' },
            { text: 'Access 50 GB of secure storage' },
            { text: 'Automate repetitive tasks seamlessly' },
        ],
        btn: {
            text: 'Get Started',
            href: '#',
        },
    },
    {
        name: 'Business',
        info: 'Comprehensive solutions for large-scale operations and complex workflows.',
        price: {
            monthly: 99,
            yearly: 990,
        },
        accent: 'text-blue-400',
        buttonVariant: 'outline',
        buttonClass: 'border-blue-400/20 hover:bg-blue-400/10 text-blue-400',
        features: [
            { text: 'Manage unlimited projects efficiently' },
            { text: 'Store extensive data with 200 GB storage' },
            { text: 'Optimize workflows with advanced automation' },
        ],
        btn: {
            text: 'Get Started',
            href: '#',
        },
    },
];
