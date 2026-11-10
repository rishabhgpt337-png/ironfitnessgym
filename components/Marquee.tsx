import { copy } from "@/data/gym";

export default function Marquee() {
  const items = copy.hero.ticker;
  const row = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-b border-border bg-bg">
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center" aria-hidden={group === 1}>
            {row.map((item, index) => (
              <span
                key={`${group}-${item}-${index}`}
                className="flex items-center gap-7 whitespace-nowrap px-7 py-3.5 font-label text-[10px] uppercase tracking-[0.26em] text-muted"
              >
                {item}
                <span className="h-1 w-1 bg-accent" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
