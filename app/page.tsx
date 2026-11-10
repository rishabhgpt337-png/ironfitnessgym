import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import Programs from "@/components/Programs";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";
import { buildGymJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  const jsonLd = buildGymJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <WhyUs />
      <Programs />
      <Facilities />
      <Gallery />
      <Testimonials />
      <InquiryForm />
      <FAQ />
      <Contact />
      <FinalCta />
    </>
  );
}
