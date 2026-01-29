import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Code, Video, Users, ArrowRight, Star, Award } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import web from "./assets/assests/Video.mp4";
import vid from "./assets/assests/original-b8969bc781998cd5a622d584dcb359a6.mp4";
import social from "./assets/assests/osmo.mp4";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Animate elements on scroll
    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          end: "bottom 20%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-4 md:px-6 py-5 md:py-20 text-center pt-24">
        {/* Background Video */}
        <div className="absolute top-0 right-0 w-full md:w-1/3 h-full overflow-hidden opacity-20">
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source
              src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-6 md:mb-8">
            <span className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 text-xs md:text-sm font-medium">
              <Star className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Premium Services
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wide mb-6 leading-tight text-glow">
            OUR
            <br />
            <span className="text-foreground te">DIGITAL</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SERVICES
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-foreground max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-normal">
            We specialize in three core areas that drive digital transformation
            and creative excellence for modern businesses
          </p>

          <div className="flex justify-center items-center gap-4 md:gap-8 mb-8 md:mb-12 flex-wrap">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                50+
              </div>
              <div className="text-foreground text-xs md:text-sm">Projects</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-background"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                100%
              </div>
              <div className="text-foreground text-xs md:text-sm">
                Satisfaction
              </div>
            </div>
            <div className="w-px h-8 md:h-12 bg-background"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                24/7
              </div>
              <div className="text-foreground text-xs md:text-sm">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="md:pl-24 services-grid px-4 md:px-3 py-5 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Code,
                title: "Web Dev",
                subtitle: "Modern Digital Solutions",
                description:
                  "Custom websites and web applications built with cutting-edge technologies, responsive design, and optimal performance for the modern web.",
                features: [
                  "Responsive Design",
                  "Performance Optimization",
                  "SEO Integration",
                  "Custom Functionality",
                  "E-commerce Solutions",
                  "CMS Development",
                ],
                link: "/web-services",
                color: "blue",
                video: web,
              },
              {
                icon: Video,
                title: "Video Production",
                subtitle: "Visual Storytelling",
                description:
                  "Professional video editing services including color grading, motion graphics, and sound design for compelling visual content that engages audiences.",
                features: [
                  "Color Grading",
                  "Motion Graphics",
                  "Sound Design",
                  "Multi-format Export",
                  "Animation",
                  "Post-Production",
                ],
                link: "/video-services",
                color: "purple",
                video: vid,
              },
              {
                icon: Users,
                title: "Social Strategy",
                subtitle: "Digital Marketing",
                description:
                  "Comprehensive social media management including content creation, scheduling, and analytics-driven growth strategies for maximum engagement.",
                features: [
                  "Content Creation",
                  "Analytics & Insights",
                  "Community Management",
                  "Growth Strategy",
                  "Brand Building",
                  "Campaign Management",
                ],
                link: "/social-services",
                color: "pink",
                video: social,
              },
            ].map((service, index) => (
              <div key={index} className="service-card group">
                <Link
                  to={service.link}
                  className="block bg-card/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-border hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:bg-card/80 h-full glow-border"
                >
                  <div className="flex">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 md:w-16 mr-3 md:h-16 rounded-2xl bg-gradient-to-br from-${service.color}-500/20 to-${service.color}-600/20 p-3 md:p-4 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 border border-${service.color}-500/30 glow-border `}
                    >
                      <service.icon
                        className={`w-full h-full text-${service.color}-400`}
                      />
                    </div>

                    {/* Content */}
                    <div className="mb-3 ">
                      <div
                        className={`text-${service.color}-400 text-xs md:text-sm font-medium mb-2 tracking-wide`}
                      >
                        {service.subtitle}
                      </div>
                      <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 hover:text-purple-300 transition-all duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <video
                      autoPlay
                      muted
                      loop
                      className="w-[80vw] h-[30vh] object-cover mb-3"
                    >
                      <source src={service.video} type="video/mp4" />
                    </video>
                  </div>

                  <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed font-normal text-sm md:text-base group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 md:mb-8">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-muted-foreground text-xs md:text-sm"
                      >
                        <div
                          className={`w-2 h-2 bg-${service.color}-400 rounded-full mr-3 flex-shrink-0`}
                        ></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <div
                    className={`flex items-center text-${service.color}-400 group-hover:text-${service.color}-300 transition-colors duration-300`}
                  >
                    <span className="mr-2 font-normal text-sm md:text-base">
                      Explore Service
                    </span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="md:pl-24 px-4 md:px-6 py-12 md:py-20 bg-gradient-to-t from-white/5 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 tracking-wide text-glow">
            WHY CHOOSE US
          </h2>

          <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Award,
                title: "Award Winning",
                desc: "Recognized for excellence in digital creativity",
              },
              {
                icon: Star,
                title: "Client Focused",
                desc: "100% satisfaction rate with personalized service",
              },
              {
                icon: Code,
                title: "Latest Tech",
                desc: "Cutting-edge tools and technologies",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Skilled professionals with years of experience",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm shadow-2xl   rounded-2xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <item.icon className="w-10 h-10 md:w-12 md:h-12 text-foreground mx-auto mb-3 md:mb-4 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                <h3 className="text-base md:text-lg font-bold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-foreground text-xs md:text-sm font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 tracking-wide text-glow">
            READY TO START?
          </h2>
          <p className="text-lg md:text-xl text-foreground mb-8 md:mb-12 font-normal">
            Let's discuss your project and create something extraordinary
            together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link to="/contact">
              <button className="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-foreground px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg tracking-wide transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40 text-glow hover:shadow-lg hover:shadow-white/20">
                Get Started Today
              </button>
            </Link>
            <Link to="/">
              <button className="border border-white/20 hover:border-white/40 text-foreground px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg tracking-wide transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-white/10">
                View Portfolio
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
