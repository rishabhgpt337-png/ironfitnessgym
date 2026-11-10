import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { copy, whyUs } from "@/data/gym";

export default function WhyUs() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-edge">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="index-label flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                {copy.whyUs.eyebrow}
              </p>
              <h2 className="display mt-5">
                <span className="block">{copy.whyUs.heading}</span>
                <span className="block text-accent">{copy.whyUs.accent}</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
                {copy.whyUs.intro}
              </p>
              <a href="#visit" className="link-line mt-8">
                See where we are
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {whyUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="grid grid-cols-[44px_1fr] gap-5 border-t border-border py-7 last:border-b sm:grid-cols-[64px_1fr] sm:gap-8">
                  <span className="font-label text-[10px] tracking-[0.18em] text-accent">{item.number}</span>
                  <div>
                    <h3 className="font-display text-[1.5rem] uppercase leading-none tracking-[-0.01em] text-text sm:text-[1.8rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
