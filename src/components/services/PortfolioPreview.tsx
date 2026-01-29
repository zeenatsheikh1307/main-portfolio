
import React, { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Project',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    type: 'web'
  },
  {
    id: 2,
    title: 'Brand Documentary',
    category: 'Video Reels',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop',
    type: 'video'
  },
  {
    id: 3,
    title: 'Startup Campaign',
    category: 'Social Campaigns',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    type: 'social'
  },
  {
    id: 4,
    title: 'SaaS Dashboard',
    category: 'Web Project',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    type: 'web'
  },
  {
    id: 5,
    title: 'Product Showcase',
    category: 'Video Reels',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop',
    type: 'video'
  },
  {
    id: 6,
    title: 'Influencer Strategy',
    category: 'Social Campaigns',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
    type: 'social'
  }
];

const PortfolioPreview = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Work</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore some of our recent projects and see how we bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedItem(item.id)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                
                {/* Play Icon for Videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                )}

                {/* External Link for Web Projects */}
                {item.type === 'web' && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.type === 'web' ? 'bg-blue-500/80 text-blue-100' :
                    item.type === 'video' ? 'bg-purple-500/80 text-purple-100' :
                    'bg-orange-500/80 text-orange-100'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  Click to view details
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
