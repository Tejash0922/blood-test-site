import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OfferBanner from "@/components/OfferBanner";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import TrustBadges from "@/components/TrustBadges";
import BookingForm from "@/components/BookingForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Home = () => {
  const packagesRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const bookNowRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar 
        scrollToPackages={() => scrollToSection(packagesRef)}
        scrollToHowItWorks={() => scrollToSection(howItWorksRef)}
        scrollToTestimonials={() => scrollToSection(testimonialsRef)}
        scrollToFaq={() => scrollToSection(faqRef)}
        scrollToBookNow={() => scrollToSection(bookNowRef)}
      />
      <Hero scrollToBookNow={() => scrollToSection(bookNowRef)} scrollToPackages={() => scrollToSection(packagesRef)} />
      <Features />
      <OfferBanner />
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>
      <div ref={packagesRef}>
        <Packages scrollToBookNow={() => scrollToSection(bookNowRef)} />
      </div>
      <div ref={testimonialsRef}>
        <Testimonials />
      </div>
      <TrustBadges />
      <div ref={bookNowRef}>
        <BookingForm />
      </div>
      <div ref={faqRef}>
        <FAQ />
      </div>
      <Footer 
        scrollToPackages={() => scrollToSection(packagesRef)}
        scrollToHowItWorks={() => scrollToSection(howItWorksRef)}
        scrollToTestimonials={() => scrollToSection(testimonialsRef)}
        scrollToFaq={() => scrollToSection(faqRef)}
        scrollToBookNow={() => scrollToSection(bookNowRef)}
      />
    </div>
  );
};

export default Home;
