import { PHONE_NUMBER, ADDRESS } from "@/lib/constants";

interface FooterProps {
  scrollToPackages: () => void;
  scrollToHowItWorks: () => void;
  scrollToTestimonials: () => void;
  scrollToFaq: () => void;
  scrollToBookNow: () => void;
}

const Footer = ({
  scrollToPackages,
  scrollToHowItWorks,
  scrollToTestimonials,
  scrollToFaq,
  scrollToBookNow
}: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-['Inter'] font-bold text-2xl mb-4">Health @ <span className="text-[#f59e0b]">🏠</span></div>
            <p className="text-gray-300 mb-4">Premium doorstep diagnostic service providing accurate, affordable, and hassle-free blood testing.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button className="text-gray-300 hover:text-white">Home</button></li>
              <li><button onClick={scrollToPackages} className="text-gray-300 hover:text-white">Health Packages</button></li>
              <li><button onClick={scrollToHowItWorks} className="text-gray-300 hover:text-white">How It Works</button></li>
              <li><button onClick={scrollToBookNow} className="text-gray-300 hover:text-white">Book a Test</button></li>
              <li><button onClick={scrollToFaq} className="text-gray-300 hover:text-white">FAQs</button></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-gray-400"></i>
                <span className="text-gray-300">{ADDRESS}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-2 text-gray-400"></i>
                <span className="text-gray-300">{PHONE_NUMBER}</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">
                <strong>Disclaimer:</strong> Free home collection available in select cities. Please check service availability in your area before booking.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Health @ 🏠. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
