export interface CardSliderCard {
  mainImage: string;
  secondaryImage: string;
  title: string;
  description: string;
  features: { text: string }[];
  link: string;
  linkLabel: string;
}

export const OccasionsCardSlider: CardSliderCard[] = [
  {
    mainImage: "/images/occasions/weddings/card-1.png",
    secondaryImage: "/images/occasions/weddings/minicard-1.png",
    title: "Crystal Ballroom",
    description:
      "The Crystal Ballroom's pre-function foyer is at the bottom of the grand sweeping staircase, making this a great photo opportunity. Are you ready for your close-up?",
    features: [
      { text: "SWEEPING STAIRCASE" },
      { text: "ROSE CHANDELIERS" },
      { text: "STAGE/DANCEFLOOR" },
    ],
    link: "#",
    linkLabel: "Weddings",
  },
  {
    mainImage: "/images/occasions/weddings/card-2.png",
    secondaryImage: "/images/occasions/weddings/minicard-2.png",
    title: "Rodeo Ballroom",
    description:
      "Three rooms, one glorious location. The Rodeo Ballroom features a built-in stage and dance floor, and its signature chandeliers which have been maintained and restored to their original splendour. An adjacent pre-function area is enhanced by drapery fringe accents and a built-in-bar featuring natural stone.",
    features: [
      { text: "484M²/5,213FT²" },
      { text: "CHARMING TERRACE" },
      { text: "PRIVATE FOYER" },
    ],
    link: "#",
    linkLabel: "Weddings",
  },
  {
    mainImage: "/images/occasions/weddings/card-3.png",
    secondaryImage: "/images/occasions/weddings/minicard-3.png",
    title: "Crystal Garden",
    description:
      "The garden is filled with white and cream azaleas, camellias, roses, and flowering white magnolias. A lovely gazebo makes the perfect backdrop for a beautiful garden wedding or event.",
    features: [
      { text: "SERENE GARDEN SETTING" },
      { text: "WHITE-PILLARED GAZEBO" },
      { text: "QUINTESSENTIALLY LA" },
    ],
    link: "#",
    linkLabel: "Weddings",
  },
];