// All website copy lives here. Edit this file to change text, prices, testimonials, or links.
// Anything marked TODO is a placeholder that must be replaced with real information before launch.

// TODO: paste your real Calendly event link (e.g. "https://calendly.com/your-name/consultation").
// Once set, every "Book" button opens it in a new tab and the booking section embeds the calendar.
// While empty, buttons scroll to the booking section, which shows an "email us" fallback.
export const CALENDLY_URL = "https://calendly.com/junaidabdulhamid/free-consultation";

// Where every "Book consultation" button points.
export const BOOKING_URL = CALENDLY_URL || "/#book";

export const CONTACT = {
  email: "junaidabdulhamid@gmail.com",
  phone: "(571) 435-3507",
};

export const NAV = [
  { label: "Automations", href: "/#automations" },
  { label: "How It Works", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const HERO = {
  services: ["AI REVIEW AGENT", "AI RECEPTIONIST", "LEAD REACTIVATION"],
  pitch:
    "We install AI systems that answer every call, collect 5-star reviews, and turn old leads into booked jobs, automatically.",
  tag: "BUILT FOR SERVICE BUSINESSES",
  headline: ["Answer. Review.", "Revive."],
};

export const INDUSTRIES = [
  "HVAC",
  "Plumbing",
  "Roofing",
  "Dental",
  "Med Spas",
  "Auto Repair",
  "Landscaping",
  "Cleaning",
  "Electrical",
  "Law Firms",
];

export const PAIN_POINTS = [
  "Missed Calls",
  "After-Hours Voicemail",
  "Too Few Google Reviews",
  "Cold Leads in Your CRM",
  "Manual Follow-Ups",
];

export type Automation = {
  id: "reviews" | "receptionist" | "reactivation";
  index: string;
  category: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
};

export const AUTOMATIONS: Automation[] = [
  {
    id: "reviews",
    index: "01",
    category: "REPUTATION",
    title: "AI Review Agent",
    description:
      "The moment a job is marked complete, your customer gets a friendly text asking them to rate their experience. Happy customers are sent straight to your Google review page. Unhappy ones come privately to you first.",
    stats: [
      { value: "1 text", label: "SENT AFTER EVERY JOB" },
      { value: "5★", label: "ROUTED TO GOOGLE" },
    ],
  },
  {
    id: "receptionist",
    index: "02",
    category: "FRONT DESK",
    title: "AI Receptionist",
    description:
      "A natural-sounding voice agent that picks up every call, day or night. It answers questions about your business, qualifies the caller, and books the appointment straight into your calendar.",
    stats: [
      { value: "24/7", label: "CALLS ANSWERED" },
      { value: "0", label: "VOICEMAILS NEEDED" },
    ],
  },
  {
    id: "reactivation",
    index: "03",
    category: "REVENUE",
    title: "Dead Lead Reactivation",
    description:
      "Your old quotes and past customers are sitting in a spreadsheet doing nothing. We run personalised SMS campaigns that restart the conversation and hand you the leads who are ready to book.",
    stats: [
      { value: "100%", label: "OF YOUR OLD LIST WORKED" },
      { value: "Hot", label: "LEADS SENT TO YOU" },
    ],
  },
];

export const PROCESS = [
  {
    title: "1. Free Consultation",
    body: "We learn your business, your tools, and where leads and calls are slipping through.",
  },
  {
    title: "2. Build & Connect",
    body: "We set up your automations and plug them into your phone, calendar, and CRM.",
  },
  {
    title: "3. Launch & Improve",
    body: "You go live in days. We monitor, tune, and report on results every month.",
  },
];

// Tools shown in the integrations marquee. Edit to match what you actually support.
export const INTEGRATIONS = [
  "Google Business",
  "Google Calendar",
  "Calendly",
  "Jobber",
  "Housecall Pro",
  "ServiceTitan",
  "GoHighLevel",
  "HubSpot",
  "Twilio",
  "Zapier",
  "QuickBooks",
  "Outlook",
];

export const INCLUDED = [
  {
    index: "01",
    title: "AI Review Agent",
    blurb: "More 5-star reviews, on autopilot.",
    features: [
      "AUTOMATIC POST-JOB SMS",
      "SMART 5-STAR ROUTING TO GOOGLE",
      "PRIVATE FEEDBACK FOR UNHAPPY CUSTOMERS",
      "FRIENDLY REMINDER FOLLOW-UPS",
    ],
  },
  {
    index: "02",
    title: "AI Receptionist",
    blurb: "Never miss another call.",
    features: [
      "24/7 NATURAL VOICE ANSWERING",
      "APPOINTMENT BOOKING TO YOUR CALENDAR",
      "FAQ, PRICING & SERVICE-AREA ANSWERS",
      "CALL SUMMARIES SENT TO YOUR PHONE",
    ],
  },
  {
    index: "03",
    title: "Dead Lead Reactivation",
    blurb: "Revenue hiding in your old list.",
    features: [
      "CRM & SPREADSHEET LIST CLEANUP",
      "PERSONALISED SMS CAMPAIGNS",
      "AI REPLIES THAT QUALIFY INTEREST",
      "HOT-LEAD HANDOFF IN REAL TIME",
    ],
  },
  {
    index: "04",
    title: "Done-For-You Support",
    blurb: "We build it, run it, and improve it.",
    features: [
      "FULL SETUP & INTEGRATION",
      "CUSTOM SCRIPTS IN YOUR BRAND VOICE",
      "MONTHLY PERFORMANCE REPORTS",
      "ONGOING TUNING & OPTIMISATION",
    ],
  },
];

export const COMPARISON = {
  columns: ["Revvo", "Hire a Receptionist", "DIY Software"],
  rows: [
    { label: "Availability", values: [["ok", "24/7, 365 days"], ["warn", "Business hours only"], ["warn", "Depends on you"]] },
    { label: "Setup", values: [["ok", "Done for you"], ["x", "Hiring & training"], ["x", "You figure it out"]] },
    { label: "Speed to Launch", values: [["ok", "Days, not months"], ["warn", "Weeks to hire"], ["warn", "Learning curve"]] },
    { label: "Follow-Up", values: [["ok", "Every lead, every time"], ["warn", "When there's time"], ["x", "Often forgotten"]] },
    { label: "Cost", values: [["ok", "Flat monthly fee"], ["x", "Salary + overhead"], ["warn", "Hidden time cost"]] },
  ] as { label: string; values: ["ok" | "warn" | "x", string][] }[],
};

// Businesses that use Revvo, shown in the "Trusted by" section.
// Preview images are homepage screenshots stored in /public/clients.
export const CLIENTS = [
  {
    name: "Cyprus Air Heating & Air Conditioning",
    industry: "HVAC",
    location: "Alexandria, VA",
    url: "https://indoorcomfort.com/",
    image: "/clients/cyprus-air.jpg",
  },
  {
    name: "Parrish Services",
    industry: "HVAC, PLUMBING & ELECTRICAL",
    location: "Manassas, VA",
    url: "https://parrishservices.com/",
    image: "/clients/parrish-services.jpg",
  },
  {
    name: "Smileville Dental",
    industry: "FAMILY DENTISTRY",
    location: "Alexandria & Sterling, VA",
    url: "https://www.mysmileville.com/",
    image: "/clients/smileville-dental.jpg",
  },
];

// Real client quotes only. While this list is empty, the quote carousel is hidden.
// Example entry: { quote: "...", name: "Jane Smith", role: "OWNER, SMILEVILLE DENTAL", initials: "JS" }
export const TESTIMONIALS: { quote: string; name: string; role: string; initials: string }[] = [];

// Count-up numbers shown under the testimonials.
export const STATS = [
  { value: 24, suffix: "/7", label: "CALL COVERAGE" },
  { value: 3, suffix: "", label: "AUTOMATIONS" },
  { value: 7, suffix: " days", label: "AVERAGE TIME TO LAUNCH" }, // TODO: confirm
  { value: 100, suffix: "%", label: "DONE FOR YOU" },
];

// Prices in USD. monthly = per month; yearly = total per year when billed yearly.
export const PRICING = [
  {
    name: "Starter",
    icon: "star",
    description: "One automation to plug your biggest leak",
    monthly: 297,
    yearly: 3500,
    popular: false,
    cta: "Choose Starter",
    features: [
      "1 automation of your choice",
      "Full setup & integration",
      "Custom scripts in your brand voice",
      "Monthly performance report",
      "Email support",
    ],
  },
  {
    name: "Growth",
    icon: "phone",
    description: "Two automations working together",
    monthly: 597,
    yearly: 8000,
    popular: true,
    cta: "Choose Growth",
    features: [
      "Any 2 automations",
      "Calendar & CRM integration",
      "Call summaries to your phone",
      "Bi-weekly optimisation",
      "Priority support",
    ],
  },
  {
    name: "Full Revvo",
    icon: "bolt",
    description: "All three automations, fully managed",
    monthly: 897,
    yearly: 12000,
    popular: false,
    cta: "Choose Full Revvo",
    features: [
      "Review Agent + Receptionist + Reactivation",
      "Unlimited reactivation campaigns",
      "Dedicated account manager",
      "Weekly optimisation",
      "Same-day support",
    ],
  },
];

export const FAQ = [
  {
    q: "What exactly does Revvo do?",
    a: "Revvo is an AI automation agency for service businesses. We set up and run three systems: an AI Review Agent that texts customers for reviews after each job, an AI Receptionist that answers calls and books appointments, and a Dead Lead Reactivation system that turns old leads into new jobs.",
  },
  {
    q: "Will the AI receptionist sound robotic?",
    a: "No. We use natural, human-sounding voices and write the script around your business, services, and tone, so callers get helpful answers and a booked appointment.",
  },
  {
    q: "Do I need to change my current software?",
    a: "No. We connect to the tools you already use, like your calendar, CRM, job management software, and phone number.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are live within a week of the consultation, depending on how many automations you choose and the tools we're connecting.",
  },
  {
    q: "Is there a long-term contract?",
    a: "Plans are billed monthly and you can cancel anytime. Yearly billing is also available.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation below. We'll look at where you're losing calls, reviews, and leads, and recommend the right setup.",
  },
];
