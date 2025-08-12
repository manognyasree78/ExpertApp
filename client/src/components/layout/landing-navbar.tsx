import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bus, Menu, X } from "lucide-react";

interface LandingNavbarProps {
  onOpenAuth: (type: "login" | "signup") => void;
}

export function LandingNavbar({ onOpenAuth }: LandingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-sm border-b border-border-dark shadow-lg" data-testid="landing-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">

            <span className="text-xl font-bold text-white">Ottobon expertApp</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-text-muted hover:text-white transition-smooth"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-text-muted hover:text-white transition-smooth"
              data-testid="nav-about"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('for-experts')} 
              className="text-text-muted hover:text-white transition-smooth"
              data-testid="nav-experts"
            >
              For Experts
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-text-muted hover:text-white transition-smooth"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <Button 
              variant="ghost" 
              onClick={() => onOpenAuth("login")}
              className="text-text-muted hover:text-white"
              data-testid="nav-login"
            >
              Login
            </Button>
            <Button 
              onClick={() => onOpenAuth("signup")}
              className="bg-primary hover:bg-primary-hover"
              data-testid="nav-signup"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border-dark" data-testid="mobile-menu">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-text-muted hover:text-white transition-smooth py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-text-muted hover:text-white transition-smooth py-2"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('for-experts')}
              className="block w-full text-left text-text-muted hover:text-white transition-smooth py-2"
            >
              For Experts
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-text-muted hover:text-white transition-smooth py-2"
            >
              Contact
            </button>
            <div className="flex space-x-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenAuth("login")}
                className="flex-1"
              >
                Login
              </Button>
              <Button 
                onClick={() => onOpenAuth("signup")}
                className="flex-1 bg-primary hover:bg-primary-hover"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
