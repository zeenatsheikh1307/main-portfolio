"use client";

import React from "react";
import Carousel3D, { CarouselCard } from "@component2/ui/carousel-3d"; 
import {
  Code,
  Bug,
  BookOpen,
  Atom,
  GitBranch,
  Rocket,
  Palette,
  Database,
  Globe,
  Zap,
} from "lucide-react";

const Carousel3DDemo = () => {
  const memoryCards: CarouselCard[] = [
    {
      id: "t1",
      category: "DESTINATION: Paris, France",
      title: "The City of Lights",
      icon: <Globe />,
      preview: "Experience the timeless romance and grandeur of Paris.",
      content:
        "From the Eiffel Tower to quaint cafés along the Seine, Paris offers a magical mix of history, fashion, and food. Wander through Montmartre, admire masterpieces at the Louvre, and end your day with a view from the top of the Arc de Triomphe.",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "t2",
      category: "DESTINATION: Kyoto, Japan",
      title: "Tranquility and Tradition",
      icon: <BookOpen />,
      preview:
        "Step into Japan’s serene blend of nature, temples, and timeless culture.",
      content:
        "Kyoto is the soul of Japan, with serene temples, geisha culture, and elegant gardens. Visit the Fushimi Inari Shrine’s thousand torii gates, relax in a ryokan, and stroll through the cherry blossom-lined Philosopher’s Path.",
      imageUrl:
        "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
    },
    {
      id: "t3",
      category: "DESTINATION: Santorini, Greece",
      title: "Aegean Elegance",
      icon: <Palette />,
      preview: "Where whitewashed beauty meets deep blue horizons.",
      content:
        "Santorini’s charm lies in its cliffside villages, vibrant blue domes, and legendary sunsets. Explore the volcanic beaches, enjoy Mediterranean cuisine, and sail the caldera for unmatched views of this island paradise.",
      imageUrl:
        "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
    },
    {
      id: "t4",
      category: "DESTINATION: Cape Town, South Africa",
      title: "Adventure Meets Coast",
      icon: <Rocket />,
      preview: "A thrilling mix of mountain, ocean, and vibrant city life.",
      content:
        "Cape Town offers iconic landmarks like Table Mountain and Robben Island, beautiful beaches, and diverse cultures. Visit local markets, enjoy a cable car ride, or take a day trip to the Cape of Good Hope.",
      imageUrl: "https://images.pexels.com/photos/29049/pexels-photo.jpg",
    },
    {
      id: "t5",
      category: "DESTINATION: Banff, Canada",
      title: "Majestic Wilderness",
      icon: <Atom />,
      preview: "Immerse yourself in alpine lakes and rugged mountain peaks.",
      content:
        "Banff National Park is a haven for nature lovers. Hike around Lake Louise, marvel at glacier-fed waters, and breathe in the crisp mountain air. In winter, enjoy world-class skiing and cozy cabin stays under the northern lights.",
      imageUrl:
        "https://images.pexels.com/photos/1868676/pexels-photo-1868676.jpeg",
    },
    {
      id: "t6",
      category: "DESTINATION: Dubai, UAE",
      title: "Futuristic Oasis",
      icon: <Zap />,
      preview: "Where innovation meets luxury in the heart of the desert.",
      content:
        "Dubai dazzles with its skyline, luxury shopping, and desert adventures. From the towering Burj Khalifa to serene desert safaris, Dubai offers a mix of futuristic architecture and traditional souks in a world-class experience.",
      imageUrl:
        "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg",
    },
  ];

  const portfolioCards: CarouselCard[] = [
    {
      id: "t1",
      category: "TOUR: Paris, France",
      title: "Romance in the City of Lights",
      icon: <Palette />,
      preview: "Stroll through art, culture, and timeless elegance in Paris.",
      content:
        "Experience the magic of Paris — from the Eiffel Tower to cozy cafes in Montmartre. Whether you’re exploring the Louvre, enjoying a Seine River cruise, or shopping in Champs-Élysées, Paris offers romance and refinement at every turn.",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "t2",
      category: "TOUR: Kyoto, Japan",
      title: "Zen and the Art of Tradition",
      icon: <Database />,
      preview: "Ancient temples, bamboo forests, and cultural serenity await.",
      content:
        "Discover the peaceful beauty of Kyoto. Wander through Fushimi Inari’s red gates, meditate in tranquil zen gardens, and witness traditional tea ceremonies. Kyoto is where history whispers through every shrine and path.",
      imageUrl:
        "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
    },
    {
      id: "t3",
      category: "TOUR: Santorini, Greece",
      title: "Sunsets Over Blue Domes",
      icon: <Globe />,
      preview: "Aegean views and island charm like no other.",
      content:
        "Explore the iconic cliffside villages of Santorini with their whitewashed buildings and cobalt domes. Enjoy sunset dinners, crystal-clear beaches, and a rich mix of Greek heritage and island luxury.",
      imageUrl:
        "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
    },
    {
      id: "t4",
      category: "TOUR: Dubai, UAE",
      title: "Skyscrapers & Sand Dunes",
      icon: <Zap />,
      preview: "A modern marvel rising from golden sands.",
      content:
        "Dubai dazzles with innovation and indulgence. Soar atop the Burj Khalifa, shop in the world's largest mall, or ride across desert dunes. It’s a fusion of futuristic skylines and ancient Arabian charm.",
      imageUrl:
        "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg",
    },
  ];

  return (
    <div className="space-y-40 p-6">
      <div className="space-y-6 ">
        <div className="space-y-2 mb-20">
          <h3 className="text-2xl font-semibold">Default Carousel</h3>
          {/* <p className="text-muted-foreground">
            Auto-rotating Square carousel with pause on hover.
          </p> */}
        </div>

        <div className="border rounded-lg p-8 bg-gradient-to-br from-background to-muted/20">
          <Carousel3D
            cards={memoryCards}
            cardWidth={300}
            cardHeight={400}
            radius={400}
            enableGlitchEffect={true}
            enableGlowEffect={true}
            showControls={true}
            showThemeToggle={true}
            onCardClick={(card, index) =>
              console.log("Card clicked:", card.title, index)
            }
            onCardFlip={(card, index, isFlipped) =>
              console.log("Card flipped:", card.title, isFlipped)
            }
            onRotate={(currentIndex) =>
              console.log("Rotated to index:", currentIndex)
            }
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">Square Carousel</h3>
          <p className="text-muted-foreground">
            Auto-rotating Square carousel with pause on hover.
          </p>
        </div>

        <div className="border rounded-lg p-8 bg-gradient-to-br from-background to-primary/5">
          <Carousel3D
            cards={portfolioCards}
            cardWidth={280}
            cardHeight={380}
            radius={350}
            autoRotate={true}
            autoRotateInterval={4000}
            pauseOnHover={true}
            enableGlitchEffect={false}
            enableGlowEffect={true}
            showThemeToggle={false}
          />
        </div>
      </div>

      {/* Compact Demo */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">Compact Version</h3>
          <p className="text-muted-foreground">
            Smaller cards with reduced drag sensitivity for mobile-friendly
            experience.
          </p>
        </div>

        <div className="border rounded-lg p-6 bg-gradient-to-br from-background to-secondary/10">
          <Carousel3D
            cards={portfolioCards.slice(0, 4)}
            cardWidth={240}
            cardHeight={320}
            radius={280}
            dragSensitivity={0.15}
            transitionDuration={0.3}
            enableGlowEffect={false}
            showControls={false}
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🎠 3D Circular Layout</h4>
            <p className="text-sm text-muted-foreground">
              Cards arranged in a perfect circle with smooth 3D rotations
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🔄 Flippable Cards</h4>
            <p className="text-sm text-muted-foreground">
              Click cards to reveal detailed content on the back
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🖱️ Multiple Navigation</h4>
            <p className="text-sm text-muted-foreground">
              Drag, touch, keyboard arrows, and control buttons
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">⚡ Auto-rotation</h4>
            <p className="text-sm text-muted-foreground">
              Optional automatic rotation with hover pause
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🎨 Theme Support</h4>
            <p className="text-sm text-muted-foreground">
              Built-in dark/light mode with system preference detection
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">📱 Responsive</h4>
            <p className="text-sm text-muted-foreground">
              Adapts to different screen sizes automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel3DDemo;
