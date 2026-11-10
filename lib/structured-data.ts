import { brand, contact, hours, rating, seo, social } from "@/data/gym";
import { WEEKDAYS, WEEKDAY_LABELS } from "@/lib/hours";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? brand.siteUrl;

export function buildGymJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${siteUrl}/#gym`,
    name: brand.name,
    description: seo.description,
    url: siteUrl,
    image: `${siteUrl}${seo.ogImage}`,
    logo: `${siteUrl}/icon.svg`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: "₹₹",
    sameAs: [social.instagram],
    hasMap: contact.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: brand.city,
      addressRegion: brand.region,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.coordinates.lat,
      longitude: contact.coordinates.lng,
    },
    openingHoursSpecification: WEEKDAYS.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: WEEKDAY_LABELS[day],
      opens: hours[day].open,
      closes: hours[day].close,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
