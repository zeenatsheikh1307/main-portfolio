import React, { useState } from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import xLogo from '@/pages/assets/assests/vecteezy_social-media-x-logo-black-and-white-png_36623772.png';
import ytLogo from '@/pages/assets/assests/vecteezy_youtube-png-icon_16716475.png';
import g1 from '@/pages/assets/assests/graphic1.png';
import g2 from '@/pages/assets/assests/graphic2.png';
import g3 from '@/pages/assets/assests/graphic3.png';
import g4 from '@/pages/assets/assests/graphic4.png';
import g5 from '@/pages/assets/assests/graphic5.png';

import w1 from '@/pages/assets/assests/website1.png';
import w2 from '@/pages/assets/assests/website2.png';
import w3 from '@/pages/assets/assests/website3.png';
import w4 from '@/pages/assets/assests/website4.png';
import w5 from '@/pages/assets/assests/website5.png';

const videosData: GalleryItem[] = [
    { common: 'Brand Anthem', binomial: 'Video Campaign', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773050518/video1_gilxpc.mp4', text: 'Brand Anthem', by: 'MetaBull' } },
    { common: 'Product Demo', binomial: 'Explainer', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773049917/video2_bwqmst.mp4', text: 'Product Demo', by: 'MetaBull' } },
    { common: 'Testimonial', binomial: 'Customer Story', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773050483/video3_ui7noh.mp4', text: 'Testimonial', by: 'MetaBull' } },
    { common: 'Social Short', binomial: 'Reels / TikTok', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773050486/video4_ftgrwz.mp4', text: 'Social Short', by: 'MetaBull' } },
    { common: 'Event Recap', binomial: 'Highlight Reel', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773049885/video5_sxj8v1.mp4', text: 'Event Recap', by: 'MetaBull' } },
];

const adsData: GalleryItem[] = [
    { common: 'E-commerce', binomial: 'Web Design', photo: { url: w1, text: 'Custom E-commerce Platform', by: 'MetaBull' } },
    { common: 'Corporate', binomial: 'Official Site', photo: { url: w2, text: 'Corporate Identity Web', by: 'MetaBull' } },
    { common: 'Portfolio', binomial: 'Creative Showcase', photo: { url: w3, text: 'Artist Portfolio', by: 'MetaBull' } },
    { common: 'Landing Page', binomial: 'SaaS Launch', photo: { url: w4, text: 'Product Landing Page', by: 'MetaBull' } },
    { common: 'Web App', binomial: 'Dashboard', photo: { url: w5, text: 'Interactive Web Application', by: 'MetaBull' } },
];

const socialsData: GalleryItem[] = [
    { common: 'Instagram', binomial: 'Visual Grid', photo: { url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=900&auto=format&fit=crop&q=80', text: 'Instagram app', by: 'Alexander Shatov' } },
    { common: 'LinkedIn', binomial: 'B2B Strategy', photo: { url: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=900&auto=format&fit=crop&q=80', text: 'LinkedIn logo', by: 'Alexander Shatov' } },
    { common: 'X', binomial: 'Community', photo: { url: xLogo, text: 'X logo', by: 'MetaBull' } },
    { common: 'YouTube', binomial: 'Video Content', photo: { url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&auto=format&fit=crop&q=80', text: 'YouTube app', by: 'MetaBull' } },
];

const graphicData: GalleryItem[] = [
    { common: 'Brand Identity', binomial: 'Logos & Assets', photo: { url: g1, text: 'Brand Identity', by: 'MetaBull' } },
    { common: 'UI/UX Design', binomial: 'Web Apps', photo: { url: g2, text: 'UI/UX Design', by: 'MetaBull' } },
    { common: 'Social Posts', binomial: 'Content', photo: { url: g3, text: 'Social Posts', by: 'MetaBull' } },
    { common: 'Marketing Collateral', binomial: 'Digital', photo: { url: g4, text: 'Marketing Collateral', by: 'MetaBull' } },
    { common: 'Packaging', binomial: 'Product Design', photo: { url: g5, text: 'Packaging', by: 'MetaBull' } },
];

const duplicateData = (arr: GalleryItem[]) => [
    ...arr,
    ...arr.map((item, idx) => ({ ...item, photo: { ...item.photo, url: item.photo.url.includes('?') ? `${item.photo.url}&dup=${idx}` : `${item.photo.url}?dup=${idx}` } }))
];

const galleryCategories = [
    { id: 'graphic', label: 'Graphic', data: duplicateData(graphicData) },
    { id: 'videos', label: 'Videos', data: duplicateData(videosData) },
    { id: 'ads', label: 'Website', data: duplicateData(adsData) },
    { id: 'socials', label: 'Socials', data: duplicateData(socialsData) },
];


import { motion } from 'framer-motion';

const CircularGalleryDemo = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const activeData = galleryCategories[activeCategoryIndex].data;

    return (
        // Reduced padding-top from pt-40 to pt-16 and padding-bottom from pb-24 to pb-8 to decrease gaps.
        <div className="w-full bg-[#fafafa] text-slate-900 flex flex-col items-center justify-start overflow-x-hidden pt-16 pb-8">
            {/* Professional Text Header */}
            <div className="text-center w-full max-w-3xl mx-auto px-4 z-10 mb-12">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                    Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-500">Portfolio</span>
                </h1>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-xl mx-auto uppercase tracking-[0.2em] opacity-80">
                    Handcrafted Digital Masterpieces
                </p>
            </div>

            {/* High-End Sliding Category Navigation */}
            <div className="relative z-10 w-full flex justify-center mb-4 px-4 h-16">
                <div className="inline-flex items-center p-1 bg-slate-900/5 backdrop-blur-2xl border border-slate-900/10 rounded-2xl shadow-sm overflow-hidden max-w-[95vw] sm:max-w-fit">
                    <div className="flex gap-1 no-wrap h-full p-1">
                        {galleryCategories.map((category, idx) => {
                            const isActive = activeCategoryIndex === idx;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategoryIndex(idx)}
                                    className={`
                                        relative px-6 sm:px-10 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-300 whitespace-nowrap z-10
                                        ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-800'}
                                    `}
                                >
                                    {/* Sliding Background Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-slate-900 rounded-xl z-[-1]"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                        />
                                    )}
                                    
                                    <span>{category.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Gallery container pushed down below the navigation with mt-8. Increased height to prevent clipping. */}
            <div className="w-full h-[65vh] md:h-[75vh] relative z-0 mt-8 md:mt-12 transition-all duration-500 max-w-7xl mx-auto">
                <CircularGallery
                    key={galleryCategories[activeCategoryIndex].id}
                    items={activeData}
                    autoRotateSpeed={0.15}
                    hideTextOverlay={galleryCategories[activeCategoryIndex].id === 'graphic'}
                />
            </div>
        </div>
    );
};

export default CircularGalleryDemo;
