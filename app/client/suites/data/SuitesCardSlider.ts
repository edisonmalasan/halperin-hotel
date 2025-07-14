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
    mainImage: "/images/suites/junior/junior-page.png",
    secondaryImage: "/images/suites/junior/junior-mm.png",
    title: "Junior Suite",
    description:
      "A much-loved suite in the nation’s most famous zip code. Spacious, elegant and utterly charming. Pure comfort awaits.",
    features: [
      { text: "57m²/615ft²" },
      { text: "LOTS OF NATURAL LIGHT" },
      { text: "GARDEN VIEW" },
      { text: "WORKING AREA" },
    ],
    link: "/suites/junior",
    linkLabel: "Explore Junior Suite",
  },
  {
    mainImage: "/images/suites/rodeo/rodeo-page.png",
    secondaryImage: "/images/suites/rodeo/rodeo-mm.png",
    title: "Rodeo Suite",
    description:
      "The epitome of ‘Pink Palace’ attitude and a wonderful suite in which to truly feel part of our history, style and culture. Plenty of room for entertaining or having your own, luxurious LA moment.",
    features: [
      { text: "117m²/1,265ft²" },
      { text: "A SENSE OF HISTORY" },
      { text: "WORKING FIREPLACE" },
      { text: "COMPLIMENTARY ROUND-TRIP TRANSFER" },
    ],
    link: "#",
    linkLabel: "Explore Rodeo Suite",
  },
  {
    mainImage: "/images/suites/crescent/crescent-page.png",
    secondaryImage: "/images/suites/crescent/crescent-mm.png",
    title: "Crescent Suite",
    description:
      "This is one of those suites that really needs to be seen to be understood. Here you'll live in utter splendour, surrounded by fine furnishings and an air of distinct Hollywood exclusivity. And, from your balcony, Beverly Hills is waiting to entertain you.",
    features: [
      { text: "95m²/1,050ft²" },
      { text: "PRIVATE BALCONY" },
      { text: "CITY VIEWS OVER BEVERLY HILLS" },
      { text: "COMPLIMENTARY ROUND-TRIP TRANSFER" },
    ],
    link: "/suites/crescent",
    linkLabel: "Explore Crescent Suite",
  },
  {
    mainImage: "/images/suites/presidential/presidential-page.png",
    secondaryImage: "/images/suites/presidential/presidential-mm.png",
    title: "Presidential Suite",
    description:
      "One of LA’s finest suites. Wildly beautiful in every way, this vast suite is ideal for high-level entertaining or your own celebrity-style getaway in a legendary setting.",
    features: [
      { text: "180m²/1,935ft²" },
      { text: "PRIVATE BALCONY" },
      { text: "WORKING FIREPLACE" },
      { text: "COMPLIMENTRAY ROUND-TRIP TRANSFER" },
    ],
    link: "/suites/presidential",
    linkLabel: "Explore Presidential Suite",
  },
];