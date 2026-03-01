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
    </section>
  );
};

export default EcoBenefitsSection;
