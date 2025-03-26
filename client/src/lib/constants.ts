// Website info
export const WEBSITE_NAME = "Health @ 🏠 Doorstep Service";
export const TAGLINE = "Health at Your Doorstep – Accurate, Affordable, and Hassle-Free!";
export const PHONE_NUMBER = "+918777589212";
export const WHATSAPP_NUMBER = "+918777589212";
export const ADDRESS = "Kolkata, West Bengal";

// Packages
export const PACKAGES = [
  {
    id: "basic",
    name: "Basic Health Package",
    price: 999,
    originalPrice: 1249,
    description: "Essential tests for routine checkup",
    popular: false,
    features: [
      "Complete Blood Count (CBC)",
      "Blood Sugar (Fasting)",
      "Lipid Profile (Cholesterol)",
      "Kidney Function Test",
      "Liver Function Test",
      "TSH (Thyroid Stimulating Hormone)"
    ]
  },
  {
    id: "premium",
    name: "Premium Health Package",
    price: 1999,
    originalPrice: 2499,
    description: "Comprehensive assessment with 30+ tests",
    popular: true,
    features: [
      "All Basic Package Tests",
      "HBA1c (Diabetes Control)",
      "Testosterone",
      "Thyroid Profile",
      "Complete Thyroid Profile",
      "Vitamin B12 & D3",
      "Iron Profile + Electrolytes",
      "Urine Routine Examination"
    ]
  },
  {
    id: "executive",
    name: "Executive Health Package",
    price: 3599,
    originalPrice: 4499,
    description: "Complete health profile with 50+ tests",
    popular: false,
    features: [
      "All Premium Package Tests",
      "Cardiac Risk Markers",
      "Basic Arthritis Profile"
    ]
  }
];

// Features
export const FEATURES = [
  {
    icon: "fas fa-flask",
    title: "Wide Range of Tests",
    description: "1000+ blood tests covering diabetes, thyroid, liver, kidney, heart health, vitamins, and more."
  },
  {
    icon: "fas fa-home",
    title: "Free Home Collection",
    description: "Trained phlebotomists visit your home for sample collection (Door-to-Door Free Service)."
  },
  {
    icon: "fas fa-file-medical-alt",
    title: "Fast & Digital Reports",
    description: "Get accurate, online reports within 24–48 hours, accessible from anywhere."
  },
  {
    icon: "fas fa-certificate",
    title: "Trusted & Certified",
    description: "Partnered with NABL-accredited labs for reliable diagnostics you can trust."
  }
];

// How it works
export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Book Your Test",
    description: "Select your preferred tests or packages and schedule a convenient date and time.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    number: 2,
    title: "Home Visit",
    description: "Our trained phlebotomist visits your home at the scheduled time to collect samples.",
    image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    number: 3,
    title: "Lab Processing",
    description: "Your samples are processed in NABL-accredited labs with advanced equipment.",
    image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    number: 4,
    title: "Get Results",
    description: "Receive digital reports within 24 hours via email or our secure online portal. Hard copy will also be provided on your door step",
    image: "https://plus.unsplash.com/premium_photo-1661558580701-177e8302ed6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    content: "Got my diabetes report in 24 hrs – completely painless service! The technician was professional and made the experience comfortable. Will recommend to family.",
    name: "Rahul S.",
    location: "Kolkata",
    rating: 5,
    initials: "RS"
  },
  {
    id: 2,
    content: "As a busy professional, I couldn't be happier with Health @ 🏠. The home collection saved me hours of waiting at labs. Reports were detailed and easy to understand.",
    name: "Priya K.",
    location: "Kolkata",
    rating: 5,
    initials: "PK"
  },
  {
    id: 3,
    content: "Booked the Premium package for my parents. The technician arrived exactly on time, was courteous with my elderly parents, and the digital reports were comprehensive. Great value!",
    name: "Anand J.",
    location: "Kolkata",
    rating: 4.5,
    initials: "AJ"
  }
];

// Trust badges
export const TRUST_BADGES = [
  {
    icon: "fas fa-certificate",
    title: "NABL Accredited",
    description: "Our partner labs maintain highest quality standards with full accreditation"
  },
  {
    icon: "fas fa-user-md",
    title: "Expert Phlebotomists",
    description: "Professionally trained technicians with years of experience"
  },
  {
    icon: "fas fa-flask",
    title: "1M+ Tests Done",
    description: "Trusted by over a million customers across the country"
  },
  {
    icon: "fas fa-headset",
    title: "24/7 Support",
    description: "Round-the-clock customer service for all your questions"
  }
];

// FAQs
export const FAQS = [
  {
    question: "Is fasting required for blood tests?",
    answer: "Fasting is required for certain tests like blood glucose, lipid profile, and some hormone tests. Our technician will inform you about the fasting requirements when you book your test. Generally, 8-12 hours of fasting is recommended where applicable."
  },
  {
    question: "How long will it take to get my test reports?",
    answer: "Most routine test reports are available within 24-48 hours. For specialized tests, it may take up to 72 hours. You'll receive your report via email or through our secure online portal as soon as it's ready."
  },
  {
    question: "Is home collection really free?",
    answer: "Yes, home collection is completely free in all our serviceable areas. There are no hidden charges. You only pay for the tests you choose."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and cash. Payment can be made online during booking or at the time of home collection."
  },
  {
    question: "Are your labs and technicians certified?",
    answer: "Yes, we partner with NABL-accredited laboratories only. Our phlebotomists are professionally trained and certified with years of experience in sample collection."
  }
];

// Available service areas
export const SERVICE_AREAS = [
  "Kolkata"
];
