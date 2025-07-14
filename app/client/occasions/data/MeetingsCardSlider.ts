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
    mainImage: "/images/occasions/meetings/card-1.png",
    secondaryImage: "/images/occasions/meetings/minicard-1.png",
    title: "Crystal Ballroom",
    description:
      "The largest of our three ballrooms, starring a built-in stage and dancefloor. A glamorous Art Deco space with spectacular rose chandeliers and French doors overlooking the Crystal Garden and gazebo.",
    features: [
      { text: "SPACIOUS FOYER" },
      { text: "NATURAL LIGHT" },
      { text: "BUILT-IN STAGE" },
    ],
    link: "#",
    linkLabel: "Meetings",
  },
  {
    mainImage: "/images/occasions/meetings/card-2.png",
    secondaryImage: "/images/occasions/meetings/minicard-2.png",
    title: "Rodeo Ballroom",
    description:
      "The Rodeo Ballroom features a built-in stage and dance floor, and its signature chandeliers have been maintained and restored to their original splendour. An adjacent pre-function area is enhanced by drapery fringe accents and a built-in-bar featuring natural stone.",
    features: [
      { text: "484M²/5,213FT²" },
      { text: "CHARMING TERRACE" },
      { text: "PRIVATE FOYER" },
    ],
    link: "#",
    linkLabel: "Meetings",
  },
  {
    mainImage: "/images/occasions/meetings/card-3.png",
    secondaryImage: "/images/occasions/meetings/minicard-3.png",
    title: "Polo Private",
    description:
      "A stately, elegant room lined with rich wood paneling and suited to an intimate event with a touch of Hollywood sparkle. French doors lead onto a private patio for your own piece of the famous gardens.",
    features: [
      { text: "97M²/1,040FT²" },
      { text: "PRIVATE PATIO" },
      { text: "SURROUNDED BY GARDENS" },
    ],
    link: "#",
    linkLabel: "Meetings",
  },
];