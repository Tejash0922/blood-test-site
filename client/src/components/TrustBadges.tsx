import { TRUST_BADGES } from "@/lib/constants";

const TrustBadges = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Inter'] font-bold text-gray-900 mb-4">Why Trust Us</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">Reliable diagnostics backed by expertise and quality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_BADGES.map((badge, index) => (
            <div key={index} className="text-center bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="h-16 w-16 mx-auto mb-4">
                <i className={`${badge.icon} text-primary text-5xl`}></i>
              </div>
              <h3 className="text-lg font-['Inter'] font-medium text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
