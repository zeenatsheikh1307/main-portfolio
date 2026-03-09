import React, { useState } from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import xLogo from '@/pages/assets/assests/vecteezy_social-media-x-logo-black-and-white-png_36623772.png';
import ytLogo from '@/pages/assets/assests/vecteezy_youtube-png-icon_16716475.png';
import g1 from '@/pages/assets/assests/graphic1.png';
import g2 from '@/pages/assets/assests/graphic2.png';
import g3 from '@/pages/assets/assests/graphic3.png';
import g4 from '@/pages/assets/assests/graphic4.png';
import g5 from '@/pages/assets/assests/graphic5.png';
const videosData: GalleryItem[] = [
    { common: 'Brand Anthem', binomial: 'Video Campaign', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773050518/video1_gilxpc.mp4', text: 'Brand Anthem', by: 'MetaBull' } },
    { common: 'Product Demo', binomial: 'Explainer', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773049917/video2_bwqmst.mp4', text: 'Product Demo', by: 'MetaBull' } },
    { common: 'Testimonial', binomial: 'Customer Story', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773050483/video3_ui7noh.mp4', text: 'Testimonial', by: 'MetaBull' } },
    { common: 'Social Short', binomial: 'Reels / TikTok', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773050486/video4_ftgrwz.mp4', text: 'Social Short', by: 'MetaBull' } },
    { common: 'Event Recap', binomial: 'Highlight Reel', photo: { url: 'https://res.cloudinary.com/drswsylge/video/upload/f_auto,q_auto,w_300,h_450,c_fill/v1773049885/video5_sxj8v1.mp4', text: 'Event Recap', by: 'MetaBull' } },
];

const adsData: GalleryItem[] = [
    { common: 'Search Ads', binomial: 'Google Ads', photo: { url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&auto=format&fit=crop&q=80', text: 'Data charts on screen', by: 'Luke Chesser' } },
    { common: 'Display Ads', binomial: 'Programmatic', photo: { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80', text: 'Tablet on desk', by: 'John Schnobrich' } },
    { common: 'Meta Ads', binomial: 'Facebook/IG', photo: { url: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=900&auto=format&fit=crop&q=80', text: 'Social media icons concept', by: 'Merakist' } },
    { common: 'Video Ads', binomial: 'YouTube', photo: { url: ytLogo, text: 'YouTube concept', by: 'MetaBull' } },
    { common: 'Retargeting', binomial: 'Conversion', photo: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80', text: 'Analytics', by: 'Carlos Muza' } },
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
    { id: 'ads', label: 'Ads', data: duplicateData(adsData) },
    { id: 'socials', label: 'Socials', data: duplicateData(socialsData) },
];



const CircularGalleryDemo = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const activeData = galleryCategories[activeCategoryIndex].data;

    return (
        // Reduced padding-top from pt-40 to pt-16 and padding-bottom from pb-24 to pb-8 to decrease gaps.
        <div className="w-full bg-[#fafafa] text-slate-900 flex flex-col items-center justify-start overflow-hidden pt-16 pb-8">
            {/* Text container is now statically positioned at the top instead of absolute/sticky, to prevent overlapping the images */}
            <div className="text-center w-full max-w-3xl mx-auto px-4 z-10 mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                    Explore Our Portfolio
                </h1>
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                    <span className="italic text-slate-400">Skip the generic templates.</span> Experience the unique, tailor-made digital solutions crafted by MetaBull Universe. What we create? Masterpieces.
                </p>
            </div>

            {/* Gallery container pushed down below the text with mt-12 */}
            <div className="w-full h-[55vh] md:h-[65vh] relative z-0 mt-8 md:mt-12 transition-all duration-500 max-w-7xl mx-auto">
                {/* Key forces the component to remount and restart animation when data changes. Speed increased significantly. */}
                <CircularGallery
                    key={galleryCategories[activeCategoryIndex].id}
                    items={activeData}
                    autoRotateSpeed={0.15}
                    hideTextOverlay={galleryCategories[activeCategoryIndex].id === 'graphic'}
                />
            </div>

            {/* Category Navigation Buttons */}
            <div className="relative z-10 w-full max-w-4xl mx-auto mt-8 md:mt-12 px-4">
                {/* A light grey line under all buttons */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200"></div>

                <div className="flex flex-row items-center justify-start sm:justify-center gap-8 sm:gap-16 md:gap-24 overflow-x-auto overflow-y-hidden scrollbar-hide w-full pb-1 px-4">
                    {galleryCategories.map((category, idx) => {
                        const isActive = activeCategoryIndex === idx;
                        return (
                            <div key={category.id} className="relative shrink-0 group">
                                <button
                                    onClick={() => setActiveCategoryIndex(idx)}
                                    className={`py-3 sm:py-4 text-center font-medium transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <span className="text-sm sm:text-lg md:text-xl lg:text-2xl tracking-wide whitespace-nowrap block">{category.label}</span>
                                </button>

                                {/* Active Underline */}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-600 via-purple-500 to-amber-500 shadow-sm transform origin-left transition-all duration-300 rounded-full"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CircularGalleryDemo;
