import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, StarHalfIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={i} className="h-5 w-5" />
        ))}
        {hasHalfStar && <StarHalfIcon className="h-5 w-5" />}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Inter'] font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">Real experiences from real people</p>
        </div>

        <div className="relative">
          {/* Testimonial slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full md:min-w-[33.333%] px-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                    <div className="flex items-center mb-4">
                      {renderStarRating(testimonial.rating)}
                    </div>
                    <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-bold">{testimonial.initials}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-primary focus:outline-none"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-primary focus:outline-none"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
