import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SplitWords } from "@/components/system/Reveal";
import { MagneticButton } from "@/components/system/MagneticButton";
import heroStory from "@/assets/hero-story.jpg";
import aboutChapter from "@/assets/about-chapter.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Braids Doc" },
      {
        name: "description",
        content:
          "It's more than hair. It's legacy, identity, and self-love. The story behind Braids Doc.",
      },
      { property: "og:title", content: "About — Braids Doc" },
      {
        property: "og:description",
        content: "The story behind Braids Doc — legacy, identity, and self-love.",
      },
    ],
  }),
  component: AboutPage,
});

const CHAPTERS = [
  {
    n: "01",
    key: "story",
    title: "Our Story",
    heading: "It's more than hair. It's legacy, identity, and self-love.",
    body: "Braids Doc was built on the belief that every style tells a story, and every crown carries culture. What started as a passion in a small chair has grown into a luxury experience rooted in care, artistry, and community.",
    img: heroStory,
  },
  {
    n: "02",
    key: "journey",
    title: "The Journey",
    heading: "Ten years of hands, hours, and hair.",
    body: "From the first braid at fourteen to countless clients since — every crown perfected by patience, and every technique earned in real chairs, real hours, real trust.",
    img: aboutChapter,
  },
  {
    n: "03",
    key: "mission",
    title: "The Mission",
    heading: "Protect the hair. Elevate the woman.",
    body: "Every part is drawn to preserve the scalp. Every technique chosen to guard the strand. Luxury here means longevity — for you, and for your hair.",
    img: portfolio4,
  },
  {
    n: "04",
    key: "experience",
    title: "The Experience",
    heading: "A private chair. Your own tempo.",
    body: "No crowded salons. No shared time. Just you, quiet music, warm light, and a stylist whose only job that day is you.",
    img: portfolio5,
  },
];

function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main ref={containerRef} className="relative bg-ink pt-32">
      {/* right-edge global progress */}
      <div className="fixed right-0 top-0 bottom-0 z-30 w-px">
        <motion.div
          style={{ height: progressHeight }}
          className="w-full bg-gold origin-top"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Our Story</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] md:text-8xl">
            <SplitWords text="It's more than hair." />
          </h1>
        </div>

        <div className="grid gap-16 md:grid-cols-[280px_1fr]">
          {/* left sticky nav */}
          <aside className="md:sticky md:top-32 md:h-fit">
            <ul className="space-y-6 md:space-y-8">
              {CHAPTERS.map((c) => (
                <li key={c.key} className="flex items-start gap-4">
                  <span className="mt-2 block h-px w-6 bg-gold/40" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                      {c.n}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.25em] text-ivory/80">
                      {c.title}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-40">
            {CHAPTERS.map((c, i) => (
              <ChapterBlock key={c.key} chapter={c} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gold/15 px-6 py-32 text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Ready when you are</p>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl md:text-6xl">
            Sit in <em className="gold-shine not-italic">the chair</em>.
          </h2>
          <div className="mt-10 flex justify-center">
            <MagneticButton as="a" href="/book">
              <span className="inline-flex rounded-full bg-gold px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-ink">
                Book your appointment
              </span>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

function ChapterBlock({
  chapter,
  index,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid gap-8 md:grid-cols-2 md:gap-16 items-center ${isEven ? "" : "md:[direction:rtl] md:[&>*]:[direction:ltr]"}`}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
          Chapter {chapter.n}
        </p>
        <h2 className="mt-4 font-display text-3xl leading-[1.15] md:text-5xl">
          <SplitWords text={chapter.heading} />
        </h2>
        <div className="mt-8 h-px w-16 bg-gold" />
        <p className="mt-8 max-w-md text-sm leading-relaxed text-ivory/70">{chapter.body}</p>
      </div>

      {/* Awwwards-Level Metallic Golden Border Frame */}
      <div className="group relative p-3 rounded-sm bg-gradient-to-br from-gold/50 via-gold-light/20 to-gold-deep/60 transition-all duration-500 hover:from-gold hover:via-gold-light hover:to-gold shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(201,162,76,0.4)]">
        {/* Luxury Gold Corner Brackets */}
        <div className="pointer-events-none absolute -top-1.5 -left-1.5 h-4 w-4 border-t-2 border-l-2 border-gold z-20 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
        <div className="pointer-events-none absolute -top-1.5 -right-1.5 h-4 w-4 border-t-2 border-r-2 border-gold z-20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-4 w-4 border-b-2 border-l-2 border-gold z-20 transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
        <div className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-4 w-4 border-b-2 border-r-2 border-gold z-20 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

        {/* Inner Frame */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/40 bg-ink">
          {/* Parallax Image */}
          <motion.img
            src={chapter.img}
            alt={chapter.title}
            loading="lazy"
            style={{ y: imgY, scale: imgScale }}
            className="h-full w-full object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-105"
          />

          {/* Golden Shimmer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-gold/15 opacity-80 transition-opacity duration-500 group-hover:opacity-45" />

          {/* Floating Inner Gold Stroke */}
          <div className="pointer-events-none absolute inset-3 border border-gold/25 transition-all duration-500 group-hover:inset-4 group-hover:border-gold/60" />

          {/* Chapter Badge */}
          <div className="absolute top-4 right-4 z-10 rounded-full border border-gold/50 bg-ink/80 px-3 py-1 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
            <span className="font-display text-xs tracking-widest text-gold">{chapter.n}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
