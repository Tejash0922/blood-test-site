import { useState, useEffect } from "react";
import { MenuIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  scrollToPackages: () => void;
  scrollToHowItWorks: () => void;
  scrollToTestimonials: () => void;
  scrollToFaq: () => void;
  scrollToBookNow: () => void;
}

const Navbar = ({
  scrollToPackages,
  scrollToHowItWorks,
  scrollToTestimonials,
  scrollToFaq,
  scrollToBookNow
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (callback: () => void) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    callback();
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary font-['Inter'] font-bold text-2xl">Health @ 🏠</span>
            </div>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <button 
                className="border-primary text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick(scrollToPackages)} 
                className="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Packages
              </button>
              <button 
                onClick={() => handleNavClick(scrollToHowItWorks)} 
                className="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => handleNavClick(scrollToTestimonials)} 
                className="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Testimonials
              </button>
              <button 
                onClick={() => handleNavClick(scrollToFaq)} 
                className="border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                FAQ
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              onClick={() => handleNavClick(scrollToBookNow)} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none"
            >
              Book Now
            </Button>
            
            <div className="ml-3 md:hidden">
              <button 
                type="button" 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button className="bg-primary-50 border-primary text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Home
            </button>
            <button 
              onClick={() => handleNavClick(scrollToPackages)}
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Packages
            </button>
            <button 
              onClick={() => handleNavClick(scrollToHowItWorks)}
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick(scrollToTestimonials)}
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleNavClick(scrollToFaq)}
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              FAQ
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
