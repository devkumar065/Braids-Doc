import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { MagneticButton } from "@/components/system/MagneticButton";
import styleKnotless from "@/assets/style-knotless.jpg";
import styleFulani from "@/assets/style-fulani.jpg";
import styleBoho from "@/assets/style-boho.jpg";
import styleStitch from "@/assets/style-stitch.jpg";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book — Braids Doc" },
      {
        name: "description",
        content: "Book your Braids Doc appointment. Style, size, length, date — four quiet steps.",
      },
      { property: "og:title", content: "Book — Braids Doc" },
      {
        property: "og:description",
        content: "Book your appointment — style, size, length, date.",
      },
    ],
  }),
  component: BookPage,
});

const STYLES = [
  { id: "knotless", name: "Knotless Braids", base: 220, img: styleKnotless },
  { id: "fulani", name: "Fulani Braids", base: 230, img: styleFulani },
  { id: "boho", name: "Boho Box Braids", base: 250, img: styleBoho },
  { id: "stitch", name: "Stitch Braids", base: 210, img: styleStitch },
];
const SIZES = [
  { id: "s", name: "Small", mult: 1.4 },
  { id: "m", name: "Medium", mult: 1.15 },
  { id: "l", name: "Large", mult: 1.0 },
  { id: "jumbo", name: "Jumbo", mult: 0.85 },
];
const LENGTHS = [
  { id: "shoulder", name: "Shoulder", add: 0 },
  { id: "midback", name: "Mid-back", add: 60 },
  { id: "waist", name: "Waist", add: 120 },
  { id: "hip", name: "Hip", add: 180 },
];

function BookPage() {
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [done, setDone] = useState(false);

  const price = useMemo(() => {
    const s = STYLES.find((x) => x.id === style);
    const sz = SIZES.find((x) => x.id === size);
    const l = LENGTHS.find((x) => x.id === length);
    if (!s) return 0;
    const base = s.base;
    const withSize = sz ? Math.round(base * sz.mult) : base;
    return withSize + (l?.add ?? 0);
  }, [style, size, length]);

  const canContinue = [style, size, length, date][step] !== null;

  const next = () => {
    if (!canContinue) return;
    if (step === 3) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  if (done) return <Confirmation summary={{ style, size, length, date, price }} />;

  return (
    <main className="relative min-h-screen bg-ink px-6 pt-32 pb-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
            Book your appointment
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">
            Let's create your <em className="gold-shine not-italic">perfect look</em>
          </h1>
        </div>

        <Stepper step={step} />

        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && <Step1 value={style} onChange={setStyle} />}
              {step === 1 && <Step2 value={size} onChange={setSize} />}
              {step === 2 && <Step3 value={length} onChange={setLength} />}
              {step === 3 && <Step4 value={date} onChange={setDate} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-gold/15 pt-8">
          <div className="text-xs uppercase tracking-[0.25em] text-ivory/50">
            {step > 0 && (
              <button data-cursor="view" onClick={back} className="hover:text-gold">
                ← Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-8">
            {price > 0 && (
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-[0.3em] text-ivory/50">
                  Estimate
                </div>
                <RollingPrice value={price} />
              </div>
            )}
            <MagneticButton
              onClick={next}
              disabled={!canContinue}
              cursorLabel={canContinue ? "book" : "disabled"}
            >
              <span
                className={`inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] transition-all ${
                  canContinue
                    ? "bg-gold text-ink shadow-[0_0_30px_rgba(201,162,76,0.35)]"
                    : "border border-ivory/20 text-ivory/30"
                }`}
              >
                {step === 3 ? "Confirm booking" : "Continue"} →
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </main>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Style", "Size", "Length", "Date"];
  return (
    <div className="mt-14 flex items-center justify-between">
      {labels.map((l, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={l} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: active ? 1 : 1, boxShadow: active ? "0 0 24px rgba(201,162,76,0.4)" : "none" }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-[11px] ${
                  done
                    ? "border-gold bg-gold text-ink"
                    : active
                    ? "border-gold bg-gold text-ink pulse-gold"
                    : "border-ivory/25 text-ivory/40"
                }`}
              >
                {done ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path d="M2 7 L6 11 L12 3" stroke="currentColor" strokeWidth="2" />
                  </motion.svg>
                ) : (
                  i + 1
                )}
              </motion.div>
              <div
                className={`mt-2 text-[9px] uppercase tracking-[0.3em] ${
                  active || done ? "text-gold" : "text-ivory/40"
                }`}
              >
                {l}
              </div>
            </div>
            {i < labels.length - 1 && (
              <div className="mx-3 flex-1">
                <div className="relative h-px w-full bg-ivory/15">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i < step ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 origin-left bg-gold"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Step1({ value, onChange }: { value: string | null; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Step 1 of 4</p>
      <h2 className="mt-3 font-display text-4xl">Choose your style</h2>
      <p className="mt-2 text-sm text-ivory/60">Select the braiding style you love.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {STYLES.map((s) => {
          const active = value === s.id;
          return (
            <motion.button
              key={s.id}
              data-cursor="view"
              onClick={() => onChange(s.id)}
              animate={active ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`group relative overflow-visible p-2 rounded-sm text-left transition-all duration-500 ${
                active
                  ? "bg-gradient-to-br from-gold/60 via-gold-light/30 to-gold-deep/80 shadow-[0_0_35px_rgba(201,162,76,0.6)]"
                  : "bg-gradient-to-br from-gold/10 via-transparent to-gold/5 hover:from-gold/30 hover:via-gold-light/10 hover:to-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(201,162,76,0.3)]"
              }`}
            >
              {/* Luxury Gold Corner Brackets */}
              <div className={`pointer-events-none absolute -top-1 -left-1 h-3.5 w-3.5 border-t-2 border-l-2 z-20 transition-all duration-300 ${active ? "border-gold -translate-x-1 -translate-y-1" : "border-gold/50 group-hover:border-gold group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"}`} />
              <div className={`pointer-events-none absolute -top-1 -right-1 h-3.5 w-3.5 border-t-2 border-r-2 z-20 transition-all duration-300 ${active ? "border-gold translate-x-1 -translate-y-1" : "border-gold/50 group-hover:border-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
              <div className={`pointer-events-none absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-2 border-l-2 z-20 transition-all duration-300 ${active ? "border-gold -translate-x-1 translate-y-1" : "border-gold/50 group-hover:border-gold group-hover:-translate-x-0.5 group-hover:translate-y-0.5"}`} />
              <div className={`pointer-events-none absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-2 border-r-2 z-20 transition-all duration-300 ${active ? "border-gold translate-x-1 translate-y-1" : "border-gold/50 group-hover:border-gold group-hover:translate-x-0.5 group-hover:translate-y-0.5"}`} />

              <div className={`relative w-full overflow-hidden border bg-ink transition-colors duration-500 ${active ? "border-gold/60" : "border-gold/20 group-hover:border-gold/40"}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 ${active ? "scale-105 brightness-110" : "group-hover:scale-105 group-hover:brightness-105"}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${active ? "from-ink/80 via-ink/10 to-gold/20 opacity-80" : "from-ink/90 via-ink/20 to-transparent opacity-60 group-hover:opacity-40"}`} />
                  <div className={`pointer-events-none absolute inset-2 border transition-all duration-500 z-10 ${active ? "border-gold/50 inset-3" : "border-gold/10 group-hover:inset-3 group-hover:border-gold/30"}`} />
                  
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-ink shadow-[0_0_15px_rgba(201,162,76,0.5)]"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7 L6 11 L12 3" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative z-20 p-4 bg-ink">
                  <div className={`text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${active ? "text-gold font-bold" : "text-ivory/90 group-hover:text-gold"}`}>
                    {s.name}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold/80">
                    from ${s.base}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Step2({ value, onChange }: { value: string | null; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Step 2 of 4</p>
      <h2 className="mt-3 font-display text-4xl">Choose your size</h2>
      <p className="mt-2 text-sm text-ivory/60">Smaller braids take longer — and last longer.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {SIZES.map((s) => {
          const active = value === s.id;
          return (
            <button
              key={s.id}
              data-cursor="view"
              onClick={() => onChange(s.id)}
              className={`aspect-[5/4] border p-6 text-left transition-colors ${
                active ? "border-gold bg-gold/5" : "border-ivory/15 hover:border-ivory/40"
              }`}
            >
              <div className="font-display text-3xl">{s.name}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                {s.mult > 1 ? `+${Math.round((s.mult - 1) * 100)}%` : s.mult < 1 ? `-${Math.round((1 - s.mult) * 100)}%` : "base"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step3({ value, onChange }: { value: string | null; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Step 3 of 4</p>
      <h2 className="mt-3 font-display text-4xl">Choose your length</h2>
      <p className="mt-2 text-sm text-ivory/60">Any length. Any drama.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {LENGTHS.map((l) => {
          const active = value === l.id;
          return (
            <button
              key={l.id}
              data-cursor="view"
              onClick={() => onChange(l.id)}
              className={`aspect-[5/4] border p-6 text-left transition-colors ${
                active ? "border-gold bg-gold/5" : "border-ivory/15 hover:border-ivory/40"
              }`}
            >
              <div className="font-display text-3xl">{l.name}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                {l.add > 0 ? `+$${l.add}` : "included"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({ value, onChange }: { value: Date | null; onChange: (d: Date) => void }) {
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const monthName = month.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Step 4 of 4</p>
      <h2 className="mt-3 font-display text-4xl">Choose your date</h2>
      <p className="mt-2 text-sm text-ivory/60">Available Wednesday through Sunday.</p>

      <div className="mt-10 rounded border border-ivory/15 p-6">
        <div className="mb-6 flex items-center justify-between">
          <button
            data-cursor="view"
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
            }
            className="text-gold hover:text-gold-light"
          >
            ←
          </button>
          <div className="font-display text-xl">{monthName}</div>
          <button
            data-cursor="view"
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
            }
            className="text-gold hover:text-gold-light"
          >
            →
          </button>
        </div>
        <div className="mb-2 grid grid-cols-7 gap-2 text-center text-[9px] uppercase tracking-[0.2em] text-ivory/40">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const dow = d.getDay();
            const past = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const unavailable = past || dow === 1 || dow === 2;
            const selected = value?.toDateString() === d.toDateString();
            return (
              <button
                key={i}
                disabled={unavailable}
                data-cursor={unavailable ? "disabled" : "view"}
                onClick={() => !unavailable && onChange(d)}
                className={`relative aspect-square text-sm transition-all ${
                  selected
                    ? "border-gold bg-gold text-ink"
                    : unavailable
                    ? "text-ivory/20"
                    : "border-transparent text-ivory hover:border hover:border-gold"
                } border`}
              >
                {d.getDate()}
                {unavailable && !past && (
                  <span className="pointer-events-none absolute inset-2 rotate-45 border-t border-ivory/10" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RollingPrice({ value }: { value: number }) {
  const str = `$${value}`;
  return (
    <div className="mt-1 font-display text-3xl text-gold">
      {str.split("").map((ch, i) => (
        <motion.span
          key={`${i}-${ch}`}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: i * 0.03 }}
          style={{ display: "inline-block" }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}

function Confirmation({
  summary,
}: {
  summary: { style: string | null; size: string | null; length: string | null; date: Date | null; price: number };
}) {
  const styleName = STYLES.find((s) => s.id === summary.style)?.name ?? "—";
  const sizeName = SIZES.find((s) => s.id === summary.size)?.name ?? "—";
  const lengthName = LENGTHS.find((s) => s.id === summary.length)?.name ?? "—";
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 pt-32 pb-24">
      {/* particle burst */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const dist = 200 + Math.random() * 160;
          return (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(a) * dist,
                y: Math.sin(a) * dist + 40,
                opacity: 0,
                scale: 0.4,
              }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute h-1.5 w-1.5 rounded-full bg-gold"
              style={{ boxShadow: "0 0 12px rgba(201,162,76,0.6)" }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative w-full max-w-md text-center"
      >
        <motion.svg
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="mx-auto"
        >
          <circle cx="40" cy="40" r="34" fill="#c9a24c" />
          <circle cx="40" cy="40" r="30" fill="none" stroke="#0a0806" strokeWidth="0.5" strokeDasharray="2 3" />
          <text
            x="40"
            y="48"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontSize="24"
            fill="#0a0806"
          >
            BD
          </text>
        </motion.svg>

        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold">
          Sealed & confirmed
        </p>
        <h1 className="mt-4 font-display text-5xl">Your chair is booked.</h1>

        <div className="mt-10 space-y-3 border-t border-gold/20 pt-8 text-left text-sm">
          <Row k="Style" v={styleName} />
          <Row k="Size" v={sizeName} />
          <Row k="Length" v={lengthName} />
          <Row
            k="Date"
            v={summary.date?.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            }) ?? "—"}
          />
          <div className="!mt-6 flex items-baseline justify-between border-t border-gold/20 pt-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Total</span>
            <span className="font-display text-3xl text-gold">${summary.price}</span>
          </div>
        </div>

        <a
          href="/"
          data-cursor="view"
          className="mt-10 inline-block text-[10px] uppercase tracking-[0.3em] text-gold hover:text-gold-light"
        >
          Return home →
        </a>
      </motion.div>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">{k}</span>
      <span className="text-ivory/90">{v}</span>
    </div>
  );
}
