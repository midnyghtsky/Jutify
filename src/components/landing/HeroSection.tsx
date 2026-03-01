import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Leaf, ShoppingBag, LogOut } from "lucide-react";
import CartDrawer from "@/components/cart/CartDrawer";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.jpeg";

const HeroSection = () => {
   const { user, signOut } = useAuth();
 
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden gradient-hero">
       {/* Navigation */}
       <nav className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/products" className="text-white/90 hover:text-white transition-colors flex items-center gap-1">
                <ShoppingBag className="w-4 h-4 text-secondary" />
                <span className="font-medium">Shop</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {!user ? (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              )}
              <CartDrawer />
            </div>
          </div>
       </nav>
 
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-sunshine/30 animate-float" />
        <div className="absolute top-40 right-20 w-12 h-12 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-sunshine-light/40 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-10 h-10 rounded-full bg-leaf-light/30 animate-float" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Animated jute bag illustration */}
        <div className="mb-8 animate-bounce-slow">
          <div className="inline-flex items-center justify-center w-44 h-44 rounded-full bg-card shadow-2xl overflow-hidden">
            <img src={logo} alt="Jutify Bags" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-8 drop-shadow-lg leading-tight tracking-tight">
          Discover Your Bag's <span className="text-secondary">Story</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
          Every jute bag has a journey. Scan the QR code on your bag to trace its path from farm to your hands—and see the positive impact you're making.
        </p>

        {/* CTA Button */}
        <Link to="/scan">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-xl bounce-hover animate-pulse-glow"
          >
            <Camera className="mr-2 h-6 w-6" />
            Scan Your Bag
          </Button>
        </Link>

        {/* Trust indicator */}
        <p className="mt-8 text-white text-sm flex items-center justify-center gap-2">
          <Leaf className="w-4 h-4" />
          Join thousands making sustainable choices
        </p>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L48 65C96 70 192 80 288 85C384 90 480 90 576 80C672 70 768 50 864 45C960 40 1056 50 1152 55C1248 60 1344 60 1392 60L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
