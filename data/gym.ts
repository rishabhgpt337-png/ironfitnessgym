/**
 * IRON TEMPLE GYM — SINGLE SOURCE OF TRUTH
 * ------------------------------------------------------------
 * Every piece of editable copy, contact detail, price and image
 * path on the site lives in this file. Edit here, not in components.
 *
 * Anything marked TODO is a placeholder that the gym owner must
 * replace with verified information before going live.
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

export type BillingCycleId = "monthly" | "quarterly" | "half-yearly" | "yearly";

export const brand = {
  name: "Iron Temple Gym",
  shortName: "Iron Temple",
  wordmark: ["IRON", "TEMPLE"],
  city: "Mumbai",
  region: "Maharashtra",
  country: "India",
  tagline: "Forge your strongest self.",
  description:
    "A no-nonsense strength and conditioning gym in Mumbai. Serious equipment, focused coaching, and a room full of people who show up.",
  /** Used for absolute URLs (Open Graph, JSON-LD). Override with NEXT_PUBLIC_SITE_URL. */
  siteUrl: "https://irontemplegym.example",
} as const;

export const contact = {
  // TODO: Replace with the gym's verified street address.
  address: "TODO: Add full address, Mumbai",
  addressLines: ["TODO: Add full address", "Mumbai, Maharashtra, India"],
  // TODO: Replace with the gym's verified phone number.
  phone: "+91 00000 00000",
  // TODO: Replace with the gym's WhatsApp number in international format, digits only.
  whatsapp: "910000000000",
  // TODO: Replace with the gym's verified email address.
  email: "TODO@example.com",
  // TODO: Replace with the gym's verified Instagram profile.
  instagram: "https://instagram.com/TODO",
  instagramHandle: "@TODO",
  coordinates: { lat: 19.166862, lng: 72.960197 },
  mapsUrl:
    "https://www.google.com/maps/place/Iron+Temple+Gym/@19.1673514,72.9560699,17z/data=!4m6!3m5!1s0x3be7b9c1041d6327:0xbe5e1b6a0a2f9126!8m2!3d19.166862!4d72.960197",
  mapEmbedUrl:
    "https://www.google.com/maps?q=19.166862,72.960197&z=16&output=embed",
} as const;

/**
 * Hours in 24-hour format, Asia/Kolkata.
 * TODO: Confirm opening hours with the gym. Current values are placeholders.
 */
export const hours: Record<Weekday, DayHours> = {
  monday: { open: "05:30", close: "22:30" },
  tuesday: { open: "05:30", close: "22:30" },
  wednesday: { open: "05:30", close: "22:30" },
  thursday: { open: "05:30", close: "22:30" },
  friday: { open: "05:30", close: "22:30" },
  saturday: { open: "05:30", close: "22:30" },
  sunday: { open: "06:00", close: "12:00" },
};

export const hoursNote =
  "Holiday timings may differ. Call the front desk before you travel on public holidays.";

export const social = {
  instagram: contact.instagram,
  google: contact.mapsUrl,
} as const;

/**
 * TODO: Rating and review count are placeholders. Replace with the live
 * Google Business Profile numbers before launch.
 */
export const rating = {
  value: 4.8,
  reviewCount: 100,
  source: "Google",
} as const;

export const stats = [
  {
    label: "Google rating",
    value: rating.value,
    decimals: 1,
    suffix: "",
    note: `${rating.reviewCount} reviews · ${rating.source}`,
  },
  {
    label: "Reviews",
    value: rating.reviewCount,
    decimals: 0,
    suffix: "+",
    note: "Real members, real sessions",
  },
  {
    label: "Days a week",
    value: 7,
    decimals: 0,
    suffix: "",
    note: "Open every day",
  },
  {
    label: "Program tracks",
    value: 6,
    decimals: 0,
    suffix: "",
    note: "One clear goal: progress",
  },
] as const;

export const programs = [
  {
    id: "weight-training",
    number: "01",
    title: "Weight Training",
    description:
      "Barbells, dumbbells and machines with enough room to actually work. Build a base that carries into everything else.",
    tags: ["Strength", "Hypertrophy"],
    icon: "dumbbell",
  },
  {
    id: "cardio",
    number: "02",
    title: "Cardio",
    description:
      "Treadmills, cycles and rowers for conditioning that supports your lifting instead of competing with it.",
    tags: ["Endurance", "Heart health"],
    icon: "heart-pulse",
  },
  {
    id: "strength-conditioning",
    number: "03",
    title: "Strength & Conditioning",
    description:
      "Structured sessions built around the big lifts, loaded carries and athletic movement. Coached, not improvised.",
    tags: ["Performance", "Power"],
    icon: "zap",
  },
  {
    id: "personal-training",
    number: "04",
    title: "Personal Training",
    description:
      "One-to-one coaching with a plan written for your body, schedule and experience level. Every rep has a reason.",
    tags: ["1-on-1", "Coached"],
    icon: "user-check",
  },
  {
    id: "fat-loss",
    number: "05",
    title: "Fat Loss",
    description:
      "Sustainable training and practical nutrition habits. No crash diets, no gimmicks — just consistent work.",
    tags: ["Conditioning", "Habits"],
    icon: "flame",
  },
  {
    id: "muscle-gain",
    number: "06",
    title: "Muscle Gain",
    description:
      "Progressive overload, smart volume and recovery. A straightforward path to adding size and strength.",
    tags: ["Size", "Progression"],
    icon: "trending-up",
  },
] as const;

export const aboutFeatures = [
  {
    title: "Serious Equipment",
    description:
      "Racks, bars, plates and machines chosen for training, not for show. Maintained and ready to use.",
    icon: "dumbbell",
  },
  {
    title: "Expert Trainers",
    description:
      "Coaches who watch your form, adjust your plan and tell you the truth about your training.",
    icon: "user-check",
  },
  {
    title: "Clean & Spacious",
    description:
      "A floor you can move through, with room to set up, breathe and focus on the session.",
    icon: "sparkles",
  },
  {
    title: "Result Focused",
    description:
      "No guesswork. Track your lifts, measure your progress and keep moving the numbers forward.",
    icon: "target",
  },
] as const;

export const facilities = [
  {
    id: "strength-floor",
    title: "Strength Floor",
    description: "Power racks, platforms and free weights.",
    image: "/images/facility-1.webp",
    layout: "wide",
  },
  {
    id: "cardio-zone",
    title: "Cardio Zone",
    description: "Treadmills, cycles and rowers.",
    image: "/images/facility-2.webp",
    layout: "normal",
  },
  {
    id: "dumbbell-rack",
    title: "Dumbbell Rack",
    description: "A full run of fixed dumbbells.",
    image: "/images/facility-3.webp",
    layout: "normal",
  },
  {
    id: "functional-area",
    title: "Functional Area",
    description: "Ropes, sleds and open floor.",
    image: "/images/facility-4.webp",
    layout: "normal",
  },
  {
    id: "plate-storage",
    title: "Plate Storage",
    description: "Organised, loaded and ready.",
    image: "/images/facility-5.webp",
    layout: "normal",
  },
  {
    id: "training-floor",
    title: "Training Floor",
    description: "Space to set up and put in work.",
    image: "/images/facility-6.webp",
    layout: "wide",
  },
] as const;

export const trainers = [
  {
    // TODO: Replace with a real coach's name, speciality, bio and photo.
    name: "Trainer Name",
    speciality: "Strength & Conditioning",
    bio: "Coaching the fundamentals: squat, press, pull and the consistency to repeat them.",
    image: "/images/trainer-1.webp",
    instagram: "https://instagram.com/TODO",
  },
  {
    // TODO: Replace with a real coach's name, speciality, bio and photo.
    name: "Trainer Name",
    speciality: "Personal Training & Fat Loss",
    bio: "Practical programming for busy schedules, with habits that hold outside the gym.",
    image: "/images/trainer-2.webp",
    instagram: "https://instagram.com/TODO",
  },
  {
    // TODO: Replace with a real coach's name, speciality, bio and photo.
    name: "Trainer Name",
    speciality: "Muscle Gain & Nutrition",
    bio: "Building size with patient progression, honest feedback and simple nutrition.",
    image: "/images/trainer-3.webp",
    instagram: "https://instagram.com/TODO",
  },
] as const;

export const billingCycles = [
  { id: "monthly", label: "Monthly", shortLabel: "Monthly", note: "Billed every month" },
  { id: "quarterly", label: "Quarterly", shortLabel: "3 Months", note: "Billed every 3 months" },
  { id: "half-yearly", label: "Half-Yearly", shortLabel: "6 Months", note: "Billed every 6 months" },
  { id: "yearly", label: "Yearly", shortLabel: "12 Months", note: "Billed once a year" },
] as const;

/**
 * TODO: All plan pricing is intentionally left as "Contact for pricing".
 * Add verified amounts (in INR) under `prices` and they will appear automatically.
 */
export const plans = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Train on your own terms",
    description:
      "Full access to the floor for members who already know their way around a barbell.",
    popular: false,
    features: [
      "Full gym floor access",
      "Strength & cardio equipment",
      "Locker room access",
      "Introductory floor walkthrough",
      "Open 7 days a week",
    ],
    prices: {
      monthly: null,
      quarterly: null,
      "half-yearly": null,
      yearly: null,
    } as Record<BillingCycleId, number | null>,
  },
  {
    id: "performance",
    name: "Performance",
    tagline: "Structure beats guesswork",
    description:
      "Everything in Essential, plus a written training plan and regular check-ins with a coach.",
    popular: true,
    features: [
      "Everything in Essential",
      "Written training programme",
      "Monthly progress check-in",
      "Body composition tracking",
      "Priority class booking",
      "Nutrition guidance",
    ],
    prices: {
      monthly: null,
      quarterly: null,
      "half-yearly": null,
      yearly: null,
    } as Record<BillingCycleId, number | null>,
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "Coaching in your corner",
    description:
      "One-to-one personal training and close support for members chasing a specific goal.",
    popular: false,
    features: [
      "Everything in Performance",
      "1-on-1 personal training sessions",
      "Custom programme every 4 weeks",
      "Form coaching on the big lifts",
      "WhatsApp check-ins with your coach",
      "Flexible session scheduling",
    ],
    prices: {
      monthly: null,
      quarterly: null,
      "half-yearly": null,
      yearly: null,
    } as Record<BillingCycleId, number | null>,
  },
] as const;

export const pricePlaceholder = "Contact for pricing";

export const testimonials = [
  {
    // TODO: Replace with a real Google review (with permission).
    name: "Rohan M.",
    meta: "Member · Weight Training",
    rating: 5,
    quote:
      "Exactly what I wanted from a gym — good racks, enough plates, and nobody bothering you while you train. The floor is clean and the crowd is serious.",
    initials: "RM",
  },
  {
    // TODO: Replace with a real Google review (with permission).
    name: "Priya S.",
    meta: "Member · Personal Training",
    rating: 5,
    quote:
      "My coach actually corrected my form instead of just counting reps. Three months in, I am lifting more than I ever have and my knees feel better than before.",
    initials: "PS",
  },
  {
    // TODO: Replace with a real Google review (with permission).
    name: "Aman K.",
    meta: "Member · Fat Loss",
    rating: 5,
    quote:
      "No pressure, no fake promises. Just a plan I could follow around a full-time job. The morning slot is calm and the equipment is always in working order.",
    initials: "AK",
  },
  {
    // TODO: Replace with a real Google review (with permission).
    name: "Farhan Q.",
    meta: "Member · Strength & Conditioning",
    rating: 5,
    quote:
      "The atmosphere is the best part. People show up, put their heads down and train. It is the kind of room that makes you add another plate.",
    initials: "FQ",
  },
] as const;

export const faqs = [
  {
    question: "Do I need experience to join?",
    answer:
      "No. We welcome complete beginners. Every new member gets a floor walkthrough, and if you want more hands-on guidance, our personal training plans start from the basics.",
  },
  {
    question: "Can I book a trial session?",
    answer:
      "Yes. Use the enquiry form or message us on WhatsApp and we will set up a free trial session so you can see the space, meet a coach and try the equipment before committing.",
  },
  {
    question: "What should I bring for my first session?",
    answer:
      "Comfortable training clothes, a water bottle, a small towel and indoor training shoes. We will take care of the rest. Lockers are available on site.",
  },
  {
    question: "Do you offer personal training?",
    answer:
      "Yes. Personal training is available as part of the Elite plan and can also be added to other plans. Sessions are booked directly with your coach.",
  },
  {
    question: "Is there parking nearby?",
    answer:
      "Street parking is available around the gym. If you are visiting at peak hours, message us on WhatsApp and we will point you to the easiest option.",
  },
  {
    question: "How do I freeze or cancel my membership?",
    answer:
      "Talk to the front desk or message us on WhatsApp. We will explain the options available on your current plan. There are no hidden lock-in surprises.",
  },
] as const;

export const gallery = [
  { src: "/images/gallery-1.webp", alt: "Loaded barbell on the strength floor", caption: "The strength floor", span: "wide" },
  { src: "/images/gallery-2.webp", alt: "Kettlebell under a spotlight", caption: "Tools of the trade", span: "tall" },
  { src: "/images/gallery-3.webp", alt: "Dumbbell rack in the gym", caption: "Dumbbell rack", span: "normal" },
  { src: "/images/gallery-4.webp", alt: "Stacked weight plates", caption: "Loaded and ready", span: "normal" },
  { src: "/images/gallery-5.webp", alt: "Battle ropes on the training floor", caption: "Conditioning corner", span: "wide" },
  { src: "/images/gallery-6.webp", alt: "Squat rack and steel beams", caption: "Under the bar", span: "normal" },
  { src: "/images/gallery-7.webp", alt: "Cardio machines in low light", caption: "Cardio zone", span: "normal" },
  { src: "/images/gallery-8.webp", alt: "Chalk and light on the gym floor", caption: "Chalk up", span: "tall" },
] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Facilities", href: "#facilities" },
  { label: "Timings", href: "#timings" },
  { label: "Plans", href: "#plans" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export const inquiryGoals = [
  "Fat Loss",
  "Muscle Gain",
  "General Fitness",
  "Personal Training",
  "Other",
] as const;

export const inquiryTimings = ["Morning", "Afternoon", "Evening"] as const;

/** All marketing copy lives here so components stay content-free. */
export const copy = {
  hero: {
    eyebrow: "Mumbai · Strength & Conditioning",
    headlineTop: "Forge your",
    headlineAccent: "strongest",
    headlineBottom: "self.",
    subtext:
      "Serious equipment, honest coaching and a floor built for people who show up. Your first session is on us.",
    primaryCta: "Book a Free Trial",
    secondaryCta: "View Timings",
    openLabel: "Open now",
    closedLabel: "Closed",
    checkingLabel: "Checking hours",
    ratingSuffix: "Google reviews",
    ticker: [
      "Strength",
      "Conditioning",
      "Fat Loss",
      "Muscle Gain",
      "Personal Training",
      "Cardio",
    ],
    scrollLabel: "Scroll to explore",
    imageAlt:
      "Dark industrial gym floor with a loaded barbell and dramatic orange light",
  },
  sections: {
    about: {
      eyebrow: "The temple",
      heading: "Built for",
      accent: "the work",
      intro: "No mirrors-and-music theatre. Just a room that takes training seriously.",
    },
    programs: {
      eyebrow: "What we train",
      heading: "Pick your",
      accent: "battle",
      intro:
        "Six ways to train, one standard: show up, do the work, keep the numbers moving.",
      footerNote: "Not sure where to start? That is what the trial is for.",
      footerCta: "Talk to a coach",
      aside: ["Every programme", "starts with a", "conversation."],
    },
    facilities: {
      eyebrow: "Inside the floor",
      heading: "Tools of the",
      accent: "trade",
      intro:
        "Everything you need to train hard, laid out with room to move. Replaced, maintained and ready.",
    },
    trainers: {
      eyebrow: "Your corner",
      heading: "Meet the",
      accent: "coaches",
      intro:
        "Coaches who correct, push and keep the plan honest. Less cheerleading, more progress.",
    },
    timings: {
      eyebrow: "Plan your session",
      heading: "Opening",
      accent: "hours",
      intro:
        "Early starts, late finishes. Seven days a week, with a quiet window for everyone.",
    },
    plans: {
      eyebrow: "Membership",
      heading: "Commit to the",
      accent: "process",
      intro:
        "Three straightforward plans. Pick the level of coaching you need and we will handle the rest.",
    },
    gallery: {
      eyebrow: "The floor",
      heading: "Inside Iron",
      accent: "Temple",
      intro:
        "Steel, chalk and the quiet before a heavy set. A look around the space.",
    },
    testimonials: {
      eyebrow: "Member words",
      heading: "Earned, not",
      accent: "given",
      intro: "What members say after the sweat, the plateaus and the personal bests.",
    },
    inquiry: {
      eyebrow: "Free trial",
      heading: "Start where",
      accent: "you are",
      intro:
        "Tell us what you are working toward. We will call you back with a trial slot, a look around the floor and an honest recommendation — no pressure.",
      bulletPoints: [
        "Free trial session, no card required",
        "A walkthrough of the floor and equipment",
        "A plan matched to your goal and schedule",
      ],
      responseNote: "We usually reply within one working day.",
      imageCaption: "Your first rep is the hardest. Take it.",
    },
    faq: {
      eyebrow: "Questions",
      heading: "Good to",
      accent: "know",
      intro: "The things people ask before their first session.",
    },
    contact: {
      eyebrow: "Find us",
      heading: "Come",
      accent: "through",
      intro:
        "Drop in for a trial, call the front desk or message us on WhatsApp. We are easy to find and hard to forget.",
      mapLabel: "Iron Temple Gym · Mumbai",
      directionsCta: "Get Directions",
    },
  },
  about: {
    story: [
      "Iron Temple Gym was built around a simple idea: a gym should be judged by the training that happens inside it. Not the lighting, not the lobby — the bars, the plates and the people who keep coming back.",
      "The floor is set up for real work. Racks you can load, dumbbells that go heavy enough, and coaches who would rather fix your setup than sell you another supplement. Whether you are chasing your first pull-up or your next personal best, there is a lane for you here.",
    ],
    quote: "Show up. Do the work. Let the numbers tell the story.",
    imageAlt: "Weight plates and a barbell in a dimly lit gym",
    imageCaption: "The floor, before the rush.",
    featuresLabel: "What you get",
    ctaLabel: "Book your first session",
  },
  plans: {
    popularLabel: "Most popular",
    priceNote: "Final pricing is confirmed at the front desk. All plans are subject to availability.",
    enquireCta: "Enquire",
    enquiryNote: "Not sure which plan fits? Book a trial and decide after you train.",
    cycleLabel: "Billing cycle",
  },
  gallery: {
    openLabel: "View image",
    closeLabel: "Close gallery",
    previousLabel: "Previous image",
    nextLabel: "Next image",
  },
  testimonials: {
    googleCta: "Read more reviews on Google",
    pauseLabel: "Pause testimonials",
    playLabel: "Play testimonials",
  },
  inquiry: {
    formTitle: "Book your free trial",
    formNote: "Takes under a minute. No spam, ever.",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    phoneHint: "10-digit Indian mobile number",
    emailLabel: "Email",
    emailOptional: "Optional",
    goalLabel: "Your goal",
    timingLabel: "Preferred timing",
    planLabel: "Plan interest",
    messageLabel: "Anything we should know?",
    messageOptional: "Optional",
    selectPlaceholder: "Select one",
    planPlaceholder: "Not sure yet",
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
  common: {
    joinNow: "Join Now",
    bookTrial: "Book a Free Trial",
    callNow: "Call now",
    email: "Email",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    today: "Today",
    openNow: "Open now",
    closed: "Closed",
    call: "Call",
    enquire: "Enquire",
  },
  footer: {
    blurb:
      "A strength-first gym in Mumbai. Serious equipment, straight answers and a room that rewards consistency.",
    quickLinksLabel: "Explore",
    contactLabel: "Find us",
    hoursLabel: "Hours",
    socialLabel: "Follow",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  floating: {
    whatsappLabel: "Chat with Iron Temple on WhatsApp",
    callLabel: "Call",
    enquireLabel: "Enquire",
  },
} as const;

export const seo = {
  title:
    "Iron Temple Gym, Mumbai | Strength, Fat Loss & Personal Training",
  description:
    "Iron Temple Gym is a strength-focused gym in Mumbai with serious equipment, expert coaches and personal training for fat loss, muscle gain and general fitness. Book a free trial.",
  keywords: [
    "gym in Mumbai",
    "Iron Temple Gym",
    "strength training Mumbai",
    "personal training Mumbai",
    "fat loss gym Mumbai",
    "weight training gym",
  ],
  ogImage: "/images/og.webp",
} as const;

export type Plan = (typeof plans)[number];
export type BillingCycle = (typeof billingCycles)[number];
export type Testimonial = (typeof testimonials)[number];
export type GalleryItem = (typeof gallery)[number];
