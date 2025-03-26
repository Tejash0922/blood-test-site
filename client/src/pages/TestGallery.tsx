import React, { useState } from 'react';
import { Link } from 'wouter';

const TestGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder for test images - these will be replaced with actual images provided by the user
  const testImages = [
    {
      id: 1,
      src: "/images/IMG-20250326-WA0002.jpg",
      alt: "Blood Tests Categories",
      title: "Blood Tests"
    },
    {
      id: 2,
      src: "/images/IMG-20250326-WA0003.jpg",
      alt: "Hormone Tests Categories",
      title: "Hormone Tests"
    },
    {
      id: 3,
      src: "/images/IMG-20250326-WA0004.jpg",
      alt: "Vitamin & Mineral Tests Categories",
      title: "Vitamin & Mineral Tests"
    },
    {
      id: 4,
      src: "/images/IMG-20250326-WA0005.jpg",
      alt: "Specialized Tests Categories",
      title: "Specialized Tests"
    },
    {
      id: 5,
      src: "/images/IMG-20250326-WA0006.jpg",
      alt: "Health Packages Categories",
      title: "Health Packages"
    },
    {
      id: 6,
      src: "/images/IMG-20250326-WA0007.jpg",
      alt: "Health Packages Categories",
      title: "Health Packages"
    },
    {
      id: 7,
      src: "/images/IMG-20250326-WA0008.jpg",
      alt: "Health Packages Categories",
      title: "Health Packages"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-['Inter'] font-bold text-gray-900 mb-4">All Available Tests</h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">Browse our comprehensive range of diagnostic tests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testImages.map((image) => (
            <div key={image.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              />
              <div className="p-6">
                <h3 className="text-xl font-['Inter'] font-bold text-gray-900 mb-2">{image.title}</h3>
                <p className="text-gray-600 mb-4">View all tests in this category</p>
                <button 
                  className="text-primary hover:text-primary/90 font-medium flex items-center"
                  onClick={() => setSelectedImage(image.src)}
                >
                  Explore tests <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-arrow-left mr-2"></i>Back
              </button>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-4">
              <img 
                src={selectedImage} 
                alt="Full size view" 
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestGallery;