export interface CardSliderCard {
  mainImage: string;
  secondaryImage: string;
  title: string;
  description: string;
  features: { text: string }[];
  link: string;
  linkLabel: string;
}

export const DiningCardSlider: CardSliderCard[] = [
  {
    mainImage: "/images/dining/polo-lounge/polo-lounge-page1.png",
    secondaryImage: "/images/dining/polo-lounge/polo-lounge-mm.png",
    title: "Polo Lounge",
    description:
      "The most interesting room in Beverly Hills, still buzzing with hot names and hotter stories. Known as the epicentre of LA power dining, the Polo Lounge has been the favourite spot for generations of stars and Hollywood deal-makers.",
    features: [
      { text: "LIVE ENTERTAINMENT" },
      { text: "SUNDAY BRUNCH" },
      { text: "MCCARTHY SALAD" },
    ],
    link: "/dining/polo-lounge",
    linkLabel: "Explore Polo Lounge",
  },
  {
    mainImage: "/images/dining/cabana-cafe/cabana-cafe-page1.png",
    secondaryImage: "/images/dining/cabana-cafe/cabana-cafe-mm.png",
    title: "The Cabana Cafe",
    description:
      "Casual, fresh dining in a picture-perfect setting. Enjoy a relaxed meal in the LA sunshine while your view of the pool sparkles with sheer pleasure.",
    features: [
      { text: "POOLSIDE CHIC" },
      { text: "LEISURELY AMBIENCE" },
      { text: "LA SUNSHINE" },
    ],
    link: "/dining/cabana-cafe",
    linkLabel: "Explore Cabana Cafe",
  },
  {
    mainImage: "/images/dining/fountain-coffee/fountain-coffee-page1.png",
    secondaryImage: "/images/dining/fountain-coffee/fountain-coffee-mm.png",
    title: "The Fountain Coffee Room",
    description:
      "The iconic diner has been serving Hollywood stars since 1949 and you still never know who you might find yourself eating a slice of apple pie next to.",
    features: [
      { text: "LANDMARK DINER" },
      { text: "HOUSEMADE ICE CREAM" },
      { text: "FRESHLY PRESSED JUICES" },
    ],
    link: "/dining/fountain-coffee",
    linkLabel: "Explore Superior Room",
  },
];