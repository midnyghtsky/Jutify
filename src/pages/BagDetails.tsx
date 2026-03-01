import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Leaf, 
  Droplets, 
  Scale, 
  Award, 
  Clock,
  Check,
  Share2,
   ExternalLink,
   ShoppingCart
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
 import { useCart } from "@/contexts/CartContext";
 import { useAuth } from "@/contexts/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { Link as RouterLink } from "react-router-dom";
import BagReviews from "@/components/bag/BagReviews";

interface BagData {
  id: string;
  bag_id: string;
  name: string;
  batch_number: string;
  image_url: string;
  farm_region: string;
  farm_country: string;
  artisan_name: string;
  artisan_story: string;
  carbon_saved_grams: number;
  water_saved_liters: number;
  weight_grams: number;
  biodegradable_months: number;
  certifications: string[];
  created_at: string;
}

// Demo data fallback
const demoBag: BagData = {
  id: "1",
  bag_id: "JUTE-001",
  name: "Classic Tote",
  batch_number: "BT-2024-001",
  image_url: "/placeholder.svg",
  farm_region: "Bengal Delta",
  farm_country: "Bangladesh",
  artisan_name: "Fatima Begum",
  artisan_story: "Fatima has been weaving jute bags for 15 years. Her skill has been passed down through three generations, combining traditional techniques with modern designs.",
  carbon_saved_grams: 200,
  water_saved_liters: 45,
  weight_grams: 180,
  biodegradable_months: 18,
  certifications: ["Organic", "Fair Trade", "GOTS Certified"],
  created_at: "2024-01-15",
};

const journeySteps = [
  { icon: "🌱", title: "Seed Planted", description: "Jute seeds sown in fertile delta soil" },
  { icon: "🌾", title: "Harvested", description: "Plants harvested after 4 months of growth" },
  { icon: "💧", title: "Retting Process", description: "Fibers extracted through natural water retting" },
  { icon: "🧵", title: "Fiber Processing", description: "Raw fibers cleaned and prepared for weaving" },
  { icon: "👐", title: "Artisan Crafted", description: "Handwoven by skilled artisans" },
  { icon: "✨", title: "Quality Checked", description: "Inspected for quality and durability" },
  { icon: "📦", title: "Ready for You", description: "Packaged sustainably and shipped" },
];

const BagDetails = () => {
  const { bagId } = useParams();
  const [bag, setBag] = useState<BagData | null>(null);
  const [loading, setLoading] = useState(true);
   const { addToCart } = useCart();
   const { user } = useAuth();

  useEffect(() => {
    const fetchBag = async () => {
      if (!bagId) return;

      try {
        const { data, error } = await supabase
          .from("jute_bags")
          .select("*")
          .eq("bag_id", bagId)
          .single();

        if (data && !error) {
          setBag(data as BagData);
          // Increment scan count
          await supabase.rpc("increment_scan_count");
        } else {
          // Use demo data if not found
          setBag(demoBag);
        }
      } catch (err) {
        setBag(demoBag);
      }
      setLoading(false);
    };

    fetchBag();
  }, [bagId]);

  const handleShare = async () => {
    const shareData = {
      title: `My ${bag?.name} Story`,
      text: `Check out my sustainable jute bag's journey from ${bag?.farm_country}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

   const handleAddToCart = async () => {
     if (bag) {
       await addToCart(bag.id);
     }
   };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading bag story...</p>
        </div>
      </div>
    );
  }

  if (!bag) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">Bag Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find a bag with that ID. Please check and try again.
            </p>
            <Link to="/scan">
              <Button>Scan Again</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
           <div className="flex items-center gap-2">
             {!user && (
               <RouterLink to="/auth">
                 <Button variant="outline" size="sm">Sign In</Button>
               </RouterLink>
             )}
             <Button variant="ghost" size="icon" onClick={handleShare}>
               <Share2 className="w-5 h-5" />
             </Button>
             <CartDrawer />
           </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-2xl">
        {/* Hero Product Card */}
        <section className="pt-6 pb-8">
          <Card className="overflow-hidden">
            {(() => {
              const bagImageMap: Record<string, string> = {
                "JUTE-001": "/images/bag-1.jpeg",
                "JUTE-002": "/images/bag-2.jpeg",
                "JUTE-003": "/images/bag-3.png",
              };
              const imgSrc = bagImageMap[bag.bag_id] || bag.image_url || "/images/bag-1.jpeg";
              return (
                <div className="w-full flex items-center justify-center bg-muted/30 p-4">
                  <img
                    src={imgSrc}
                    alt={bag.name}
                    className="max-h-[400px] w-auto object-contain"
                  />
                </div>
              );
            })()}
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{bag.name}</h1>
                  <p className="text-muted-foreground">Batch: {bag.batch_number}</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {bag.bag_id}
                </Badge>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2">
                {bag.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Farm Origin */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Farm Origin
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-leaf/10 flex items-center justify-center text-3xl">
                  🌾
                </div>
                <div>
                  <h3 className="font-bold text-lg">{bag.farm_region}</h3>
                  <p className="text-muted-foreground">{bag.farm_country}</p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                The fertile delta region of Bangladesh produces some of the world's finest jute, 
                known as the "Golden Fiber" for its lustrous appearance and sustainable qualities.
              </p>
            </CardContent>
          </Card>
        </section>


        {/* Sustainability Metrics */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Your Impact
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bounce-hover">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-leaf/10 flex items-center justify-center mx-auto mb-2">
                  <Leaf className="w-6 h-6 text-leaf" />
                </div>
                <p className="text-2xl font-bold text-foreground">{bag.carbon_saved_grams}g</p>
                <p className="text-sm text-muted-foreground">CO₂ Saved</p>
              </CardContent>
            </Card>
            
            <Card className="bounce-hover">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center mx-auto mb-2">
                  <Droplets className="w-6 h-6 text-sky" />
                </div>
                <p className="text-2xl font-bold text-foreground">{bag.water_saved_liters}L</p>
                <p className="text-sm text-muted-foreground">Water Saved</p>
              </CardContent>
            </Card>
            
            <Card className="bounce-hover">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-earth/10 flex items-center justify-center mx-auto mb-2">
                  <Scale className="w-6 h-6 text-earth" />
                </div>
                <p className="text-2xl font-bold text-foreground">{bag.weight_grams}g</p>
                <p className="text-sm text-muted-foreground">Bag Weight</p>
              </CardContent>
            </Card>
            
            <Card className="bounce-hover">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-coral" />
                </div>
                <p className="text-2xl font-bold text-foreground">{bag.biodegradable_months}mo</p>
                <p className="text-sm text-muted-foreground">To Biodegrade</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            The Journey
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {journeySteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4 relative">
                    {/* Timeline line */}
                    {index < journeySteps.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                    )}
                    
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl flex-shrink-0 z-10">
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Reviews */}
        <BagReviews bagId={bag.id} />

        {/* CTA */}
         <div className="text-center space-y-4 mb-8">
           <Button onClick={handleAddToCart} size="lg" className="rounded-full gap-2">
             <ShoppingCart className="w-5 h-5" />
             Add to Cart
           </Button>
         </div>
 
         <div className="text-center space-y-4">
          <Link to="/education">
            <Button variant="outline" className="rounded-full gap-2">
              Learn More About Jute
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Thank you for choosing sustainable! 🌍💚
          </p>
        </div>
      </main>
    </div>
  );
};

export default BagDetails;
