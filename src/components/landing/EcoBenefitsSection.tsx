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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bounce-hover overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 relative">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl ${benefit.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed text-[15px]">
                  {benefit.description}
                </p>

                {/* Decorative gradient */}
                <div 
                  className={`absolute -bottom-8 -right-8 w-24 h-24 ${benefit.bgColor} rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
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

export default EcoBenefitsSection;
