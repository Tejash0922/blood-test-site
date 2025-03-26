import { FEATURES } from "@/lib/constants";

const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Inter'] font-bold text-gray-900 mb-4">Why Choose Health @ 🏠?</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">Premium diagnostic services from the comfort of your home.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center mb-4">
                <i className={`${feature.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-lg font-['Inter'] font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
