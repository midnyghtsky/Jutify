import { Recycle, Droplets, Users, Leaf, TreePine, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Recycle,
    title: "100% Biodegradable",
    description: "Jute decomposes naturally in just 2 years, leaving zero trace behind.",
    color: "text-leaf",
    bgColor: "bg-leaf/10",
  },
  {
    icon: Leaf,
    title: "Carbon Absorbing",
    description: "Jute plants absorb CO₂ at 3x the rate of trees during growth.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Droplets,
    title: "Water Efficient",
    description: "Requires 80% less water than cotton farming.",
    color: "text-sky",
    bgColor: "bg-sky/10",
  },
  {
    icon: Users,
    title: "Supports Farmers",
    description: "Every bag supports sustainable farming communities.",
    color: "text-sunshine",
    bgColor: "bg-sunshine/10",
  },
  {
    icon: TreePine,
    title: "No Pesticides",
    description: "Jute grows naturally without harmful chemicals.",
    color: "text-earth",
    bgColor: "bg-earth/10",
  },
  {
    icon: Heart,
    title: "Reusable",
    description: "Strong and durable—use your bag hundreds of times.",
    color: "text-coral",
    bgColor: "bg-coral/10",
  },
];

const EcoBenefitsSection = () => {
  return (
    import React from 'react';

const SurveySection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 tracking-wide">
            🌿 Why Jute?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-5 tracking-tight">
            The Eco-Friendly Choice
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            When you choose jute, you're choosing a material that gives back to the planet.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {/* Card 1: Biodegradable */}
          <div className="rounded-lg bg-card text-card-foreground group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative p-6">
            <div className="inline-flex p-4 rounded-2xl bg-[#008000]/10 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#008000]">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path>
                <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path>
                <path d="m14 16-3 3 3 3"></path>
                <path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path>
                <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path>
                <path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">100% Biodegradable</h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Jute decomposes naturally in just 2 years, leaving zero trace behind.</p>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#008000]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
          </div>

          {/* Card 2: Carbon Absorbing */}
          <div className="rounded-lg bg-card text-card-foreground group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative p-6">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">Carbon Absorbing</h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Jute plants absorb CO₂ at 3x the rate of trees during growth.</p>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
          </div>

          {/* Card 3: Water Efficient */}
          <div className="rounded-lg bg-card text-card-foreground group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative p-6">
            <div className="inline-flex p-4 rounded-2xl bg-sky-500/10 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-sky-500">
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">Water Efficient</h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Requires 80% less water than cotton farming.</p>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
          </div>

          {/* Card 4: Supports Farmers */}
          <div className="rounded-lg bg-card text-card-foreground group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative p-6">
            <div className="inline-flex p-4 rounded-2xl bg-orange-500/10 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-orange-500">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">Supports Farmers</h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Every bag supports sustainable farming communities.</p>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
          </div>

          {/* Card 5: No Pesticides */}
          <div className="rounded-lg bg-card text-card-foreground group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative p-6">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-emerald-500">
                <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"></path>
                <path d="M12 22v-3"></path>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">No Pesticides</h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Jute grows naturally without harmful chemicals.</p>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
          </div>

          {/* Card 6: Reusable */}
          <div className="rounded-lg bg-card text-card-foreground group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative p-6">
            <div className="inline-flex p-4 rounded-2xl bg-rose-500/10 mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-rose-500">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">Reusable</h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">Strong and durable—use your bag hundreds of times.</p>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"></div>
          </div>
        </div>

        {/* Survey Section - Transparent Card you loved */}
        <div className="jutify-survey-container">
          <div className="survey-card group">
            <h3 className="survey-title">Survey: Help Us Improve!</h3>
            <p className="survey-description">
              We are constantly working to make Jutify the best experience possible for our users. 
              Your feedback is the most important part of that journey. Please take a moment 
              to share your thoughts, suggestions, and ideas with us.
            </p>
            
            <a 
              href="https://survey.sogolytics.com/r/ZJqkJ5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="survey-button animate-pulse-glow"
            >
              <span>Take the survey</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .jutify-survey-container {
          display: flex;
          justify-content: center;
          padding: 60px 0;
          background: transparent;
        }

        .survey-card {
          background: transparent;
          border: none;
          border-radius: 32px;
          padding: 80px 40px;
          width: 100%;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .survey-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
        }

        .survey-title {
          margin: 0 0 24px 0;
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #fff;
        }

        .survey-description {
          margin: 0 auto 48px auto;
          font-size: 1.4rem;
          opacity: 0.7;
          line-height: 1.6;
          max-width: 750px;
          color: #fff;
        }

        .survey-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-decoration: none;
          padding: 22px 64px;
          border-radius: 100px;
          font-size: 1.2rem;
          font-weight: 700;
          background-color: #d39380;
          color: #1a1a1a;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .survey-button :global(svg) {
          transition: transform 0.2s ease;
        }

        .survey-button:hover {
          transform: scale(1.05);
          background-color: #e0a391;
        }

        .survey-button:hover :global(svg) {
          transform: translateX(5px);
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(211, 147, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 25px 8px rgba(211, 147, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .survey-card::after {
          content: "";
          position: absolute;
          bottom: -2rem;
          right: -2rem;
          width: 15rem;
          height: 15rem;
          background: #d39380;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.1;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .survey-card:hover::after {
          opacity: 0.25;
        }

        @media (max-width: 768px) {
          .survey-title { font-size: 2.2rem; }
          .survey-description { font-size: 1.1rem; }
          .survey-card { padding: 40px 20px; }
          .survey-button { padding: 18px 40px; width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default SurveySection;
  );
};

export default EcoBenefitsSection;
