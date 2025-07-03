export interface CardSliderCard {
  mainImage: string;
  secondaryImage: string;
  title: string;
  description: string;
  features: { text: string }[];
  link: string;
  linkLabel: string;
}

export const SuitesCardSlider: CardSliderCard[] = [
  {
    mainImage: "/images/homepage/CardSlider/bungalow-1.png",
    secondaryImage: "/images/homepage/CardSlider/bungalow-2.png",
    title: "Bungalow",
    description:
      "Charlie Chaplin's effervescent character lives on through every detail of this vibrant two bedroom bungalow. Quirky touches add depth and personality to a space that sings out with vintage Hollywood glamour and glorious comfort.",
    features: [
      { text: "Private patio" },
      { text: "Entertaining area" },
      { text: "Fireplace" },
    ],
    link: "#",
    linkLabel: "Explore Bungalow",
  },
  {
    mainImage: "/images/rooms/deluxe-balcony/deluxe-balcony-page.png",
    secondaryImage: "/images/rooms/deluxe-balcony/deluxe-balcony-mm.png",
    title: "Deluxe Room with Balcony",
    description:
      "A peaceful space with everything you need. A luxurious example of modern Californian style overlooking the city or lush gardens.",
    features: [
      { text: "49M²/525FT²" },
      { text: "PRIVATE BALCONY" },
      { text: "GARDEN OR CITY VIEWS" },
      { text: "LOTS OF NATURAL LIGHT" },
    ],
    link: "#",
    linkLabel: "Explore Deluxe Room with Balcony",
  },
  {
    mainImage: "/images/rooms/superior/superior-room-page.png",
    secondaryImage: "/images/rooms/superior/superior-room-mm.png",
    title: "Superior Room",
    description:
      "Spacious and airy, impeccably stylish with a dash of timeless Hollywood glamour. Perfect for the business traveler in search of some luxurious comfort and a true home from home.",
    features: [
      { text: "37M²/400FT²" },
      { text: "PEACEFUL LOCATION" },
      { text: "GARDEN VIEWS" },
      { text: "LOTS OF NATURAL LIGHT" },
    ],
    link: "#",
    linkLabel: "Explore Superior Room",
  },
  {
    mainImage: "/images/homepage/CardSlider/deluxe-patio-1.png",
    secondaryImage: "/images/homepage/CardSlider/deluxe-patio-2.png",
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