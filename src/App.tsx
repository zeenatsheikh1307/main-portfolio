import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import WebServices from "./pages/WebServices";
import VideoServices from "./pages/VideoServices";
import SocialServices from "./pages/SocialServices";
import NotFound from "./pages/NotFound";
import Contact from "./pages/contact";
import AdsService from "./pages/AdsService";
import AboutUs from "./pages/AboutUs";
import Team from "./pages/Team";
import LoadingScreen from "@/components/LoadingScreen";
import { LoadingProvider } from "@/contexts/LoadingContext";
import TestimonialDemo from "./pages/TestimonialDemo";
import PricingDemo from "./pages/PricingDemo";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <LoadingScreen />
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/web-services" element={<WebServices />} />
              <Route path="/video-services" element={<VideoServices />} />
              <Route path="/social-services" element={<SocialServices />} />

              <Route path="/ads-service" element={<AdsService />} />

              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonial-demo" element={<TestimonialDemo />} />
              <Route path="/pricing-demo" element={<PricingDemo />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
