import {
  Utensils,
  ShoppingCart,
  Hammer,
  Scissors,
  Shirt,
  Truck,
  Bike,
  BookOpen,
  Settings,
  Wrench,
  Phone,
  Home,
  Briefcase,
  PiggyBank,
  Stethoscope,
  Leaf,
  Dumbbell,
  Users,
  MoreHorizontal,
  Computer,
} from "lucide-react";

export const GROUPED_BUSINESS_TYPES = [
  {
    group: "Retail & Sales",
    options: [
      {
        label: "General Retail",
        value: "GENERAL_RETAIL",
        description:
          "Local shop selling daily-use items like biscuits, bread, juice, etc.",
        icon: ShoppingCart,
      },
      {
        label: "Wholesale",
        value: "WHOLESALE",
        description: "Bulk sales to retailers or institutions.",
        icon: Truck,
      },
      {
        label: "Electronics & Phone Shops",
        value: "ELECTRONICS_AND_PHONE_SHOPS",
        description: "Sells phones, accessories, chargers, or electronics.",
        icon: Phone,
      },
      {
        label: "Market Vendor",
        value: "MARKET_VENDOR",
        description:
          "Sells products in a physical market — vegetables, fabrics, etc.",
        icon: Home,
      },
      {
        label: "Building Materials Shop",
        value: "BUILDING_MATERIALS_SHOP",
        description: "Cement, iron rods, tiles, paint, etc.",
        icon: Hammer,
      },
    ],
  },
  {
    group: "Artisan & Production",
    options: [
      {
        label: "Food Processing",
        value: "FOOD_PROCESSING",
        description:
          "Turns raw foods into finished goods like fried chips or chinchin.",
        icon: Utensils,
      },
      {
        label: "Agro Processing",
        value: "AGRO_PROCESSING",
        description: "Processes farm products like maize, cassava, etc.",
        icon: Leaf,
      },
      {
        label: "Handmade Goods",
        value: "HANDMADE_GOODS",
        description:
          "Crafts local items like bags, soap, shoes, or decorations.",
        icon: Hammer,
      },
      {
        label: "Furniture & Woodwork",
        value: "FURNITURE_AND_WOODWORK",
        description: "Builds or repairs furniture and wooden goods.",
        icon: Wrench,
      },
      {
        label: "Tailoring & Fashion",
        value: "TAILORING_AND_FASHION",
        description: "Makes or repairs clothing and fashion wear.",
        icon: Shirt,
      },
    ],
  },
  {
    group: "Personal Services",
    options: [
      {
        label: "Barbershop",
        value: "BARBERSHOP",
        description: "Haircuts and grooming for men.",
        icon: Scissors,
      },
      {
        label: "Hair & Beauty Salon",
        value: "HAIR_AND_BEAUTY_SALON",
        description: "Braiding, styling, nails, makeup services.",
        icon: Users,
      },
      {
        label: "Laundry & Dry Cleaning",
        value: "LAUNDRY_AND_DRYCLEANING",
        description: "Washing and ironing clothes.",
        icon: Settings,
      },
      {
        label: "Cooking & Catering",
        value: "COOKING_AND_CATERING",
        description: "Prepares meals for daily sales or events.",
        icon: Utensils,
      },
    ],
  },
  {
    group: "Transport & Logistics",
    options: [
      {
        label: "Bike Transport (Okada)",
        value: "BIKE_TRANSPORT",
        description: "Motorbike transportation service.",
        icon: Bike,
      },
      {
        label: "Taxi Service",
        value: "TAXI_SERVICE",
        description: "Carries passengers using a taxi or car.",
        icon: Truck,
      },
      {
        label: "Cargo & Delivery",
        value: "CARGO_AND_DELIVERY",
        description: "Delivers packages, food, or goods locally.",
        icon: Truck,
      },
    ],
  },
  {
    group: "Knowledge & Professional Services",
    options: [
      {
        label: "Tutoring Services",
        value: "TUTORING_SERVICES",
        description: "Academic support for pupils and students.",
        icon: BookOpen,
      },
      {
        label: "Vocational Training",
        value: "VOCATIONAL_TRAINING",
        description: "Teaches practical skills like tailoring, computing, etc.",
        icon: Briefcase,
      },
      {
        label: "Freelance IT",
        value: "FREELANCE_IT",
        description: "Web, mobile dev, design, or digital freelancing.",
        icon: Computer,
      },
      {
        label: "Consulting",
        value: "CONSULTING",
        description: "Business, legal, tech, or health consulting services.",
        icon: Briefcase,
      },
    ],
  },
  {
    group: "Finance & Health",
    options: [
      {
        label: "Financial Services",
        value: "FINANCIAL_SERVICES",
        description: "POS, mobile money, microfinance, or savings groups.",
        icon: PiggyBank,
      },
      {
        label: "Pharmacy",
        value: "PHARMACY",
        description: "Licensed health products and medication.",
        icon: Stethoscope,
      },
      {
        label: "Traditional Medicine",
        value: "TRADITIONAL_MEDICINE",
        description: "Natural or herbal health remedies.",
        icon: Leaf,
      },
    ],
  },
  {
    group: "Fitness & Wellness",
    options: [
      {
        label: "Gym & Wellness",
        value: "GYM_AND_WELLNESS",
        description: "Fitness training, yoga, massage, wellness coaching.",
        icon: Dumbbell,
      },
    ],
  },
  {
    group: "Other",
    options: [
      {
        label: "Other",
        value: "OTHER",
        description: "Not listed above.",
        icon: MoreHorizontal,
      },
    ],
  },
];
