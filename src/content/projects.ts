/** Current launches shown on /projects (order = display order). */
export type Project = {
  key: string;
  name: string;
  location: string;
  featured?: boolean;
  logo: { src: string; alt: string; w: number; h: number };
  photo: string;
  photoAlt: string;
  highlights: string;
  facts: { value: string; label: string }[];
  summary: string;
  brochure: string;
};

export const projects: Project[] = [
  {
    key: "hero-homes",
    name: "Hero Homes",
    location: "Sector MU, Greater Noida",
    featured: true,
    logo: { src: "/images/hero-homes-logo.png", alt: "Hero Homes logo", w: 490, h: 193 },
    photo: "/images/hero-homes-render.png",
    photoAlt: "Hero Homes Sector MU towers at sunset",
    highlights: "/images/hero-homes-highlights.png",
    facts: [
      { value: "3 BHK", label: "Premium residences" },
      { value: "1,650–2,200", label: "Sq. ft. homes" },
      { value: "~4.7 acres", label: "Three-tower community" },
      { value: "AQI-controlled", label: "Proposed environment" },
    ],
    summary:
      "Premium 3 BHK residences in a limited three-tower community with landscaped greens, jogging tracks, a clubhouse, pool and fitness facilities — plus a proposed AQI-controlled environment for everyday wellness.",
    brochure: "/brochures/hero-homes.pdf",
  },
  {
    key: "gulshan",
    name: "Gulshan Empire",
    location: "Wave City, Ghaziabad",
    logo: { src: "/images/gulshan-empire-logo.jpg", alt: "Gulshan Empire logo", w: 357, h: 112 },
    photo: "/images/gulshan-towers.png",
    photoAlt: "Aerial view of the Gulshan Empire towers at Wave City",
    highlights: "/images/gulshan-highlights.png",
    facts: [
      { value: "3 & 4 BHK", label: "Apartments" },
      { value: "Wave City", label: "Integrated township" },
      { value: "NH-24", label: "Direct connectivity" },
      { value: "Gulshan Group", label: "Developer" },
    ],
    summary:
      "A premium enclave by the Gulshan Group inside Wave City on NH-24 — well-laid-out 3 and 4 BHK apartments amid planned greenery, wide roads and strong civic infrastructure.",
    brochure: "/brochures/gulshan-wave-city.pdf",
  },
  {
    key: "godrej-arden",
    name: "Godrej Arden",
    location: "Sector Sigma III, Greater Noida",
    logo: { src: "/images/godrej-arden-logo.png", alt: "Godrej Arden logo", w: 563, h: 113 },
    photo: "/images/godrej-arden-living.png",
    photoAlt: "Godrej Arden sample-flat living room",
    highlights: "/images/godrej-arden-highlights.png",
    facts: [
      { value: "3 & 4 BHK", label: "Spacious layouts" },
      { value: "9.58 acres", label: "Nine towers" },
      { value: "~90", label: "Residents per acre" },
      { value: "Pari Chowk", label: "Established neighbourhood" },
    ],
    summary:
      "Nine towers of spacious 3 and 4 BHK homes near Pari Chowk, kept quiet and private at around 90 residents per acre, with a multi-level clubhouse for every generation.",
    brochure: "/brochures/godrej-arden.pdf",
  },
  {
    key: "eternia",
    name: "Eternia Residences",
    location: "Tech Zone 4, Greater Noida West",
    logo: { src: "/images/eternia.png", alt: "Eternia Residences logo", w: 333, h: 105 },
    photo: "/images/eternia-living.png",
    photoAlt: "Eternia Residences living and dining room",
    highlights: "/images/eternia-highlights.png",
    facts: [
      { value: "1–4 BHK", label: "Apartments" },
      { value: "Ultra-luxury", label: "Family community" },
      { value: "Jewar", label: "Airport corridor" },
      { value: "Metro", label: "Station nearby" },
    ],
    summary:
      "An ultra-luxury community of 1–4 BHK apartments linked to the Noida–Greater Noida Link Road, Yamuna Expressway and the Jewar Airport corridor, with a metro station, schools and hospitals close by.",
    brochure: "/brochures/eternia.pdf",
  },
];
