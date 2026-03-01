 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
 import { supabase } from "@/integrations/supabase/client";
 import { useCart } from "@/contexts/CartContext";
 import { useAuth } from "@/contexts/AuthContext";
 import CartDrawer from "@/components/cart/CartDrawer";
 
 interface Bag {
   id: string;
   bag_id: string;
   name: string;
   image_url: string | null;
   farm_country: string;
   certifications: string[] | null;
   carbon_saved_grams: number;
 }
 
 const Products = () => {
   const [bags, setBags] = useState<Bag[]>([]);
   const [loading, setLoading] = useState(true);
   const { addToCart } = useCart();
   const { user } = useAuth();
 
   useEffect(() => {
     const fetchBags = async () => {
       const { data } = await supabase
         .from("jute_bags")
         .select("id, bag_id, name, image_url, farm_country, certifications, carbon_saved_grams")
         .order("created_at", { ascending: false });
 
       setBags(data || []);
       setLoading(false);
     };
 
     fetchBags();
   }, []);
 
   const handleAddToCart = async (bagId: string) => {
     await addToCart(bagId);
   };
 
   return (
     <div className="min-h-screen bg-background pb-8">
       <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
             <ArrowLeft className="w-5 h-5" />
             <span className="font-medium">Home</span>
           </Link>
           <div className="flex items-center gap-2">
             {!user && (
               <Link to="/auth">
                 <Button variant="outline" size="sm">Sign In</Button>
               </Link>
             )}
             <CartDrawer />
           </div>
         </div>
       </header>
 
        <main className="container mx-auto px-4 max-w-4xl pt-10">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight">Sustainable Jute Bags</h1>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              Each bag tells a story of sustainability and craftsmanship
            </p>
          </div>
 
         {loading ? (
           <div className="flex items-center justify-center py-12">
             <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
           </div>
         ) : bags.length === 0 ? (
           <Card className="max-w-md mx-auto">
             <CardContent className="p-8 text-center">
               <div className="text-6xl mb-4">🌱</div>
               <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
               <p className="text-muted-foreground">
                 Our collection of sustainable bags is being prepared. Check back soon!
               </p>
             </CardContent>
           </Card>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bags.map((bag, index) => {
                const bagImages = ["/images/bag-1.jpeg", "/images/bag-2.jpeg", "/images/bag-3.png"];
                return (
                <Card key={bag.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={bagImages[index % bagImages.length]}
                      alt={bag.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-leaf text-white">
                      {bag.carbon_saved_grams}g CO₂
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-lg mb-2 tracking-tight">{bag.name}</h3>
                    <p className="font-body text-sm text-muted-foreground mb-4">{bag.farm_country}</p>
                   
                   {bag.certifications && bag.certifications.length > 0 && (
                     <div className="flex flex-wrap gap-1 mb-4">
                       {bag.certifications.slice(0, 2).map((cert) => (
                         <Badge key={cert} variant="outline" className="text-xs flex items-center gap-1">
                           <Check className="w-2 h-2" />
                           {cert}
                         </Badge>
                       ))}
                     </div>
                   )}
 
                   <div className="flex gap-2">
                     <Link to={`/bag/${bag.bag_id}`} className="flex-1">
                       <Button variant="outline" className="w-full" size="sm">
                         View Details
                       </Button>
                     </Link>
                     <Button size="sm" onClick={() => handleAddToCart(bag.id)}>
                       <ShoppingCart className="w-4 h-4" />
                     </Button>
                   </div>
                 </CardContent>
                </Card>
                );
              })}
           </div>
         )}
       </main>
     </div>
   );
 };
 
 export default Products;