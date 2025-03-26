import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

// Set a 48-hour countdown from the time the component is first rendered
const calculateTimeLeft = (): TimeLeft => {
  // Store the end time in localStorage to persist across page reloads
  const storedEndTime = localStorage.getItem("offerEndTime");
  let endTime: number;
  
  if (storedEndTime) {
    endTime = parseInt(storedEndTime, 10);
  } else {
    // Set end time to 48 hours from now if not stored
    endTime = new Date().getTime() + 48 * 60 * 60 * 1000;
    localStorage.setItem("offerEndTime", endTime.toString());
  }
  
  const difference = endTime - new Date().getTime();
  
  if (difference <= 0) {
    // Reset if time has expired
    endTime = new Date().getTime() + 48 * 60 * 60 * 1000;
    localStorage.setItem("offerEndTime", endTime.toString());
    return { hours: 48, minutes: 0, seconds: 0 };
  }
  
  return {
    hours: Math.floor(difference / (1000 * 60 * 60)),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const OfferBanner = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });
  
  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };
  
  return (
    <section className="bg-gradient-to-r from-[#f59e0b] to-yellow-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-white text-2xl font-['Inter'] font-bold mb-2">Special Launch Offer!</h3>
              <p className="text-white/90 text-lg">20% OFF on All Health Packages + Free Fasting Sugar Test</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white mb-4 text-center">
                <p className="font-medium mb-1">Offer ends in:</p>
                <div className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 rounded-md px-3 py-2 text-xl font-bold">
                      {formatTime(timeLeft.hours)}
                    </div>
                    <span className="text-xs mt-1">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 rounded-md px-3 py-2 text-xl font-bold">
                      {formatTime(timeLeft.minutes)}
                    </div>
                    <span className="text-xs mt-1">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 rounded-md px-3 py-2 text-xl font-bold">
                      {formatTime(timeLeft.seconds)}
                    </div>
                    <span className="text-xs mt-1">Seconds</span>
                  </div>
                </div>
              </div>
              <Button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-[#f59e0b] bg-white hover:bg-gray-100 focus:outline-none">
                Book Now & Save 20%
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
