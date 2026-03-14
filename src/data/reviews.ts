export interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  initial: string;
  accent: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Priya Sharma",
    role: "Parent · Mumbai",
    text: "My son assembled the PICO Bot in one afternoon and won't stop talking about it. He's writing actual Python now — I can't believe it!",
    rating: 5,
    initial: "P",
    accent: "#00d2c6",
  },
  {
    name: "Sunita Deshmukh",
    role: "आई · Kolhapur",
    text: "माझ्या मुलाने PICO Bot घरात बनवला आणि आता तो स्वतः Python वर code करतो! खूपच innovative आहे — पैशाचं value मिळालं नक्की. 🙏",
    rating: 5,
    initial: "S",
    accent: "#22c55e",
  },
  {
    name: "Rajesh Kharpude",
    role: "Science Teacher · DPS Nashik",
    text: "We ordered 3 Arduino kits for our school lab. Quality is fantastic and docs so clear — students are up and running in minutes. Excellent for CBSE projects.",
    rating: 5,
    initial: "R",
    accent: "#ff6b35",
  },
  {
    name: "Pratik Kamble",
    role: "9th Grade Student · Kolhapur",
    text: "Bro this kit is 🔥! Arduino All-in-One madhe 30 sensors ahet — I made a smart home model for science expo and won 1st place in district! 100% recommend!",
    rating: 5,
    initial: "P",
    accent: "#ffd60a",
  },
  {
    name: "Ananya Gupta",
    role: "Parent of twins · Pune",
    text: "Both my kids use different kits and both love them. The online guides are excellent. Way better quality than imported options at this price.",
    rating: 5,
    initial: "A",
    accent: "#a78bfa",
  },
  {
    name: "Dr. Vikram Mehta",
    role: "EdTech Consultant · Bangalore",
    text: "Finally an Indian STEM brand doing it right. The IoT kit is perfectly curated — nothing missing, nothing unnecessary. Full marks.",
    rating: 5,
    initial: "V",
    accent: "#38bdf8",
  },
];
