import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Reveal, SplitWords } from "@/components/system/Reveal";
import { MagneticButton } from "@/components/system/MagneticButton";

import styleKnotless from "@/assets/style-knotless.jpg";
import styleFulani from "@/assets/style-fulani.jpg";
import styleBoho from "@/assets/style-boho.jpg";
import styleStitch from "@/assets/style-stitch.jpg";
import styleCornrows from "@/assets/style-cornrows.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import heroStory from "@/assets/hero-story.jpg";
import heroBg from "@/assets/hero.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Braids Doc — Luxury Braiding Studio in Los Angeles" },
      {
        name: "description",
        content:
          "Premium braiding. Personalized beauty. Confidence, styled by experts. Book knotless, Fulani, boho and stitch braids in LA.",
      },
      { property: "og:title", content: "Braids Doc — Luxury Braiding Studio in Los Angeles" },
      {
        property: "og:description",
        content: "Premium braiding. Personalized beauty. Confidence, styled by experts. Book knotless, Fulani, boho and stitch braids in LA.",
      },
    ],
  }),
  component: HomePage,
});

const STYLES = [
  { name: "Knotless", price: "$220 – $380", img: styleKnotless },
  { name: "Fulani", price: "$230 – $400", img: styleFulani },
  { name: "Boho Box", price: "$250 – $450", img: styleBoho },
  { name: "Stitch", price: "$210 – $350", img: styleStitch },
  { name: "Cornrows", price: "$180 – $300", img: styleCornrows },
];

function HomePage() {
  return (
    <main className="relative bg-ink text-ivory">
      <Hero />
      <CraftStrip />
      <StoryTeaser />
      <BentoPortfolio />
      <ReviewsMarquee />
      <ClosingCTA />
    </main>
  );
}

/* --------------------------- HERO ---------------------------- */

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[70vh] md:min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* Background Image containing the brand name */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pt-[80px] sm:pt-[100px] md:pt-[120px]">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroBg}
          alt="Braids Doc Luxury Braiding Studio"
          className="h-full w-full object-contain object-center md:object-cover md:object-top"
        />
        {/* Subtle bottom gradient to blend with the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>


    </section>
  );
}

/* --------------------------- CRAFT STRIP (horizontal pin) ---------------------------- */

function CraftStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const total = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${total + 200}`,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-20 md:py-0 md:h-screen md:flex md:items-center">
      <div className="mx-auto mb-10 flex w-full max-w-[1400px] items-end justify-between px-6 md:absolute md:left-0 md:right-0 md:top-24 md:mb-0 md:px-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">The Craft</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            <SplitWords text="Styles, handcrafted." />
          </h2>
        </div>
        <p className="hidden max-w-xs text-xs leading-relaxed text-ivory/60 md:block">
          Scroll — each look a signature. Every parting drawn by hand.
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 px-6 md:gap-10 md:px-[10vw] md:pt-16"
      >
        {STYLES.map((s, i) => (
          <StyleCard key={s.name} style={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StyleCard({ style, index }: { style: (typeof STYLES)[number]; index: number }) {
  return (
    <div
      data-cursor="view"
      className="group relative h-[440px] w-[300px] shrink-0 overflow-hidden md:h-[540px] md:w-[380px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={style.img}
          alt={style.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-70" />
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold">0{index + 1}</p>
        <h3 className="mt-2 font-display text-3xl">{style.name}</h3>
        <p className="mt-1 text-xs text-ivory/60">{style.price}</p>
      </div>
      <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/40" />
    </div>
  );
}

/* --------------------------- STORY TEASER ---------------------------- */

function StoryTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroStory}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background:
              "conic-gradient(from 0deg at 30% 40%, transparent, rgba(201,162,76,0.4), transparent, transparent, rgba(240,215,140,0.3), transparent)",
            animation: "gold-sweep 10s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Our Story</p>
        <h2 className="mt-8 font-display text-4xl leading-[1.15] md:text-6xl">
          <SplitWords text="It's more than hair. It's legacy, identity, and self-love." />
        </h2>
        <div className="mt-10">
          <Link
            to="/about"
            data-cursor="view"
            className="text-[11px] uppercase tracking-[0.3em] text-gold hover:text-gold-light"
          >
            Read my journey →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- BENTO PORTFOLIO ---------------------------- */

function BentoPortfolio() {
  const tiles = [
    { img: portfolio1, span: "md:col-span-2 md:row-span-1", label: "Crown Work" },
    { img: portfolio2, span: "md:col-span-1 md:row-span-2", label: "Long Knotless" },
    { img: portfolio3, span: "md:col-span-1 md:row-span-1", label: "Detail" },
    { img: portfolio4, span: "md:col-span-1 md:row-span-1", label: "The Process" },
  ];

  return (
    <section className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Gallery</p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">
              <SplitWords text="Every crown, remembered." />
            </h2>
          </div>
          <Link
            to="/gallery"
            data-cursor="view"
            className="hidden text-[11px] uppercase tracking-[0.3em] text-gold hover:text-gold-light md:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:h-[720px]">
          {tiles.map((t, i) => (
            <TiltTile key={i} img={t.img} label={t.label} className={t.span} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltTile({
  img,
  label,
  className,
}: {
  img: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rxV = useMotionValue(0);
  const ryV = useMotionValue(0);
  const rx = useSpring(rxV, { stiffness: 200, damping: 20 });
  const ry = useSpring(ryV, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rxV.set(-py * 6);
    ryV.set(px * 6);
  };
  const onLeave = () => {
    rxV.set(0);
    ryV.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="view"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group relative h-[300px] overflow-hidden md:h-auto ${className ?? ""}`}
    >
      <img
        src={img}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-60" />
      <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-ivory/80">
        {label}
      </div>
    </motion.div>
  );
}

/* --------------------------- REVIEWS MARQUEE ---------------------------- */

const REVIEWS = [
  { name: "Amara", text: "Every stitch felt intentional. My scalp thanked me." },
  { name: "Zuri", text: "She styles like a sculptor. Ten hours flew." },
  { name: "Nia", text: "The most cared-for I've felt in a braid chair." },
  { name: "Imani", text: "Six weeks in and the parts still look fresh." },
  { name: "Kali", text: "Booked her for my sister. Now the whole family goes." },
  { name: "Sade", text: "It's not a service, it's a ceremony." },
];

function ReviewsMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="relative overflow-hidden border-y border-gold/15 py-16">
      <div className="mb-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Kind words</p>
      </div>
      <div
        className="flex cursor-pointer gap-16 whitespace-nowrap"
        style={{
          animation: "marquee 8s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((r, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="font-display italic text-2xl md:text-3xl text-ivory/85">
              "{r.text}"
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">— {r.name}</span>
            <span className="text-gold/40">◆</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </section>
  );
}

/* --------------------------- CLOSING CTA ---------------------------- */

function ClosingCTA() {
  return (
    <section className="relative px-6 py-40 text-center">
      <Reveal>
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Your chair is waiting</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
          Let's create your <em className="gold-shine not-italic">perfect look</em>.
        </h2>
        <div className="mt-12 flex justify-center">
          <MagneticButton as="a" href="/book" cursorLabel="book">
            <span className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-ink transition-shadow hover:shadow-[0_0_40px_rgba(201,162,76,0.5)]">
              Book your appointment →
            </span>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
