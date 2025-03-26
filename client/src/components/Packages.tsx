import { Button } from "@/components/ui/button";
import { PACKAGES } from "@/lib/constants";
import { CheckIcon } from "@/assets/icons";

interface PackagesProps {
  scrollToBookNow: () => void;
}

const Packages = ({ scrollToBookNow }: PackagesProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Inter'] font-bold text-gray-900 mb-4">Health Packages</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">Comprehensive health checkups tailored for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className={`bg-white border ${pkg.popular ? 'border-2 border-[#f59e0b]' : 'border-gray-200'} rounded-xl ${pkg.popular ? 'shadow-lg' : 'shadow-sm hover:shadow-md'} overflow-hidden relative transition`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-[#f59e0b] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <div className={`p-6 ${pkg.popular ? 'bg-yellow-50 border-b border-yellow-100' : 'bg-gray-50 border-b'}`}>
                <h3 className="text-xl font-['Inter'] font-bold text-gray-900">{pkg.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">{formatPrice(pkg.price)}</span>
                  <span className="ml-1 text-base font-medium text-gray-500"><s>{formatPrice(pkg.originalPrice)}</s></span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{pkg.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#10b981] mr-2">
                        <i className="fas fa-check-circle mt-1"></i>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button 
                    onClick={scrollToBookNow}
                    className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${pkg.popular ? 'bg-[#f59e0b] hover:bg-yellow-600' : 'bg-primary hover:bg-primary/90'} focus:outline-none`}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/tests" className="text-primary hover:text-primary/90 font-medium flex items-center justify-center">
            View all available tests <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Packages;
