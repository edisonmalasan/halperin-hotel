export type Venue = {
    name: string;
    capacity: string;
    description: string;
    image: string;
    features: string[];
};

export type Package = {
    name: string;
    price: string;
    includes: string[];
    description: string;
};

export type Occasion = {
    id: string;
    name: string;
    description: string;
    image: string;
    features: string[];
    details: {
        venues: Venue[];
        packages: Package[];
    };
};

export const occasions: Record<string, Occasion> = {
    weddings: {
        id: "weddings",
        name: "Weddings",
        description: "Create your perfect wedding day with our elegant venues and comprehensive services",
        image: "/images/occasions/wedding-hero.jpg",
        features: [
            "Indoor and outdoor venues",
            "Wedding planning services",
            "Catering options",
            "Accommodation for guests",
            "Photography packages",
            "Floral arrangements",
        ],
        details: {
            venues: [
                {
                    name: "Grand Ballroom",
                    capacity: "Up to 300 guests",
                    description: "Elegant indoor venue with crystal chandeliers and marble floors",
                    image: "/images/occasions/wedding-ballroom.jpg",
                    features: [
                        "Crystal chandeliers",
                        "Marble dance floor",
                        "Private bridal suite",
                        "Built-in stage",
                    ],
                },
                {
                    name: "Garden Terrace",
                    capacity: "Up to 200 guests",
                    description: "Beautiful outdoor space with panoramic views",
                    image: "/images/occasions/wedding-garden.jpg",
                    features: [
                        "Landscaped gardens",
                        "Covered ceremony area",
                        "Outdoor reception space",
                        "Sunset views",
                    ],
                },
            ],
            packages: [
                {
                    name: "Essential Package",
                    price: "From $5,000",
                    description: "Perfect for intimate weddings",
                    includes: [
                        "Venue rental for 6 hours",
                        "Basic decoration",
                        "Standard catering for 50 guests",
                        "Event coordinator",
                        "Basic sound system",
                        "Tables and chairs",
                    ],
                },
                {
                    name: "Premium Package",
                    price: "From $10,000",
                    description: "Our most comprehensive wedding package",
                    includes: [
                        "Venue rental for 8 hours",
                        "Premium decoration",
                        "Full catering for 100 guests",
                        "Dedicated wedding planner",
                        "Photography package",
                        "Premium sound system",
                        "Custom lighting",
                        "Champagne toast",
                    ],
                },
            ],
        },
    },
    "social-events": {
        id: "social-events",
        name: "Social Events",
        description: "Perfect spaces for birthdays, anniversaries, and special celebrations",
        image: "/images/occasions/social-hero.jpg",
        features: [
            "Private dining rooms",
            "Customized menus",
            "Event decoration",
            "Professional staff",
            "Entertainment options",
            "Flexible layouts",
        ],
        details: {
            venues: [
                {
                    name: "Private Dining Room",
                    capacity: "Up to 50 guests",
                    description: "Intimate space perfect for family gatherings",
                    image: "/images/occasions/social-dining.jpg",
                    features: [
                        "Private bar",
                        "Custom lighting",
                        "Flexible seating",
                        "Audio-visual equipment",
                    ],
                },
                {
                    name: "Rooftop Lounge",
                    capacity: "Up to 100 guests",
                    description: "Modern space with city views",
                    image: "/images/occasions/social-rooftop.jpg",
                    features: [
                        "Panoramic city views",
                        "Outdoor terrace",
                        "Modern decor",
                        "Full bar service",
                    ],
                },
            ],
            packages: [
                {
                    name: "Celebration Package",
                    price: "From $2,000",
                    description: "Ideal for small gatherings",
                    includes: [
                        "Venue rental for 4 hours",
                        "Basic decoration",
                        "Buffet catering",
                        "Event staff",
                        "Basic sound system",
                        "Tables and chairs",
                    ],
                },
                {
                    name: "Deluxe Package",
                    price: "From $4,000",
                    description: "Perfect for larger celebrations",
                    includes: [
                        "Venue rental for 6 hours",
                        "Premium decoration",
                        "Plated dinner service",
                        "Dedicated event coordinator",
                        "Entertainment options",
                        "Premium sound system",
                        "Custom lighting",
                        "Full bar service",
                    ],
                },
            ],
        },
    },
    meetings: {
        id: "meetings",
        name: "Meetings & Conferences",
        description: "Professional meeting spaces and conference facilities for your business needs",
        image: "/images/occasions/meetings-hero.jpg",
        features: [
            "Conference rooms",
            "Business center",
            "Catering services",
            "Audio-visual equipment",
            "High-speed WiFi",
            "Technical support",
        ],
        details: {
            venues: [
                {
                    name: "Executive Boardroom",
                    capacity: "Up to 20 people",
                    description: "Intimate space for executive meetings",
                    image: "/images/occasions/meetings-boardroom.jpg",
                    features: [
                        "Smart TV",
                        "Video conferencing",
                        "Executive seating",
                        "Coffee service",
                    ],
                },
                {
                    name: "Conference Center",
                    capacity: "Up to 200 people",
                    description: "Full-service conference facility",
                    image: "/images/occasions/meetings-conference.jpg",
                    features: [
                        "Projection system",
                        "Stage",
                        "Breakout rooms",
                        "Registration area",
                    ],
                },
            ],
            packages: [
                {
                    name: "Business Package",
                    price: "From $1,000",
                    description: "Essential meeting package",
                    includes: [
                        "Room rental for 4 hours",
                        "Basic AV equipment",
                        "Coffee break service",
                        "WiFi access",
                        "Flip charts",
                        "Basic catering",
                    ],
                },
                {
                    name: "Corporate Package",
                    price: "From $3,000",
                    description: "Comprehensive conference package",
                    includes: [
                        "Full-day venue rental",
                        "Advanced AV equipment",
                        "Full catering service",
                        "Dedicated technical support",
                        "Business center access",
                        "Registration support",
                        "Custom branding options",
                    ],
                },
            ],
        },
    },
    "event-spaces": {
        id: "event-spaces",
        name: "Event Spaces",
        description: "Versatile spaces for any type of event or celebration",
        image: "/images/occasions/events-hero.jpg",
        features: [
            "Multiple venue options",
            "Flexible layouts",
            "Custom catering",
            "Professional event staff",
            "Custom decoration",
            "Technical support",
        ],
        details: {
            venues: [
                {
                    name: "Grand Hall",
                    capacity: "Up to 500 guests",
                    description: "Spacious venue for large events",
                    image: "/images/occasions/events-hall.jpg",
                    features: [
                        "High ceilings",
                        "Multiple entrances",
                        "Loading dock",
                        "Dressing rooms",
                    ],
                },
                {
                    name: "Skyline Room",
                    capacity: "Up to 150 guests",
                    description: "Modern space with city views",
                    image: "/images/occasions/events-skyline.jpg",
                    features: [
                        "Floor-to-ceiling windows",
                        "Modern decor",
                        "Flexible layout",
                        "Private bar",
                    ],
                },
            ],
            packages: [
                {
                    name: "Standard Package",
                    price: "From $3,000",
                    description: "Basic event package",
                    includes: [
                        "Venue rental for 4 hours",
                        "Basic setup",
                        "Standard catering",
                        "Event staff",
                        "Basic sound system",
                        "Tables and chairs",
                    ],
                },
                {
                    name: "Premium Package",
                    price: "From $6,000",
                    description: "Comprehensive event package",
                    includes: [
                        "Venue rental for 6 hours",
                        "Premium setup",
                        "Full catering service",
                        "Dedicated event coordinator",
                        "Custom decoration",
                        "Premium sound system",
                        "Lighting design",
                        "Full bar service",
                    ],
                },
            ],
        },
    },
}; 