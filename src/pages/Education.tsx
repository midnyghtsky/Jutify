import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, Recycle, Droplets, Globe, Factory, Heart } from "lucide-react";
import Footer from "@/components/landing/Footer";

const comparisons = [
  {
    aspect: "Decomposition",
    jute: "2 years",
    plastic: "500+ years",
  },
  {
    aspect: "CO₂ Impact",
    jute: "Absorbs carbon",
    plastic: "Emits carbon",
  },
  {
    aspect: "Reusability",
    jute: "100+ uses",
    plastic: "Often single-use",
  },
  {
    aspect: "Ocean Impact",
    jute: "Safe if discarded",
    plastic: "Kills marine life",
  },
];

const facts = [
  {
    icon: Globe,
    title: "World's Second-Largest Natural Fiber",
    description: "After cotton, jute is the most cultivated plant fiber globally, grown primarily in Bangladesh and India.",
    color: "text-sky",
    bgColor: "bg-sky/10",
  },
  {
    icon: Leaf,
    title: "Carbon Superhero",
    description: "One hectare of jute plants can absorb up to 15 tons of CO₂ and release 11 tons of oxygen during its growth cycle.",
    color: "text-leaf",
    bgColor: "bg-leaf/10",
  },
  {
    icon: Droplets,
    title: "Rain-Fed Crop",
    description: "Jute requires minimal irrigation, relying mostly on monsoon rains, unlike water-intensive crops like cotton.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Factory,
    title: "Zero Waste Production",
    description: "Every part of the jute plant is used—fibers for bags, leaves for food, stalks for paper, and roots for fertilizer.",
    color: "text-earth",
    bgColor: "bg-earth/10",
  },
  {
    icon: Heart,
    title: "Supports Millions",
    description: "The jute industry provides livelihoods for over 4 million farming families in South Asia.",
    color: "text-coral",
    bgColor: "bg-coral/10",
  },
  {
    icon: Recycle,
    title: "Fully Compostable",
    description: "Unlike synthetic alternatives, jute bags can be composted at home, returning nutrients to the soil.",
    color: "text-sunshine",
    bgColor: "bg-sunshine/10",
  },
];

const journeyStages = [
  {
    emoji: "🌱",
    title: "Sowing",
    description: "Seeds are sown during the monsoon season (March-May). Jute thrives in warm, humid climates with plenty of rainfall.",
  },
  {
    emoji: "🌿",
    title: "Growing",
    description: "Plants grow rapidly, reaching 3-4 meters tall in just 4 months. No pesticides needed—jute is naturally pest-resistant.",
  },
  {
    emoji: "🌾",
    title: "Harvesting",
    description: "Plants are cut at the base when flowers begin to shed. Timing is crucial for fiber quality.",
  },
  {
    emoji: "💧",
    title: "Retting",
    description: "Stalks are submerged in water for 10-30 days. Microorganisms break down the outer bark, releasing the golden fibers.",
  },
  {
    emoji: "✨",
    title: "Extraction",
    description: "Workers strip fibers from the stalks by hand—a skill passed down through generations.",
  },
  {
    emoji: "☀️",
    title: "Drying",
    description: "Fibers are washed and dried in the sun, giving jute its distinctive golden color.",
  },
  {
    emoji: "🧵",
    title: "Processing",
    description: "Dried fibers are softened, carded, and spun into yarns ready for weaving.",
  },
  {
    emoji: "👜",
    title: "Weaving",
    description: "Skilled artisans weave the yarn into beautiful, durable bags using traditional looms.",
  },
];

const Education = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground font-medium text-sm mb-4">
            🌍 Learn
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            The Amazing World of Jute
          </h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto text-lg">
            Discover why jute is called the "Golden Fiber" and how your choice makes a difference.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Jute vs Plastic Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Jute vs Plastic: The Clear Winner
          </h2>
          
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="font-bold text-center py-3 border-b-2 border-primary">Aspect</div>
            <div className="font-bold text-center py-3 border-b-2 border-leaf bg-leaf/5 rounded-t-lg">
              🌿 Jute
            </div>
            <div className="font-bold text-center py-3 border-b-2 border-destructive bg-destructive/5 rounded-t-lg">
              ❌ Plastic
            </div>
            
            {comparisons.map((row, index) => (
              <>
                <div key={`aspect-${index}`} className="py-3 text-muted-foreground text-sm md:text-base">
                  {row.aspect}
                </div>
                <div key={`jute-${index}`} className="py-3 bg-leaf/5 text-center font-medium text-leaf text-sm md:text-base">
                  {row.jute}
                </div>
                <div key={`plastic-${index}`} className="py-3 bg-destructive/5 text-center text-destructive/70 text-sm md:text-base">
                  {row.plastic}
                </div>
              </>
            ))}
          </div>
        </section>

        {/* Environmental Facts */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Environmental Superpowers
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Jute isn't just eco-friendly—it actively helps heal our planet.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {facts.map((fact, index) => (
              <Card 
                key={fact.title} 
                className="bounce-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-xl ${fact.bgColor} mb-4`}>
                    <fact.icon className={`w-6 h-6 ${fact.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{fact.title}</h3>
                  <p className="text-muted-foreground">{fact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* The Jute Journey */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            From Seed to Bag
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            The fascinating 8-step journey of how jute becomes your sustainable bag.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {journeyStages.map((stage, index) => (
              <Card key={stage.title} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                      {stage.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-primary">Step {index + 1}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{stage.title}</h3>
                      <p className="text-muted-foreground text-sm">{stage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 px-6 rounded-3xl bg-gradient-to-br from-primary/10 to-sunshine/10">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Every jute bag you use replaces hundreds of plastic bags. Scan yours to see your personal impact!
          </p>
          <Link to="/scan">
            <Button size="lg" className="rounded-full">
              Scan Your Bag
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Education;
