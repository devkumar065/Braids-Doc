import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SplitWords } from "@/components/system/Reveal";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { lazy, Suspense, useState, useEffect } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Braids Doc" },
      {
        name: "description",
        content:
          "Home-based in Los Angeles, mobile to you. Serving a 15-mile radius. Connect on WhatsApp, Instagram, or Threads.",
      },
      { property: "og:title", content: "Contact — Braids Doc" },
      {
        property: "og:description",
        content: "Home-based in LA, mobile to you within 15 miles.",
      },
    ],
  }),
  component: ContactPage,
});

const FAQ = [
  {
    q: "Where are you located?",
    a: "I'm based in Los Angeles, CA and offer services within a 15-mile radius of my home studio. Mobile appointments outside this area may be available for an additional travel fee.",
  },
  {
    q: "Do you travel to clients?",
    a: "Yes — mobile appointments are available within a 15-mile radius. Beyond that, a travel fee applies. Reach out on WhatsApp for a quote.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the Book page for the full flow, or send a WhatsApp message with the style, size, length and preferred date.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Zelle, Cash App, Apple Pay, or cash on arrival. A deposit secures your slot.",
  },
  {
    q: "What is your cancellation policy?",
    a: "48 hours' notice retains your deposit for rescheduling. Later than that, the deposit is forfeit — hair takes hours and my day was held for you.",
  },
];

function ContactPage() {
  return (
    <main className="relative min-h-screen bg-ink pt-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 pb-24 md:grid-cols-2 md:px-10">
        {/* left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.4em] text-gold"
          >
            Let's Connect
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl"
          >
            Home-Based in Los Angeles.<br />Mobile to You.
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 h-px bg-gold"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-md text-sm leading-relaxed text-ivory/70"
          >
            I provide private, comfortable braiding experiences in my home studio in Los
            Angeles — and travel to you for your convenience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex items-start gap-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                  fill="#c9a24c"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Los Angeles, CA
              </div>
              <div className="mt-1 text-xs text-ivory/60">Serving a 15-mile radius</div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <form className="mt-16 flex max-w-md flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border-b border-gold/30 bg-transparent pb-3 text-sm text-ivory transition-colors placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                required
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-b border-gold/30 bg-transparent pb-3 text-sm text-ivory transition-colors placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                required
              />
            </div>
            <div className="relative">
              <textarea
                placeholder="How can I help you?"
                rows={3}
                className="w-full resize-none border-b border-gold/30 bg-transparent pb-3 text-sm text-ivory transition-colors placeholder:text-ivory/30 focus:border-gold focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="group relative mt-2 self-start overflow-hidden rounded-full border border-gold/30 px-10 py-4 text-[10px] uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink"
            >
              <span className="relative z-10">Send Message</span>
            </button>
          </form>
        </div>

        {/* right — map */}
        <MapWrapper />
      </div>

      {/* socials */}
      <div className="mx-auto max-w-[1400px] border-t border-gold/15 px-6 py-16 md:px-10">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-gold">
          Connect with me
        </p>
        <div className="mt-8 flex justify-center gap-10">
          <SocialIcon label="WhatsApp">
            <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm5 14.3c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-4-1.6-3.4-1.9-5.4-5.4-5.6-5.6-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1.1-2.6.3-.3.6-.3.8-.3h.6c.2 0 .5 0 .7.5.3.6.9 2.2 1 2.4.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.7.3.1.5.1.7-.1l.9-1.1c.2-.3.5-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4.1.2.1.9-.1 1.6Z" />
          </SocialIcon>
          <SocialIcon label="Instagram">
            <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.7 1.7 4.9 4.9.1 1.2.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.2 3.2-1.7 4.7-4.9 4.9-1.2.1-1.6.1-4.8.1-3.2 0-3.6 0-4.8-.1-3.2-.2-4.7-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8.2-3.2 1.7-4.7 4.9-4.9C8.4 2.2 8.8 2.2 12 2.2Zm0 5a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm5-8.1a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0Z" />
          </SocialIcon>
          <SocialIcon label="Threads">
            <path d="M17.6 11.2c-.1 0-.1-.1-.2-.1-.2-3-1.9-4.8-4.6-4.8-1.6 0-3 .7-3.9 1.9l1.5 1c.6-.9 1.5-1.3 2.4-1.3 1.4 0 2.6.9 2.8 2.8-1-.2-2-.3-3-.2-2.6.1-4.3 1.7-4.2 3.8.1 1 .6 1.9 1.4 2.5.9.7 2.1 1 3.4.9 1.7-.1 3-.7 3.9-1.9.6-.9 1-2 1.1-3.4.4.3.7.6 1 .9.5.6.7 1.3.7 2.2 0 2.7-2.3 4.7-5.7 4.7-3.7 0-6.5-2.3-6.5-6.9 0-4.6 2.7-6.8 6.6-6.8 3.2 0 5.3 1.6 6 4.4l1.7-.4c-.9-3.5-3.7-5.6-7.7-5.6-4.9 0-8.3 2.9-8.3 8.4S6.9 22 12 22c3.2 0 5.3-1.3 6.6-2.9 1-1.3 1.5-2.9 1.4-4.7-.1-1.4-.7-2.5-1.7-3.3 0 0 0 .1-.7.1Zm-3.9 4c-.6.8-1.5 1.2-2.5 1.3-1.5.1-2.7-.7-2.8-1.9 0-.9.9-1.7 2.4-1.8h.3c.7 0 1.3.1 2.2.3 0 .8-.2 1.5-.6 2.1Z" />
          </SocialIcon>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-3xl px-6 pb-32">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
            Frequently asked
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Answers, briefly.</h2>
        </Reveal>

        <Accordion.Root type="single" collapsible className="mt-12 space-y-3">
          {FAQ.map((f, i) => (
            <Accordion.Item
              key={i}
              value={String(i)}
              className="group border border-ivory/10 transition-all data-[state=open]:border-gold data-[state=open]:shadow-[0_0_30px_rgba(201,162,76,0.15)]"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  data-cursor="view"
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm text-ivory/90">{f.q}</span>
                  <span className="text-gold transition-transform duration-300 group-data-[state=open]:rotate-45">
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-6 pb-6 text-sm leading-relaxed text-ivory/60">{f.a}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </main>
  );
}

function SocialIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      data-cursor="view"
      className="group flex flex-col items-center"
      aria-label={label}
    >
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-gold transition-colors">
        <span className="absolute inset-0 origin-center scale-0 rounded-full bg-gold transition-transform duration-500 group-hover:scale-100" />
        <svg
          viewBox="0 0 24 24"
          className="relative h-5 w-5 fill-gold transition-colors duration-500 group-hover:fill-ink"
        >
          {children}
        </svg>
      </div>
      <span className="mt-3 text-[9px] uppercase tracking-[0.25em] text-ivory/60">
        {label}
      </span>
    </a>
  );
}

const LocationMap = lazy(() => import("@/components/system/LocationMap"));

function MapWrapper() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-gold/15 bg-[#080605] shadow-[0_0_50px_rgba(201,162,76,0.05)]" />;
  }

  return (
    <Suspense
      fallback={
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-gold/15 bg-[#080605] shadow-[0_0_50px_rgba(201,162,76,0.05)] animate-pulse" />
      }
    >
      <LocationMap />
    </Suspense>
  );
}
