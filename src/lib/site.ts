export const site = {
  name: "Applause Reality",
  url: "https://www.applausereality.com",
  email: "concierge@applausereality.com",
  emailHref:
    "mailto:concierge@applausereality.com?subject=Property%20Consultation%20Inquiry",
  phone: { display: "+91 99114 10109", href: "tel:+919911410109" },
  phones: ["+91 9911410109", "+91 9205763615"],
  // The founder's personal profile (schema only). The company's own profiles are in `social`.
  founderLinkedin: "http://www.linkedin.com/in/rajiv-kumar-pandey-7b89aa417",
  // Company profiles: shown in the footer and declared as the business's `sameAs` in the schema.
  social: [
    { label: "Instagram", href: "https://www.instagram.com/applause.reality/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/applausereality" },
    { label: "Facebook", href: "https://www.facebook.com/people/Applause-reality/61590716309621/" },
  ],
  // The office, written as on the Google Business Profile. Keep every use (footer, /contact, schema) identical to it.
  address: {
    street: "A-61, Sector 63 Rd, Hazratpur Wajidpur, Sector 63",
    locality: "Noida",
    region: "Uttar Pradesh",
    postalCode: "201309",
    country: "IN",
    oneLine: "A-61, Sector 63 Rd, Hazratpur Wajidpur, Sector 63, Noida, Uttar Pradesh 201309",
  },
  tagline: "रिश्ता बुकिंग के साथ भी, Possession के बाद भी",
  // Consultation / site-visit enquiries go to this number on the live site.
  whatsapp: "https://api.whatsapp.com/send?phone=918796857733",
  // "Click to Know More" on project cards uses the second line.
  whatsappProjects: "https://api.whatsapp.com/send?phone=919205763615",
  // The Google Business Profile: rating copied by hand (update as reviews come in).
  // Links use the listing's feature ID: #lrd=…,1 opens its reviews, …,3 the write-a-review box.
  google: {
    rating: 4.9,
    reviews: 37,
    reviewsUrl: "https://www.google.com/search?q=Applause+Reality+Noida#lrd=0x390cfbfe5bc1efc5:0x70e4a30bc7250fda,1",
    writeReviewUrl: "https://www.google.com/search?q=Applause+Reality+Noida#lrd=0x390cfbfe5bc1efc5:0x70e4a30bc7250fda,3",
  },
};

/**
 * The office on Google Maps. `url` opens the Business Profile directly (the cid is the
 * listing's feature ID, 0x70e4a30bc7250fda, in decimal); `embed` finds it by business
 * name and address (no API key needed).
 */
const mapsQuery = encodeURIComponent(`${site.name} ${site.address.oneLine}`);
export const maps = {
  url: "https://maps.google.com/?cid=8134806097919021018",
  embed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about-applause-reality", label: "About Us" },
  { href: "/testimonials", label: "Testimonials" },
];
