# SEO content drafts — for review

Content follow-ups from the on-page SEO audit (14 Oct 2026). Nothing here is live yet.

**How to review:** mark each item ✅ approve, ✏️ edit (write the change inline), or ❌ drop.
Anything in **[CONFIRM: …]** is a fact only the client can verify — it ships only once confirmed.

Contents
1. In-article links for the four blog posts (+ content problems found while reading them)
2. FAQ — 10 buyer questions
3. Services page (`/services`)
4. Contact page (`/contact`)
5. The repeated "promise" block

---

## 1. In-article links

The audit found zero links inside article text. Target: 3–5 links per post, pointing to the projects, the corridor sections on `/projects`, other posts, and the consultation page.

> **Implementation note:** post bodies are plain text today, so the renderer can't show links. After approval I'll add a small `[text](/path)` syntax to the post renderer and apply the links below. The quoted text is the exact phrase that becomes the link.

### 1A. Hero Homes Sector MU Greater Noida: A Future-Ready Address…

| # | Where | Link text | Goes to |
|---|---|---|---|
| 1 | Para 2 — "This is where Hero Homes Sector MU Greater Noida enters the conversation." | "Hero Homes Sector MU Greater Noida" | `/projects/hero-homes` |
| 2 | Para under *Why Sector MU Is Gaining Attention* — "Greater Noida has gradually evolved…" | "Greater Noida" | `/projects#greater-noida` |
| 3 | Para under *5. Greater Noida May Suit Long-Term End Users* — append one sentence (new words): "For a fuller checklist, see our [home-buying tips for Delhi NCR families](/blog/essential-home-buying-tips-for-delhi-ncr-families)." | "home-buying tips for Delhi NCR families" | `/blog/essential-home-buying-tips-for-delhi-ncr-families` |
| 4 | *Evaluate Before You Book* — "Applause Reality helps buyers compare projects…" | "compare projects" | `/projects` |
| 5 | Last para — "Book a property consultation with Applause Reality…" | "Book a property consultation" | `/consultation` |

### 1B. Top Investment Flats in Delhi/NCR You Should Consider

> ⚠️ **Content problem — please decide before adding links.** This post recommends five projects Applause Reality doesn't sell (Godrej Nest, DLF Capital Greens, Mahindra Lifespace, Omaxe New Chandigarh, Eros Sampoornam). Omaxe New Chandigarh isn't in NCR at all. It also calls Jewar Airport "upcoming" (the Hero Homes post says commercial operations began on 15 June 2026), and suggests "SIPs in real estate funds".
>
> **Recommendation:** keep the post (it's an existing indexed URL) but add a new section near the top, *Bank-approved launches we're guiding families toward now* (draft below), and fix the airport line. Optionally drop Omaxe New Chandigarh.

**New section draft** (goes after *Understanding the Real Estate Market in Delhi/NCR*):

> **Bank-approved launches we're guiding families toward now**
>
> If you'd rather start from projects we know first-hand, these are the launches Applause Reality is working on today:
>
> - **[Hero Homes, Sector MU, Greater Noida](/projects/hero-homes)** — premium 3 BHK residences in a limited three-tower community.
> - **[Godrej Arden, Sector Sigma III, Greater Noida](/projects/godrej-arden)** — nine towers of 3 and 4 BHK homes near Pari Chowk, kept low-density.
> - **[Eternia Residences, Greater Noida West](/projects/eternia)** — 1–4 BHK apartments near the Noida–Greater Noida Link Road and the airport corridor.
> - **[Gulshan Empire, Wave City, Ghaziabad](/projects/gulshan)** — 3 and 4 BHK apartments inside the Wave City township on NH-24.
>
> Every one is bank-approved. [Compare them side by side](/projects) or [talk to an advisor](/consultation).

**Fix:** under *Godrej Nest* — "the upcoming Jewar Airport" → "Noida International Airport at Jewar, which began commercial operations in June 2026".

**Links in the existing text:**

| # | Where | Link text | Goes to |
|---|---|---|---|
| 1 | *Eros Sampoornam* — "Greater Noida is witnessing rapid development…" | "Greater Noida" | `/projects#greater-noida` |
| 2 | *Factors to Consider* — the "Location:" bullet | "Location" | `/blog/exploring-the-best-locations-for-flats-in-noida` |
| 3 | *Financing Your Investment* — the "Home Loans:" bullet | "Home Loans" | `/blog/essential-home-buying-tips-for-delhi-ncr-families#secure-financing` |
| 4 | Conclusion — "…or an affordable flat in Greater Noida…" | "an affordable flat in Greater Noida" | `/projects#greater-noida` |

### 1C. Exploring the Best Locations for Flats in Noida

| # | Where | Link text | Goes to |
|---|---|---|---|
| 1 | Intro — "…understanding the best locations in Noida is crucial." | "the best locations in Noida" | `/projects#noida` |
| 2 | *The Future of Noida Real Estate* — "Improved Connectivity:" bullet | "Upcoming metro lines" | `/blog/hero-homes-sector-mu-greater-noida-a-future-ready-address-for-corporate-and-banking-professionals#future-metro-improvements-could-support-commuters` |
| 3 | *Tips for Buying a Flat* — "Check Legal Documents:" bullet | "Check Legal Documents" | `/blog/essential-home-buying-tips-for-delhi-ncr-families#understand-legal-aspects` |
| 4 | Conclusion — append one sentence (new words): "If your budget points beyond Noida, [compare the current Greater Noida launches](/projects#greater-noida)." | "compare the current Greater Noida launches" | `/projects#greater-noida` |
| 5 | Last line — "Take the first step towards finding your perfect home today!" | "Take the first step" | `/consultation` |

> ⚠️ **Facts to verify (not link-related):** *Sector 50* says Fortis Hospital is located there. Fortis Noida is in Sector 62, and DPS Noida is in Sector 30. *Sector 62* credits the Noida–Greater Noida Expressway for access, but Sector 62 sits on NH-24. **[CONFIRM: correct or remove these two lines.]**

### 1D. Essential Home Buying Tips for Delhi/NCR Families

| # | Where | Link text | Goes to |
|---|---|---|---|
| 1 | *Popular Neighborhoods* — "Noida:" bullet | "Noida" | `/blog/exploring-the-best-locations-for-flats-in-noida` |
| 2 | *Popular Neighborhoods* — add a bullet (new words): "**Greater Noida:** planned sectors, wider roads and new bank-approved launches near the airport corridor." | "Greater Noida" | `/projects#greater-noida` |
| 3 | *Engage a Reliable Real Estate Agent* — "A knowledgeable real estate agent can be invaluable…" | "A knowledgeable real estate agent" | `/about-applause-reality` |
| 4 | *Secure Financing* — "Compare Loan Offers:" bullet, append (new words): "SBI and PNB employees can also get [priority processing](/projects) on bank-approved projects." | "priority processing" | `/projects` |
| 5 | Conclusion — "Start your journey today…" | "Start your journey today" | `/consultation` |

> ⚠️ **Facts to verify:** stamp duty "4% to 7% … depending on the state". For Uttar Pradesh it's 7%, with a concession for women buyers. **[CONFIRM wording.]** The maintenance list ("cleaning gutters", "inspecting the roof") reads like it was written for independent houses abroad. **Suggest replacing** it with "lift and fire-safety servicing, seepage checks, and society maintenance dues".

---

## 2. FAQ — 10 buyer questions

**Where:** replace the three rhetorical questions in *Questions we answer every week* on `/projects` with this list, as an expandable accordion, and add FAQPage schema. The current three questions are statements of service, not questions buyers search for.

**1. What does "bank-approved project" mean?**
A lender has reviewed the project's land title and approvals and agreed to finance homes in it, so you can apply for a home loan against that project. It makes the loan smoother, but it doesn't replace your own checks of the RERA registration and the builder-buyer agreement.

**2. Do you charge buyers a fee?**
**[CONFIRM: the business model.]** Draft if true: "No. On new launches we work as an authorised channel partner and are paid by the developer, so our guidance costs you nothing."

**3. Which areas do you cover?**
Noida, Greater Noida, Greater Noida West and Wave City in Ghaziabad, along with the wider Delhi NCR corridors we track, including Vaishali.

**4. Which projects are you offering right now?**
[Hero Homes](/projects/hero-homes) in Sector MU, Greater Noida; [Godrej Arden](/projects/godrej-arden) in Sector Sigma III, Greater Noida; [Eternia Residences](/projects/eternia) in Greater Noida West; and [Gulshan Empire](/projects/gulshan) in Wave City, Ghaziabad. All four are bank-approved.

**5. How does priority processing for SBI and PNB employees work?**
We work closely with SBI and PNB through long-standing relationships, so your loan file is prepared correctly and reaches the right desk faster. Eligibility, interest rate and sanction are always the bank's decision. **[CONFIRM: any named scheme, rate benefit or timeline we can mention.]**

**6. Can you help if I'm not banking with SBI or PNB?**
**[CONFIRM.]** Draft: "Yes. We help you compare offers and prepare the paperwork with whichever lender you choose."

**7. What documents do I need for a home loan?**
Identity and address proof, income proof (salary slips or ITRs), six months of bank statements, and the property papers from the developer, such as the allotment letter and builder-buyer agreement. Your bank may ask for more depending on your profile.

**8. Will you come with me on site visits?**
Yes. We shortlist options that fit your budget and attend the site visits with you, so you can compare projects with someone on your side.

**9. What happens after I book?**
We handle the booking paperwork, coordinate your home loan, track the payment plan against construction milestones, and follow up with the developer through to possession. We stay on call after you get your keys.

**10. How can I check a project's RERA registration?**
Search the project name or registration number on the UP RERA portal (up-rera.in). Check that the registration is active, that the approved plans match what you're being sold, and that the possession date in your agreement matches the RERA filing.

---

## 3. Services page — `/services`

**Title:** Real Estate Services in Delhi NCR
**Meta description (145 chars):** Residential sales, commercial leasing, investment advisory and home-loan assistance across Noida, Greater Noida and Ghaziabad — from one advisor.
**Nav:** add "Services" between Projects and Blog (or footer only — your call).

**Hero**
- Label: What we do
- H1: Four services, *one* advisor beside you.
- Lead: Whether you're buying your first home, leasing an office or building a portfolio, Applause Reality handles the search, the paperwork and the loan — and stays on call after possession.

**Service 1 — Residential sales** (`#residential`)
Premium NCR homes and villas with verified bank approvals for secure living.
- Shortlists of bank-approved projects that fit your budget and timeline
- Site visits we attend with you
- Unit-level comparison: layout, floor, orientation, price
- Booking paperwork handled end to end
*Who it's for:* families and professionals buying to live in.
CTA: See current launches → `/projects`

**Service 2 — Commercial leasing** (`#commercial`)
Strategic leasing for office and retail spaces in high-visibility NCR business districts.
- **[CONFIRM: tenant-side, landlord-side or both?]**
- Shortlisting by footfall, access and frontage
- Lease terms reviewed before you sign
*Who it's for:* businesses taking office or retail space in Noida and Greater Noida.
CTA: Talk to an advisor → `/consultation`

**Service 3 — Investment advisory** (`#investment`)
Clear analysis and ROI strategies for residential and commercial property portfolios.
- Corridor comparison: price bands, growth drivers, infrastructure timelines
- Holding-period and liquidity planning, not just appreciation
- Second opinions on projects you're already considering
*Who it's for:* investors and NRIs building or rebalancing an NCR portfolio. **[CONFIRM: do you serve NRIs?]**
CTA: Compare corridors → `/projects`

**Service 4 — Home-loan assistance** (`#home-loans`)
Seamless loan processing and documentation through our bank-approved partnerships.
- Priority processing for SBI and PNB employees
- Document checklist and file preparation
- Coordination with the bank from application to disbursal
*Who it's for:* every buyer who needs financing.
CTA: Read the FAQ → `/projects#faq`

**How it works** (reuse the four journey steps): First visit → Booking → Bank approval → Possession & beyond.

**Schema:** a `Service` entry per service, linked to the RealEstateAgent business.

---

## 4. Contact page — `/contact`

**Recommendation:** add `/contact` as the address/NAP page and keep `/consultation` as the form page, since CTAs across the site already point to it. `/contact` links to the form instead of duplicating it.

**Title:** Contact Applause Reality
**Meta description (134 chars):** Call, WhatsApp or visit Applause Reality, Delhi NCR real estate consultants for Noida, Greater Noida and Ghaziabad. Free consultation.

**Hero**
- Label: Contact
- H1: Call, write or *drop by*.
- Lead: Every enquiry reaches Rajiv Kr. Pandey's team directly. Tell us what you're looking for and we'll take it from there.

**Details block**
- **Office:** **[CLIENT TO PROVIDE — full street address, exactly as on the Google Business Profile]**
- **Phone:** +91 99114 10109 · +91 99713 14877
- **WhatsApp:** +91 87968 57733 (consultations) **[CONFIRM: is this the public number?]**
- **Email:** concierge@applausereality.com
- **Hours:** **[CONFIRM: e.g. Mon–Sat, 10:00–19:00]**
- **Map:** Google Maps embed of the office (needs the address)
- CTA: Book a free consultation → `/consultation`

**Also needed from the client** (from the audit):
- Company social profiles (LinkedIn page, Instagram, Facebook, YouTube) for the footer and schema `sameAs`
- The Google Business Profile URL

Once the address arrives, the same NAP goes into the footer and the RealEstateAgent schema.

---

## 5. The repeated "promise" block

**Today:** the line "Beyond the transaction…" appears twice. Once in the founder bio on About ("Beyond the transaction, his promise is to stay a devoted partner…"), and once in the *Our partnership promise* band on `/projects` ("Beyond the transaction, Applause Reality stays by your side…").

**Proposal:** keep the About version (it's the founder's voice) and give `/projects` a project-specific version.

**Option A (recommended):**
> On every launch on this page, we stay with you past the brochure — site visits, paperwork checked against the RERA filing, your loan lined up with SBI or PNB, and follow-ups with the developer until the keys are in your hand. And after.

**Option B (shorter):**
> From the first site visit to the day you move in, one advisor handles the paperwork, the loan and the developer — and stays on call long after possession.
