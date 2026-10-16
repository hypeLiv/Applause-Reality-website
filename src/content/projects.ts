/** Current launches shown on /projects (order = display order). */
export type Project = {
  key: string;
  name: string;
  location: string;
  featured?: boolean;
  logo: { src: string; alt: string; w: number; h: number };
  photo: string;
  photoAlt: string;
  /** One-page highlights graphic; leave out while it's out of date. */
  highlights?: string;
  facts: { value: string; label: string }[];
  summary: string;
  /** Search-result title when "name, location" runs long (the brand is appended). */
  seoTitle?: string;
  /** Search-snippet description, kept under ~155 characters. */
  metaDescription: string;
  /** Long-form description for the project's own page (from the live site). */
  overview: string[];
  /** Developer credit shown beside the location, e.g. "Hero Realty". */
  developer?: string;
  /** Floor plans on offer, shown as a table on the project page. */
  unitPlans?: { plan: string; area: string; towers: string }[];
  /** One line under the unit plans about what every home includes. */
  planNote?: string;
  /** Specifications included in the price. */
  specs?: { title: string; detail?: string }[];
  /** Short amenity highlights, shown as chips. */
  amenities?: string[];
  /** Optional walkthrough film shown on the project page. */
  film?: { src: string; poster: string; title: string; portrait?: boolean };
  brochure: string;
  /** Brochure size when it comes from Sanity; local brochures are measured on disk. */
  brochureBytes?: number;
};

export const projects: Project[] = [
  {
    key: "hero-homes",
    name: "Hero Homes Leafsong Retreat",
    location: "Sector MU, Greater Noida",
    developer: "Hero Realty",
    seoTitle: "Hero Homes Leafsong Retreat, Greater Noida",
    featured: true,
    logo: { src: "/images/hero-homes-logo.png", alt: "Hero Homes logo", w: 490, h: 193 },
    photo: "/images/hero-homes-render.png",
    photoAlt: "Leafsong Retreat by Hero Realty: three G+31 towers at Sector MU, Greater Noida",
    // Highlights sheet hidden until the client sends one matching the Leafsong Retreat specs.
    facts: [
      { value: "1,656–2,289", label: "Sq. ft. 3 BHK homes" },
      { value: "3 towers", label: "G+31 · six homes a floor" },
      { value: "75%", label: "Open green area" },
      { value: "AQI-controlled", label: "Homes & clubhouse (ERV)" },
    ],
    metaDescription:
      "Leafsong Retreat by Hero Realty, Sector MU Greater Noida: 3 BHK homes of 1,656–2,289 sq ft, six per floor, 75% open green and AQI-controlled living.",
    summary:
      "Premium 3 BHK homes of 1,656 to 2,289 sq ft across three G+31 towers, with only six homes a floor, 75% open green area, a three-zone clubhouse and AQI-controlled homes and club.",
    overview: [
      "Leafsong Retreat is Hero Realty's new address in Sector MU, Greater Noida: three G+31 towers of premium 3 BHK residences, with only six apartments on each floor. Homes come in four plans from 1,656 to 2,289 sq ft, each planned around light, privacy and room to breathe.",
      "Around 75% of the site is left open and green, laid out as three connected zones. The Social Heart has a celebration court and amphitheatre lawn for gatherings and group yoga. The Active Hub has a cricket pitch, pickleball and basketball courts, a bowling alley and a chess park. The Restorative Retreat has a butterfly garden, herb and vegetable garden, lotus pond, hammock garden, reflexology path and a 100-year-old mango tree. The ground floor is kept free of vehicles; arrival and parking are handled at basement level.",
      "The clubhouse is organised by mood. Parley is for gathering, with a concierge, banquet hall, restaurant, convenience store and book nook. Pulse is for energy, with a gym, open gym, squash court, Zumba and aerobics studio, indoor games arena and pet area. Pause is for slowing down, with yoga and meditation, a spa and salon, a senior lounge, art studio, knowledge centre and kids' arena. A podium level adds a lap pool, kids' pool, Jacuzzi and a pool-deck café.",
      "Homes and the clubhouse are AQI-controlled through an ERV (energy recovery ventilation) system. The project sits near the DMIC Integrated Industrial Township, one of Greater Noida's growing employment hubs.",
    ],
    unitPlans: [
      { plan: "3 BHK + 2 toilets (A)", area: "1,656 sq ft", towers: "T3" },
      { plan: "3 BHK + 2 toilets", area: "1,674 sq ft", towers: "T1, T2, T3" },
      { plan: "3 BHK + 3 toilets", area: "1,937.52 sq ft", towers: "T1, T2, T3" },
      { plan: "3 BHK + 3 toilets + servant room", area: "2,289.34 sq ft", towers: "T1, T2" },
    ],
    planNote:
      "Every apartment has a pooja room, a dry and a wet kitchen, a 10 ft-long master bedroom and toilet, and balconies 8 ft wide.",
    specs: [
      { title: "AQI-controlled homes and club", detail: "ERV (energy recovery ventilation) system" },
      { title: "Modular kitchen", detail: "Hob, chimney, RO and geyser" },
      { title: "Engineered marble flooring" },
      { title: "All-weather split ACs", detail: "Daikin or equivalent" },
      { title: "Living room", detail: "False ceiling and lights, as per design" },
      { title: "Fully fitted master bathroom", detail: "Vanity, shower cubicle, mirror and geyser" },
      { title: "Free transfer", detail: "Once 25% is paid" },
    ],
    amenities: [
      "75% open green area",
      "Lotus pond and retreat garden",
      "No vehicles on the ground floor",
      "Three-zone clubhouse",
      "Lap pool and pool-deck café",
      "Squash, pickleball, basketball and a cricket pitch",
      "Open business area with Wi-Fi",
      "Vastu compliant",
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

