/**
 * IRON TEMPLE GYM — SINGLE SOURCE OF TRUTH
 * ------------------------------------------------------------
 * All copy, contact details and image paths live here.
 * Business facts below are taken from the gym's public Google
 * Business Profile (4.9 ★, 177 reviews) and its public Instagram.
 */

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DayHours = {
  /** 24-hour "HH:mm" in Asia/Kolkata. */
  open: string;
  /** 24-hour "HH:mm" in Asia/Kolkata. */
  close: string;
  closed?: boolean;
};

export const brand = {
  name: "Iron Temple Gym",
  shortName: "Iron Temple",
  wordmark: ["IRON", "TEMPLE"],
  city: "Mumbai",
  locality: "Mulund East",
  region: "Maharashtra",
  country: "India",
  tagline: "Where discipline meets excellence.",
  description:
    "A strength-first gym in Mulund East, Mumbai. Loaded racks, plate-loaded machines and coaches who care about your form — open seven days a week.",
  /** Override with NEXT_PUBLIC_SITE_URL in production. */
  siteUrl: "https://irontemplegym.example",
} as const;

export const contact = {
  address:
    "Podium 3, HS Pearl, V.B. Phadake Road, Sane Guruji Nagar, Mulund East, Mumbai, Maharashtra 400081",
  addressLines: [
    "Podium 3, HS Pearl",
    "V.B. Phadake Road, Sane Guruji Nagar",
    "Mulund East, Mumbai 400081",
  ],
  phone: "+91 91676 82222",
  whatsapp: "919167682222",
  instagram: "https://www.instagram.com/irontemple_mulund/",
  instagramHandle: "@irontemple_mulund",
  coordinates: { lat: 19.166862, lng: 72.960197 },
  mapsUrl:
    "https://www.google.com/maps/place/Iron+Temple+Gym/@19.1673514,72.9560699,17z/data=!4m6!3m5!1s0x3be7b9c1041d6327:0xbe5e1b6a0a2f9126!8m2!3d19.166862!4d72.960197",
  mapEmbedUrl: "https://www.google.com/maps?q=19.166862,72.960197&z=16&output=embed",
} as const;

/** Opening hours, Asia/Kolkata. Verified against the Google listing. */
export const hours: Record<Weekday, DayHours> = {
  monday: { open: "05:00", close: "23:00" },
  tuesday: { open: "05:00", close: "23:00" },
  wednesday: { open: "05:00", close: "23:00" },
  thursday: { open: "05:00", close: "23:00" },
  friday: { open: "05:00", close: "23:00" },
  saturday: { open: "05:00", close: "22:00" },
  sunday: { open: "07:00", close: "15:00" },
};

export const hoursNote =
  "Hours can change on public holidays. Call the front desk before you travel.";

export const social = {
  instagram: contact.instagram,
  google: contact.mapsUrl,
} as const;

/** From the Google Business Profile. */
export const rating = {
  value: 4.9,
  reviewCount: 177,
  source: "Google",
} as const;

export const stats = [
  {
    label: "Google rating",
    value: rating.value,
    decimals: 1,
    suffix: "",
    note: `${rating.reviewCount} reviews`,
  },
  { label: "Days open", value: 7, decimals: 0, suffix: "", note: "Monday to Sunday" },
  { label: "Weekday hours", value: 18, decimals: 0, suffix: "", note: "5 AM to 11 PM" },
  { label: "Training tracks", value: 6, decimals: 0, suffix: "", note: "One standard" },
] as const;

export const programs = [
  {
    id: "weight-training",
    number: "01",
    title: "Weight Training",
    description:
      "Racks, benches, barbells and a full run of dumbbells. Build a base that carries into everything else.",
    tags: ["Strength", "Hypertrophy"],
  },
  {
    id: "strength-conditioning",
    number: "02",
    title: "Strength & Conditioning",
    description:
      "Structured work around the big lifts, loaded carries and athletic movement. Coached, not improvised.",
    tags: ["Performance", "Power"],
  },
  {
    id: "personal-training",
    number: "03",
    title: "Personal Training",
    description:
      "One-to-one coaching with a plan written for your body, your schedule and your experience level.",
    tags: ["1-on-1", "Coached"],
  },
  {
    id: "fat-loss",
    number: "04",
    title: "Fat Loss",
    description:
      "Sustainable training and practical nutrition habits. No crash diets, no gimmicks — consistent work.",
    tags: ["Conditioning", "Habits"],
  },
  {
    id: "muscle-gain",
    number: "05",
    title: "Muscle Gain",
    description:
      "Progressive overload, sensible volume and recovery. A straightforward path to more size and strength.",
    tags: ["Size", "Progression"],
  },
  {
    id: "cardio",
    number: "06",
    title: "Cardio",
    description:
      "Treadmills, cycles and cross trainers by the window — conditioning that supports your lifting.",
    tags: ["Endurance", "Heart health"],
  },
] as const;

export const whyUs = [
  {
    number: "01",
    title: "Equipment that works",
    description:
      "Dumbbells up to the heavy end, plate-loaded machines, cables, benches and cardio machines — all maintained and ready to use.",
  },
  {
    number: "02",
    title: "Coaches on the floor",
    description:
      "Trainers who watch your setup, correct your form and tell you the truth about your training instead of selling you another plan.",
  },
  {
    number: "03",
    title: "Room to train",
    description:
      "A wide, mirrored floor with space to set up, breathe and focus. You are not queuing for a bench at Iron Temple.",
  },
  {
    number: "04",
    title: "Progress you can see",
    description:
      "Track your lifts, measure what changes and keep the numbers moving. Motivation follows results.",
  },
] as const;

export const facilities = [
  { id: "free-weights", title: "Free weights", description: "Barbells, plates and a full dumbbell run." },
  { id: "machines", title: "Plate-loaded machines", description: "Press, row, squat and leg stations." },
  { id: "cables", title: "Cable stations", description: "Pulley work for every angle." },
  { id: "benches", title: "Benches & racks", description: "Flat, incline and adjustable setups." },
  { id: "cardio", title: "Cardio floor", description: "Treadmills and cross trainers by the window." },
  { id: "floor", title: "Open training floor", description: "Mirrored, lit and laid out to move through." },
] as const;

export const facilityImages = [
  {
    src: "/images/facility-strength.webp",
    alt: "Plate-loaded leg press and benches on the Iron Temple Gym floor",
    label: "The strength floor",
  },
  {
    src: "/images/facility-cardio.webp",
    alt: "Treadmills along the window at Iron Temple Gym",
    label: "Cardio, by the window",
  },
  {
    src: "/images/facility-wall.webp",
    alt: "The Iron Temple flame mural beside plate-loaded machines",
    label: "Where the work happens",
  },
] as const;

/** Reviews quoted from the gym's public Google Business Profile. */
export const testimonials = [
  {
    name: "Sayali Ketkar",
    meta: "Google review · 5 stars",
    rating: 5,
    quote:
      "A well-equipped gym in Mulund East. Clean and motivating, and the trainers are knowledgeable and supportive. A special mention to Piyush Sir who is very knowledgeable, encouraging, and always willing to help with proper guidance and form.",
    initials: "SK",
  },
  {
    name: "Suyash Deshmukh",
    meta: "Google review · 5 stars",
    rating: 5,
    quote:
      "Almost a year at Iron Temple and this place has become a huge part of my routine and growth. I mostly train alone, but the atmosphere here keeps you motivated every single day.",
    initials: "SD",
  },
  {
    name: "Riya Dhamapurkar",
    meta: "Google review · 5 stars",
    rating: 5,
    quote:
      "I've had a wonderful experience at this Iron Temple gym — the atmosphere is always positive and motivating. The equipments and facilities are well-maintained, making workouts enjoyable and effective.",
    initials: "RD",
  },
  {
    name: "Chitra Raikar",
    meta: "Google review · 5 stars",
    rating: 5,
    quote:
      "I am happy to share my experience at Iron Temple Gym in Mulund East. What I really like about this gym is the overall atmosphere.",
    initials: "CR",
  },
] as const;

export const faqs = [
  {
    question: "Do I need experience to join?",
    answer:
      "No. Beginners are welcome. A coach walks you through the floor, shows you how the machines work and helps you start with weights you can actually handle.",
  },
  {
    question: "Can I book a trial session?",
    answer:
      "Yes. Send the enquiry form or message us on WhatsApp and we will set up a trial session so you can see the floor, meet a coach and train before you commit.",
  },
  {
    question: "What should I bring for my first session?",
    answer:
      "Training clothes, a water bottle, a small towel and indoor training shoes. Bring a lock if you want to use a locker.",
  },
  {
    question: "Do you offer personal training?",
    answer:
      "Yes. One-to-one personal training is available with our floor coaches, either as a standalone arrangement or alongside your membership. Ask at the front desk for current options.",
  },
  {
    question: "What are your timings?",
    answer:
      "Monday to Friday 5 AM to 11 PM, Saturday 5 AM to 10 PM, and Sunday 7 AM to 3 PM. Holiday hours can differ, so call ahead on public holidays.",
  },
] as const;

export const gallery = [
  {
    src: "/images/gallery-1.webp",
    alt: "Dumbbell racks and benches on the Iron Temple Gym floor",
    caption: "The dumbbell floor",
    span: "wide",
  },
  {
    src: "/images/gallery-2.webp",
    alt: "Hanuman statue above a plate-loaded leg press at Iron Temple Gym",
    caption: "Strength floor",
    span: "tall",
  },
  {
    src: "/images/gallery-3.webp",
    alt: "Treadmills along the window wall at Iron Temple Gym",
    caption: "Cardio, by the window",
    span: "tall",
  },
  {
    src: "/images/gallery-4.webp",
    alt: "Iron Temple flame mural beside plate-loaded equipment",
    caption: "The wall",
    span: "normal",
  },
  {
    src: "/images/gallery-5.webp",
    alt: "Mirrored training floor and machines in low light",
    caption: "Low light, heavy sets",
    span: "normal",
  },
  {
    src: "/images/gallery-6.webp",
    alt: "Iron Temple Gym signage on the HS Pearl building, Mulund East",
    caption: "HS Pearl, Mulund East",
    span: "normal",
  },
  {
    src: "/images/gallery-7.webp",
    alt: "Iron Temple Gym exterior signage seen through the trees",
    caption: "Find us on V.B. Phadake Road",
    span: "wide",
  },
] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Facilities", href: "#facilities" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
] as const;

export const inquiryGoals = [
  "Fat loss",
  "Muscle gain",
  "General fitness",
  "Personal training",
  "Something else",
] as const;

export const inquiryTimings = ["Early morning", "Morning", "Afternoon", "Evening"] as const;

export const copy = {
  hero: {
    eyebrow: "Mulund East · Mumbai · Open seven days",
    headline: ["Strength", "is a", "practice."],
    subtext:
      "A strength-first gym in Mulund East. Loaded racks, plate-loaded machines and coaches who correct your form — not just count your reps.",
    primaryCta: "Book a free trial",
    secondaryCta: "See the floor",
    openLabel: "Open now",
    closedLabel: "Closed",
    checkingLabel: "Checking hours",
    ratingSuffix: "Google reviews",
    scrollLabel: "Scroll",
    imageAlt: "Athlete setting up for a heavy deadlift in a dark gym",
    ticker: [
      "Strength training",
      "Conditioning",
      "Fat loss",
      "Muscle gain",
      "Personal coaching",
      "Cardio",
      "Open seven days",
    ],
  },
  sections: {
    about: {
      index: "01",
      eyebrow: "The gym",
      heading: "A room",
      accent: "built for the work.",
      intro:
        "No lobby theatre, no mirror-and-music gimmicks. Just a floor that takes training seriously.",
    },
    programs: {
      index: "02",
      eyebrow: "What we train",
      heading: "Pick your",
      accent: "lane.",
      intro:
        "Six ways to train, one standard: show up, do the work, keep the numbers moving.",
    },
    facilities: {
      index: "03",
      eyebrow: "Inside the floor",
      heading: "Everything",
      accent: "you need.",
      intro:
        "Free weights, machines and cardio, laid out with room to move. Replaced, maintained and ready.",
    },
    gallery: {
      index: "04",
      eyebrow: "The floor",
      heading: "Inside",
      accent: "Iron Temple.",
      intro:
        "Steel, chalk and the quiet before a heavy set. Photographs from the gym in Mulund East.",
    },
    reviews: {
      index: "04",
      eyebrow: "Member words",
      heading: "Earned,",
      accent: "not given.",
      intro: "What members say after the sweat, the plateaus and the personal bests.",
    },
    enquiry: {
      index: "05",
      eyebrow: "Free trial",
      heading: "Start where",
      accent: "you are.",
      intro:
        "Tell us what you are working toward. We will call you back with a trial slot, a walk around the floor and an honest recommendation — no pressure.",
      bulletPoints: [
        "A trial session, no card required",
        "A walkthrough of the floor and equipment",
        "A plan matched to your goal and schedule",
      ],
      responseNote: "We usually reply within one working day.",
    },
    faq: {
      index: "06",
      eyebrow: "Questions",
      heading: "Good to",
      accent: "know.",
      intro: "The things people ask before their first session.",
    },
    visit: {
      index: "07",
      eyebrow: "Find us",
      heading: "Find the",
      accent: "floor.",
      intro:
        "Podium 3 at HS Pearl, on V.B. Phadake Road in Mulund East. Drop in for a trial or call the front desk.",
      directionsCta: "Get directions",
    },
  },
  about: {
    story: [
      "Iron Temple Gym sits on the podium level at HS Pearl in Mulund East. It was built around a simple idea: a gym should be judged by the training that happens inside it — the bars, the plates and the people who keep coming back.",
      "The floor is set up for real work. A full run of dumbbells, plate-loaded machines, cables, benches and cardio by the window, with coaches who would rather fix your setup than sell you a supplement. Whether you are chasing your first pull-up or your next personal best, there is a lane for you here.",
    ],
    quote: "Show up. Do the work. Let the numbers tell the story.",
    imageAlt: "Members training on the dumbbell floor at Iron Temple Gym",
    imageCaption: "The dumbbell floor, Mulund East.",
    ctaLabel: "Book your first session",
  },
  whyUs: {
    eyebrow: "Why Iron Temple",
    heading: "Not a",
    accent: "fitness trend.",
    intro:
      "A gym can look good on camera and still be useless on a Tuesday night. We built ours around the things that actually move your training forward.",
  },
  facilities: {
    listLabel: "On the floor",
    imageNote: "Photographed at Iron Temple Gym, Mulund East",
  },
  enquiry: {
    formTitle: "Book your free trial",
    formNote: "Takes under a minute.",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    phoneHint: "10-digit Indian mobile number",
    emailLabel: "Email",
    emailOptional: "Optional",
    goalLabel: "Your goal",
    timingLabel: "Preferred timing",
    messageLabel: "Anything we should know?",
    messageOptional: "Optional",
    selectPlaceholder: "Select one",
    submitLabel: "Send enquiry",
    submittingLabel: "Sending",
    whatsappLabel: "Send via WhatsApp",
    successTitle: "Request received.",
    successBody:
      "Thanks — your enquiry is with the team. We will call you back on the number you shared, usually within one working day.",
    successAgain: "Send another enquiry",
    successWhatsapp: "Chat on WhatsApp now",
    callLabel: "Prefer to talk?",
    errorBanner:
      "We could not send your enquiry right now. Please try again, or message us on WhatsApp.",
    rateLimitError:
      "That was quick. Please wait a few seconds before sending another enquiry.",
    privacyNote:
      "By sending this form you agree to be contacted about your enquiry. We do not share your details.",
  },
  gallery: {
    openLabel: "View image",
    closeLabel: "Close gallery",
    previousLabel: "Previous image",
    nextLabel: "Next image",
  },
  testimonials: {
    googleCta: "Read all 177 reviews on Google",
  },
  common: {
    callNow: "Call now",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    today: "Today",
    openNow: "Open now",
    closed: "Closed",
  },
  footer: {
    blurb:
      "A strength-first gym in Mulund East, Mumbai. Serious equipment, straight answers and a room that rewards consistency.",
    quickLinksLabel: "Explore",
    contactLabel: "Find us",
    hoursLabel: "Hours",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    photoCredit:
      "Gym photography from Iron Temple Gym's public Google Business listing. Hero photograph via Unsplash.",
  },
  floating: {
    whatsappLabel: "Chat with Iron Temple Gym on WhatsApp",
    callLabel: "Call",
    enquireLabel: "Free trial",
  },
  finalCta: {
    eyebrow: "Your first session",
    lines: ["Start", "strong", "here."],
    body: "Walk in, meet a coach and train. No pressure, no contracts to sign on the spot.",
    primary: "Book a free trial",
    secondary: "Call the front desk",
  },
} as const;

export const seo = {
  title: "Iron Temple Gym, Mulund East | Strength Training & Personal Coaching",
  description:
    "Iron Temple Gym is a strength-first gym in Mulund East, Mumbai — free weights, plate-loaded machines, cardio and hands-on coaching. Rated 4.9 on Google. Book a free trial.",
  keywords: [
    "gym in Mulund East",
    "Iron Temple Gym",
    "strength training Mumbai",
    "personal training Mulund",
    "gym near HS Pearl",
    "weight training gym Mumbai",
  ],
  ogImage: "/images/og.webp",
} as const;

export type Testimonial = (typeof testimonials)[number];
export type GalleryItem = (typeof gallery)[number];
