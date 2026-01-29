import React from "react";
import Navigation from "../Navigation";
import { TrendingUp, BarChart, Users, Target } from "lucide-react";

const AdsService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation />
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Ads & Performance Marketing
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Unlock growth with targeted advertising and data-driven performance marketing strategies. We help you reach the right audience, maximize ROI, and scale your business across digital platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-background border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Campaign Strategy</h3>
            <p className="text-muted-foreground mb-2">Custom ad campaigns tailored to your business goals and audience.</p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <BarChart className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics & Reporting</h3>
            <p className="text-muted-foreground mb-2">Detailed performance tracking, analytics, and transparent reporting.</p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <Users className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Audience Targeting</h3>
            <p className="text-muted-foreground mb-2">Advanced targeting to reach your ideal customers on every platform.</p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
            <Target className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Optimization</h3>
            <p className="text-muted-foreground mb-2">Continuous optimization for better results and lower ad spend.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <a href="/contact">
            <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-green-500/25">
              Start Your Campaign
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default AdsService;
