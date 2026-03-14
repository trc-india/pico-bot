export interface Kit {
  id: string;
  name: string;
  badge: string;
  price: number;
  age: string;
  accent: string;
  slug: string;
  image: string;
  tagline: string;
  bullets: string[];
  description: string;
}

export const KITS: Kit[] = [
  {
    id: "mini",
    name: "Mini Arduino Starter Kit",
    badge: "Beginner",
    price: 1899,
    age: "Ages 8+",
    accent: "#22c55e",
    slug: "mini-arduino-starter-kit-thinking-robot-compact-beginner-pack",
    image:
      "https://res.cloudinary.com/drwys1ksu/image/upload/v1770877019/Electronics-Mini-Kit_y3xsua.png",
    tagline: "Your first step into electronics & coding",
    bullets: [
      "20+ components included",
      "Block coding ready",
      "Breadboard prototyping",
      "Beginner tutorials",
    ],
    description:
      "The perfect entry point for young builders. This compact kit comes with everything needed to build your first circuits and start coding with Arduino. Block-based programming makes it easy for complete beginners.",
  },
  {
    id: "iot",
    name: "IoT Beginners Kit",
    badge: "Wi-Fi",
    price: 1899,
    age: "Ages 10+",
    accent: "#38bdf8",
    slug: "iot-kit-for-beginners-esp32-wireless-development-kit-thinking-robot-complete-starter-pack",
    image:
      "https://res.cloudinary.com/drwys1ksu/image/upload/v1770876991/IoT-Beginners-Pack-630x630_c2gz3b.png",
    tagline: "Connect to the internet & build smart devices",
    bullets: [
      "ESP32 Wi-Fi + Bluetooth",
      "IoT sensors included",
      "App control ready",
      "Cloud integration",
    ],
    description:
      "Step into the world of IoT with this comprehensive kit featuring the powerful ESP32 microcontroller. Build smart devices that connect to your phone and the internet.",
  },
  {
    id: "aio",
    name: "Arduino All-in-One Kit",
    badge: "Complete",
    price: 2299,
    age: "Ages 10+",
    accent: "#ff6b35",
    slug: "arduino-all-in-one-ultimate-starter-kit-thinking-robot-complete-beginner-pack",
    image:
      "https://res.cloudinary.com/drwys1ksu/image/upload/v1770877011/30-IN-ONE-ARDUINO-KIT-630x630_exvsmd.png",
    tagline: "Master robotics with 30+ sensors & actuators",
    bullets: [
      "30+ components",
      "Motors, servos & LEDs",
      "Tutorials & guides",
      "Python + C++ ready",
    ],
    description:
      "Our most comprehensive electronics kit with 30+ sensors and actuators. Perfect for students who want to go deep into robotics, automation, and programming with both Python and C++.",
  },
  {
    id: "pico",
    name: "PICO Bot 4-Wheel Robot",
    badge: "⭐ Popular",
    price: 2999,
    age: "Ages 10+",
    accent: "#f59e0b",
    slug: "pico-bot-4-wheel-robot-with-esp32-edition-thinking-robot-modular-robotics-kit",
    image:
      "https://res.cloudinary.com/drwys1ksu/image/upload/v1770959243/1_eqn481.png",
    tagline: "Build your own robot — then code it to move!",
    bullets: [
      "ESP32 powered",
      "4-wheel drive chassis",
      "Bluetooth control",
      "Obstacle avoidance",
    ],
    description:
      "Our flagship robot kit! Build a real 4-wheel drive robot with ESP32, control it from your phone via Bluetooth, and code it to avoid obstacles autonomously. The ultimate robotics experience for young makers.",
  },
  {
    id: "plant",
    name: "Smart Plant Monitoring Kit",
    badge: "IoT Project",
    price: 899,
    age: "Ages 12+",
    accent: "#a78bfa",
    slug: "smart-plant-monitoring-and-watering-kit-esp8266-automated-gardening-system",
    image:
      "https://res.cloudinary.com/drwys1ksu/image/upload/v1770876706/Screenshot_1_v71dbi.png",
    tagline: "Build an automated smart garden system",
    bullets: [
      "ESP8266 Wi-Fi board",
      "App-controlled watering",
      "Moisture & humidity sensors",
      "Manual + auto modes",
    ],
    description:
      "Combine coding with nature! Build an automated plant monitoring and watering system that you can control from your phone. Perfect for science fair projects and learning IoT concepts.",
  },
];
