export interface CardSliderCard {
  mainImage: string;
  secondaryImage: string;
  title: string;
  description: string;
  features: { text: string }[];
  link: string;
  linkLabel: string;
}

export const sliderCards: CardSliderCard[] = [
  {
    mainImage: "/images/rooms/bungalow/bungalow-page.png",
    secondaryImage: "/images/rooms/bungalow/bungalow-mm.png",
    title: "Bungalow 9",
    description:
      "Charlie Chaplin's effervescent character lives on through every detail of this vibrant two bedroom bungalow. Quirky touches add depth and personality to a space that sings out with vintage Hollywood glamour and glorious comfort.",
    features: [
      { text: "Private patio" },
      { text: "Entertaining area" },
      { text: "Fireplace" },
    ],
    link: "#",
    linkLabel: "Explore Bungalow 9",
  },
  {
    mainImage: "/images/suites/presidential/presidential-page.png",
    secondaryImage: "/images/suites/presidential/presidential-mm.png",
    title: "Presidential Suite",
    description:
      "One of LA's finest suites. Wildly beautiful in every way, this vast suite is ideal for high-level entertaining or your own celebrity-style getaway in a legendary setting.",
    features: [
      { text: "Fireplace" },
      { text: "Lots of natural light " },
      { text: "Lush surroundings" },
    ],
    link: "#",
    linkLabel: "Explore Presidential Suite",
  },
  {
    mainImage: "/images/suites/crescent/crescent-page.png",
    secondaryImage: "/images/suites/crescent/crescent-mm.png",
    title: "Crescent Bungalow Suite",
    description:
      "Many of Hollywood's most glamorous stars have staged legendary party scenes in these suites. There's just something about the stylish attitude that demands admiration and devotion.",
    features: [
      { text: "Private patio" },
      { text: "Lots of natural light " },
      { text: "Comfortable working area with desk" },
    ],
    link: "#",
    linkLabel: "Explore Crescent Bungalow Suite",
  },
  {
    mainImage: "/images/rooms/deluxe-patio/deluxe-patio-page.png",
    secondaryImage: "/images/rooms/deluxe-patio/deluxe-patio-mm.png",
    title: "Deluxe Room with Patio",
    description:
      "When your room is surrounded by lush, tropical gardens, a private patio feels like the most wonderful way to enjoy it. This is a bright, serene space dressed in effortless Californian style and modern luxury.",
    features: [
      { text: "Private patio" },
      { text: "Entertaining area" },
      { text: "Fireplace" },
    ],
    link: "#",
    linkLabel: "Explore Deluxe Room with Patio",
  },
];