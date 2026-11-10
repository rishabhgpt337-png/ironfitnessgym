import Reveal from "@/components/Reveal";
import { stats } from "@/data/gym";

function format(value: number, decimals: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function Stats() {
  return (
    <section aria-label="Gym at a glance" className="border-b border-border">
      <div className="container-edge">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.04}>
              <div
                className={`py-9 pr-4 sm:py-11 ${
                  index !== 0 ? "lg:border-l lg:border-border lg:pl-8" : ""
                } ${index % 2 === 1 ? "border-l border-border pl-6 sm:pl-8" : ""} ${
                  index > 1 ? "border-t border-border lg:border-t-0" : ""
                }`}
              >
                <dd className="font-display text-[2.6rem] leading-none tracking-[-0.01em] text-text sm:text-[3.4rem]">
                  {format(stat.value, stat.decimals)}
                  <span className="text-accent">{stat.suffix}</span>
                </dd>
                <dt className="mt-3 font-label text-[10px] font-medium uppercase tracking-[0.2em] text-text/80">
                  {stat.label}
                </dt>
                <p className="mt-1 text-[12px] text-muted">{stat.note}</p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
