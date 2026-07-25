import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import styleKnotless from "@/assets/style-knotless.jpg";
import styleFulani from "@/assets/style-fulani.jpg";
import styleBoho from "@/assets/style-boho.jpg";
import styleStitch from "@/assets/style-stitch.jpg";
import styleCornrows from "@/assets/style-cornrows.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import { SplitWords } from "@/components/system/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Braids Doc" },
      {
        name: "description",
        content:
          "Signature braids gallery: knotless, Fulani, boho box, stitch, cornrows — every crown, remembered.",
      },
      { property: "og:title", content: "Gallery — Braids Doc" },
      {
        property: "og:description",
        content: "Signature braid work gallery — knotless, Fulani, boho, stitch, cornrows.",
      },
    ],
  }),
  component: GalleryPage,
});

type Item = {
  id: string;
  cat: "Knotless" | "Fulani" | "Boho" | "Stitch" | "Cornrows";
  img: string;
  title: string;
  price: string;
  duration: string;
  h: number;
};

const ITEMS: Item[] = [
  { id: "kn1", cat: "Knotless", img: styleKnotless, title: "Knotless — Large", price: "$220", duration: "6h", h: 460 },
  { id: "fu1", cat: "Fulani", img: styleFulani, title: "Fulani — Beaded", price: "$260", duration: "7h", h: 620 },
  { id: "bo1", cat: "Boho", img: styleBoho, title: "Boho Box — Honey", price: "$310", duration: "8h", h: 540 },
  { id: "st1", cat: "Stitch", img: styleStitch, title: "Stitch — Geo", price: "$240", duration: "5h", h: 500 },
  { id: "co1", cat: "Cornrows", img: styleCornrows, title: "Cornrows — Sculpt", price: "$180", duration: "3h", h: 580 },
  { id: "kn2", cat: "Knotless", img: p1, title: "Crown Work", price: "$280", duration: "7h", h: 520 },
  { id: "kn3", cat: "Knotless", img: p2, title: "Long Knotless", price: "$340", duration: "8h", h: 700 },
  { id: "de1", cat: "Boho", img: p3, title: "Strand Detail", price: "$300", duration: "8h", h: 420 },
  { id: "pr1", cat: "Stitch", img: p4, title: "The Process", price: "$240", duration: "5h", h: 480 },
  { id: "cr1", cat: "Fulani", img: p5, title: "Queen", price: "$380", duration: "9h", h: 620 },
  { id: "kn4", cat: "Knotless", img: styleKnotless, title: "Knotless — Classic", price: "$200", duration: "5h", h: 460 },
  { id: "bo2", cat: "Boho", img: styleBoho, title: "Boho Box — Goddess", price: "$320", duration: "8h", h: 540 },
];

const FILTERS = ["All", "Knotless", "Fulani", "Boho", "Stitch", "Cornrows"] as const;

function GalleryPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Item | null>(null);
  const [count, setCount] = useState(0);

  const items = useMemo(
    () => (active === "All" ? ITEMS : ITEMS.filter((i) => i.cat === active)),
    [active]
  );

  useEffect(() => {
    let n = 0;
    const target = items.length;
    const id = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= target) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <main className="relative min-h-screen bg-ink pt-32">
      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Gallery</p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl">
              <SplitWords text="Every crown, remembered." />
            </h1>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">
            <span className="text-gold">{String(count).padStart(2, "0")}</span> looks
          </div>
        </div>

        {/* filter chips */}
        <div className="mb-12 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                data-cursor="view"
                onClick={() => setActive(f)}
                className="relative rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.25em]"
              >
                {isActive && (
                  <motion.span
                    layoutId="chip-active"
                    className="absolute inset-0 rounded-full border border-gold bg-gold/15"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span
                  className={`relative ${isActive ? "text-gold" : "text-ivory/60"}`}
                >
                  {f}
                </span>
              </button>
            );
          })}
        </div>

        {/* Perfect Grid Gallery */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <motion.button
                key={it.id}
                layout
                layoutId={`tile-${it.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelected(it)}
                data-cursor="view"
                className="group block w-full text-left"
              >
                {/* Awwwards Metallic Golden Border Card Wrapper */}
                <div className="relative p-2.5 rounded-sm bg-gradient-to-br from-gold/45 via-gold-light/20 to-gold-deep/60 transition-all duration-500 hover:from-gold hover:via-gold-light hover:to-gold shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(201,162,76,0.45)]">
                  {/* Luxury Gold Corner Brackets */}
                  <div className="pointer-events-none absolute -top-1 -left-1 h-3.5 w-3.5 border-t-2 border-l-2 border-gold z-20 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="pointer-events-none absolute -top-1 -right-1 h-3.5 w-3.5 border-t-2 border-r-2 border-gold z-20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="pointer-events-none absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-2 border-l-2 border-gold z-20 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
                  <div className="pointer-events-none absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-2 border-r-2 border-gold z-20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />

                  {/* Inner Frame */}
                  <div className="relative overflow-hidden border border-gold/40 bg-ink aspect-[4/5]">
                    <img
                      src={it.img}
                      alt={it.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 group-hover:brightness-105"
                    />

                    {/* Golden Ambient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-gold/10 opacity-70 transition-opacity duration-300 group-hover:opacity-40" />

                    {/* Floating Inner Gold Stroke */}
                    <div className="pointer-events-none absolute inset-2.5 border border-gold/25 transition-all duration-500 group-hover:inset-3.5 group-hover:border-gold/60 z-10" />

                    {/* Caption Card Overlay */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-full bg-gradient-to-t from-ink via-ink/90 to-transparent p-5 pt-16 transition-transform duration-500 group-hover:translate-y-0">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                        {it.cat}
                      </div>
                      <div className="mt-1 font-display text-xl text-ivory">{it.title}</div>
                      <div className="mt-1 flex gap-4 text-[10px] uppercase tracking-[0.2em] text-ivory/60">
                        <span>{it.price}</span>
                        <span>{it.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* lightbox with Awwwards Golden Frame */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 backdrop-blur-md p-6"
          >
            <motion.div
              layoutId={`tile-${selected.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl p-3 rounded-sm bg-gradient-to-br from-gold via-gold-light to-gold-deep shadow-[0_0_60px_rgba(201,162,76,0.5)]"
            >
              {/* Luxury Gold Corner Brackets for Lightbox */}
              <div className="pointer-events-none absolute -top-2 -left-2 h-6 w-6 border-t-2 border-l-2 border-gold z-30" />
              <div className="pointer-events-none absolute -top-2 -right-2 h-6 w-6 border-t-2 border-r-2 border-gold z-30" />
              <div className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-gold z-30" />
              <div className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-gold z-30" />

              <div className="relative overflow-hidden border border-gold/50 bg-ink">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="max-h-[80vh] w-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink via-ink/90 to-transparent p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                    {selected.cat}
                  </div>
                  <div className="font-display text-3xl text-ivory">{selected.title}</div>
                  <div className="mt-2 flex gap-4 text-xs text-ivory/60">
                    <span>{selected.price}</span>
                    <span>{selected.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  data-cursor="view"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold hover:bg-gold hover:text-ink transition-colors z-20"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
