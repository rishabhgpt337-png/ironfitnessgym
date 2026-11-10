import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Facilities from "@/components/Facilities";
import Trainers from "@/components/Trainers";
import Timings from "@/components/Timings";
import Plans from "@/components/Plans";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
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
      <Stats />
      <About />
      <Programs />
      <Facilities />
      <Trainers />
      <Timings />
      <Plans />
      <Gallery />
      <Testimonials />
      <InquiryForm />
      <FAQ />
      <Contact />
    </>
  );
}
