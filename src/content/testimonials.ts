import type { PageStory } from "@/components/page/StoryGrid";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Short employer label; shown after the role ("Dy. General Manager · SBI"). */
  org?: string;
  lang?: "hi";
  /** Rotates in the homepage "Bankers buy through us" section. */
  featured?: boolean;
};

/** Named client testimonials, in display order. New reviews go here. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Excellent service, professional approach, and complete transparency throughout the process. Thank you for making the property transaction smooth, hassle-free, and successful. Highly recommended.",
    name: "Rajeev Kumar Agrawal",
    role: "Dy. General Manager",
    org: "SBI",
    featured: true,
  },
  {
    quote:
      "I would like to express my sincere gratitude for your invaluable support and guidance throughout the process of booking my new flat in Noida. Your guidance, prompt responses, and sincere efforts made the entire process seamless and stress-free.",
    name: "Jitender Kumar",
    role: "DGM",
    org: "SBI",
    featured: true,
  },
  {
    quote:
      "Deeply grateful for the seamless support from our first site visit to long after possession. Their dedicated care ensured every step was transparent and stress-free. Truly professional partners.",
    name: "Anurag",
    role: "Analyst",
    org: "PwC",
    featured: true,
  },
  {
    quote:
      "I purchased my builder flat through Mr. Rajeev Kumar Pandey, and my experience was very positive. He guided me throughout the entire process, from property selection to documentation. His professional approach, prompt communication, and transparency helped make the purchase smooth and hassle-free. He was always available to address my queries and provided valuable assistance at every stage. I appreciate his dedication and would recommend him to anyone looking for reliable real estate guidance.",
    name: "Alok Kumar Mandal",
    role: "Deputy Manager",
    org: "State Bank of India",
  },
  {
    quote:
      "Rajiv made the entire home-buying and loan process much easier for clients. He was always available to guide the interested parties. I have also experienced the same and he patiently answered my queries, and helped me secure the right home. His knowledge, honesty, and commitment to helping clients truly stand out. I would happily recommend him to anyone looking for support with property purchase and home financing.",
    name: "Netrapal Singh",
    role: "AGM",
    org: "State Bank of India",
  },
  {
    quote:
      "I wanted to take a moment to sincerely thank you Rajeev Pandey ji of Applause group for all your help in securing my new dream flat Revulet of fusion group at Greater Noida. Your expertise, patience and dedication made what could have been stressful process feel incredibly smooth. I truly appreciate your going extra mile to bridge the gap between me and the builder. I could not have been done it without your honest efforts and guidance. Your candid approach towards the home buyers is testimonials for your credibility that one could trust you blindly for buying a flat at Noida/Greater Noida. All the best in your endeavours and for prospective home buyers in pursuit for a reliable builder amid lots of fake brokers around locality.",
    name: "Praveen Mansinghka",
    role: "Investor",
  },
  {
    quote:
      "प्रिय राजीव पांडेय जी, जैसा कि हम सभी जानते हैं, दिल्ली एवं दिल्ली-एनसीआर में अपना एक सुंदर घर होना हर व्यक्ति का सपना होता है। रियल एस्टेट क्षेत्र में आपके 15 वर्षों से अधिक के अनुभव ने न जाने कितने लोगों के इस सपने को साकार करने में महत्वपूर्ण भूमिका निभाई है। लेकिन आपकी सबसे बड़ी विशेषता केवल आपका अनुभव नहीं, बल्कि आपका मानवीय दृष्टिकोण और लोगों के साथ लंबे समय तक भरोसेमंद संबंध बनाने की भावना है। आप सदैव अपने ग्राहकों की आवश्यकताओं को समझकर उन्हें ईमानदारी, पारदर्शिता और समर्पण के साथ सही मार्गदर्शन प्रदान करते हैं। आपकी कार्यशैली, व्यवहार-कुशलता और लोगों के प्रति आत्मीयता आपको इस क्षेत्र में एक विशिष्ट पहचान दिलाती है। मैं आपके उज्ज्वल भविष्य और निरंतर सफलता की कामना करता हूँ।",
    name: "हनिश शर्मा",
    role: "Investor",
    lang: "hi",
  },
];

/** "Dy. General Manager · SBI", or just the role when there's no employer. */
export const byline = (t: Testimonial) => (t.org ? `${t.role} · ${t.org}` : t.role);

/** Unnamed outcome stories: what a purchase achieved rather than who said it. */
export const outcomes: PageStory[] = [
  {
    eyebrow: "Noida, Sector 150",
    title: "SBI employee family",
    meta: "3 BHK luxury apartment · Handpicked for secure appreciation",
    quote: "“The 25% capital appreciation within just 18 months has given us true financial peace of mind.”",
  },
  {
    eyebrow: "Outcome · Stress-free loan",
    quote:
      "My experience with Applause Reality while booking my flat was truly wonderful. From site visits to final handover, everything was handled seamlessly and it was made sure I had zero hassle with paperwork. Grateful to Applause Reality for making this journey so smooth",
    by: "Ashwani Baunthiyal — Homebuyer, SBI Dwarka",
  },
  {
    eyebrow: "Wave City, Ghaziabad",
    title: "Retired corporate executive",
    meta: "Independent floor · Smart-city infrastructure gateway",
    quote:
      "“Transparent documentation and zero hidden costs made this my best property investment for stable long-term growth.”",
  },
];
