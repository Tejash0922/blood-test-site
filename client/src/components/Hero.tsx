import { Button } from "@/components/ui/button";
import { WavePattern } from "@/assets/icons";
import { TAGLINE } from "@/lib/constants";

interface HeroProps {
  scrollToBookNow: () => void;
  scrollToPackages: () => void;
}

const Hero = ({ scrollToBookNow, scrollToPackages }: HeroProps) => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-blue-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-white font-['Inter'] font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
              Health at Your Doorstep
            </h1>
            <p className="text-blue-100 text-xl sm:text-2xl mb-8">
              {TAGLINE}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 border border-white/20">
              <div className="flex items-center">
                <div className="bg-[#f59e0b] rounded-full p-2 mr-3">
                  <i className="fas fa-tags text-white"></i>
                </div>
                <div>
                  <h3 className="text-white font-medium">Special Launch Discount</h3>
                  <p className="text-blue-100 text-sm">20% OFF on All Health Packages!</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToBookNow}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 focus:outline-none"
              >
                Book Now
              </Button>
              <Button 
                onClick={scrollToPackages}
                variant="outline"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 focus:outline-none"
              >
                View Packages
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Medical professional collecting blood sample" 
              className="rounded-lg shadow-xl max-w-full h-auto object-cover" 
              width="600" 
              height="400"
            />
          </div>
        </div>
      </div>
      
      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <WavePattern />
      </div>
    </section>
  );
};

export default Hero;
