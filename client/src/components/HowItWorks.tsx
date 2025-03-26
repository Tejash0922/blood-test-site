import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Inter'] font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">Simple 4-step process for hassle-free testing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number} className="bg-white rounded-xl p-6 shadow-sm relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>
              <div className="h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-['Inter'] font-medium text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
