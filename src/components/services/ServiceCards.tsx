
import React, { useEffect, useRef } from 'react';
import { Code, Video, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Code,
    title: 'Website Design & Development',
    description: 'Custom websites and web applications built with modern technologies, responsive design, and optimal performance.',
    features: ['Responsive Design', 'Performance Optimization', 'SEO Integration', 'Custom Functionality'],
    color: 'from-blue-500 to-purple-600',
    link: '/web-services'
  },
  {
    icon: Video,
    title: 'Video Editing & Post-Production',
    description: 'Professional video editing services including color grading, motion graphics, and sound design for compelling content.',
    features: ['Color Grading', 'Motion Graphics', 'Sound Design', 'Multi-format Export'],
    color: 'from-purple-500 to-pink-600',
    link: '/video-services'
  },
  {
    icon: Users,
    title: 'Social Media Strategy & Management',
    description: 'Comprehensive social media management including content creation, scheduling, and analytics-driven growth strategies.',
    features: ['Content Creation', 'Analytics & Insights', 'Community Management', 'Growth Strategy'],
    color: 'from-pink-500 to-orange-500',
    link: '/social-services'
  }
];

const ServiceCards = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in');
            }, index * 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = cardsRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-6" ref={cardsRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We specialize in three core areas that drive digital success and creative excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="service-card group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl opacity-0 block"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More Button */}
              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                <span className="mr-2">Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
