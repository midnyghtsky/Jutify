import { Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-earth text-primary-foreground py-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-leaf/20">
              <Leaf className="w-6 h-6 text-leaf-light" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">JuteTrack</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-10">
            <Link to="/" className="font-body text-base hover:text-sunshine transition-colors">
              Home
            </Link>
            <Link to="/scan" className="font-body text-base hover:text-sunshine transition-colors">
              Scan
            </Link>
            <Link to="/education" className="font-body text-base hover:text-sunshine transition-colors">
              Learn
            </Link>
          </nav>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm opacity-90 font-body">
            Made with <Heart className="w-4 h-4 text-coral fill-coral" /> for the planet
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80">
          <p className="font-body">© 2024 JuteTrack. Empowering sustainable choices, one bag at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
