import { useEffect, useState } from "react";
import { Scan, TreePine, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImpactStats {
  totalScans: number;
  carbonSavedKg: number;
  treesEquivalent: number;
}

const ImpactCounter = () => {
  const [stats, setStats] = useState<ImpactStats>({
    totalScans: 0,
    carbonSavedKg: 0,
    treesEquivalent: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from("scan_metrics")
          .select("*")
          .single();

        if (data && !error) {
          setStats({
            totalScans: data.total_scans || 0,
            carbonSavedKg: data.carbon_saved_kg || 0,
            treesEquivalent: data.trees_equivalent || 0,
          });
        }
      } catch (err) {
        // No fallback - show only real data
      }
      setIsLoaded(true);
    };

    fetchStats();

    // Set up realtime subscription
    const channel = supabase
      .channel("scan_metrics_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "scan_metrics" },
        (payload) => {
          if (payload.new) {
            const newData = payload.new as any;
            setStats({
              totalScans: newData.total_scans || 0,
              carbonSavedKg: newData.carbon_saved_kg || 0,
              treesEquivalent: newData.trees_equivalent || 0,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const counterItems = [
    {
      icon: Scan,
      value: stats.totalScans,
      label: "Bags Reviewed",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Leaf,
      value: stats.carbonSavedKg,
      label: "kg CO₂ Saved",
      color: "text-leaf",
      bgColor: "bg-leaf/10",
    },
    {
      icon: TreePine,
      value: stats.treesEquivalent,
      label: "Trees Equivalent",
      color: "text-earth",
      bgColor: "bg-earth/10",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-5 text-foreground tracking-tight">
          Our Collective Impact
        </h2>
        <p className="font-body text-muted-foreground text-center mb-14 max-w-xl mx-auto leading-relaxed text-lg">
          Together, we're making a difference. Every scan represents a choice for sustainability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {counterItems.map((item, index) => (
            <div
              key={item.label}
              className={`relative p-8 rounded-2xl bg-card shadow-lg border border-border/50 bounce-hover ${
                isLoaded ? "animate-bounce-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-full ${item.bgColor} mb-4`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              
              <div className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3 tracking-tight">
                {isLoaded ? (
                  <AnimatedNumber value={item.value} />
                ) : (
                  "0"
                )}
              </div>
              
              <p className="font-body text-muted-foreground font-medium text-base">{item.label}</p>
              
              {/* Decorative gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 ${item.bgColor} rounded-full blur-3xl opacity-50`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Animated number component
const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

export default ImpactCounter;
