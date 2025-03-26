import { useState } from "react";
import { FAQS } from "@/lib/constants";
import { ChevronDownIcon } from "@/assets/icons";

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(prevOpen => prevOpen === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Inter'] font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">Get answers to common questions about our services</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-4 focus:outline-none bg-gray-50"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-medium text-gray-900 text-left">{faq.question}</span>
                  <ChevronDownIcon className={`text-gray-500 transition-transform h-5 w-5 ${openItem === index ? 'rotate-180' : ''}`} />
                </button>
                {openItem === index && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
