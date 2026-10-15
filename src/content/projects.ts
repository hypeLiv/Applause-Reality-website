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
  /** Search-snippet description, kept under ~155 characters. */
  metaDescription: string;
  /** Long-form description for the project's own page (from the live site). */
  overview: string[];
  /** Optional walkthrough film shown on the project page. */
  film?: { src: string; poster: string; title: string; portrait?: boolean };
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
    metaDescription:
      "Premium 3 BHK homes in a limited three-tower community at Sector MU, Greater Noida, with a clubhouse, pool and a proposed AQI-controlled environment.",
    summary:
      "Premium 3 BHK residences in a limited three-tower community with landscaped greens, jogging tracks, a clubhouse, pool and fitness facilities — plus a proposed AQI-controlled environment for everyday wellness.",
    overview: [
      "Hero Homes Sector MU, Greater Noida, presents premium 3 BHK residences designed for spacious, modern and healthier living. Spread across approximately 4.7 acres, the limited three-tower community features landscaped green spaces, jogging tracks, a clubhouse, swimming pool and fitness facilities.",
      "Thoughtfully planned homes range from 1,650 to 2,200 sq. ft., while the proposed AQI-controlled environment supports everyday wellness. It brings together contemporary design, privacy, comfort and lifestyle-focused amenities in a promising Greater Noida residential address.",
    ],
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
    metaDescription:
      "Gulshan Empire at Wave City, Ghaziabad: well-planned 3 and 4 BHK apartments on NH-24, amid planned greenery, wide roads and strong civic infrastructure.",
    summary:
      "A premium enclave by the Gulshan Group inside Wave City on NH-24 — well-laid-out 3 and 4 BHK apartments amid planned greenery, wide roads and strong civic infrastructure.",
    overview: [
      "Gulshan Wave City in Ghaziabad is a premium residential enclave by the reputed Gulshan Group, offering a refined lifestyle amid planned green surroundings and strong civic infrastructure. The project features well-laid-out 3 and 4 BHK apartments with modern comforts and thoughtful community spaces.",
      "Located within Wave City on NH-24, this integrated township is designed with ample open areas, wide roads and essential services, and enjoys convenient connectivity across the wider Delhi–NCR region.",
    ],
    film: { src: "/videos/gulshan.mp4", poster: "/images/poster-gulshan-headlines.jpg", title: "Gulshan Empire campaign film", portrait: true },
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
    metaDescription:
      "Godrej Arden, Sigma III, Greater Noida: nine towers of 3 and 4 BHK homes near Pari Chowk, at about 90 residents per acre, with a multi-level clubhouse.",
    summary:
      "Nine towers of spacious 3 and 4 BHK homes near Pari Chowk, kept quiet and private at around 90 residents per acre, with a multi-level clubhouse for every generation.",
    overview: [
      "Situated in the established neighbourhood of Pari Chowk, this development prioritises quiet living and family well-being. The estate covers 9.58 acres with nine residential towers comprising spacious 3 and 4 BHK layouts.",
      "By maintaining a low density of just 90 residents per acre, the project offers a secure and private sanctuary for your loved ones. A dedicated multi-level clubhouse provides essential recreation for all generations.",
    ],
    film: { src: "/videos/godrej-arden.mp4", poster: "/images/poster-godrej-arden.jpg", title: "Godrej Arden sample flat" },
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
    metaDescription:
      "Eternia Residences, Greater Noida West: 1–4 BHK luxury apartments near the Noida–Greater Noida Link Road, Yamuna Expressway and the Jewar Airport corridor.",
    summary:
      "An ultra-luxury community of 1–4 BHK apartments linked to the Noida–Greater Noida Link Road, Yamuna Expressway and the Jewar Airport corridor, with a metro station, schools and hospitals close by.",
    overview: [
      "Eternia Residences in Greater Noida West is an ultra-luxury residential community in Tech Zone 4, planned for calm, comfortable family living. The project offers thoughtfully designed 1, 2, 3 and 4 BHK apartments with contemporary amenities and everyday conveniences.",
      "The location connects smoothly to the Noida–Greater Noida Link Road, Yamuna Expressway and the upcoming Jewar Airport corridor. Daily needs are close by, with a nearby metro station, reputed schools like Lotus Valley, Fortis Hospital and Gaur City Mall all within a short drive.",
    ],
    film: { src: "/videos/eternia.mp4", poster: "/images/poster-eternia.jpg", title: "Eternia Residences lobby" },
    brochure: "/brochures/eternia.pdf",
  },
];

export const getProject = (key: string) => projects.find((p) => p.key === key);
