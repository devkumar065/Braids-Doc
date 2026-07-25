import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/book", label: "Book Now" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [underline, setUnderline] = useState<{ x: number; w: number; op: number }>({
    x: 0,
    w: 0,
    op: 0,
  });
  const barRef = useRef<HTMLDivElement>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Position underline under active link
  useEffect(() => {
    if (!barRef.current) return;
    const active = barRef.current.querySelector<HTMLAnchorElement>(`a[data-active="true"]`);
    if (!active) return;
    const parentRect = barRef.current.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    setUnderline({ x: r.left - parentRect.left, w: r.width, op: 1 });
  }, [path]);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const onHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!barRef.current) return;
    const parentRect = barRef.current.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    setUnderline({ x: r.left - parentRect.left, w: r.width, op: 1 });
  };
  const onLeave = () => {
    if (!barRef.current) return;
    const active = barRef.current.querySelector<HTMLAnchorElement>(`a[data-active="true"]`);
    if (!active) {
      setUnderline((u) => ({ ...u, op: 0 }));
      return;
    }
    const parentRect = barRef.current.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    setUnderline({ x: r.left - parentRect.left, w: r.width, op: 1 });
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-6 md:px-10 transition-all duration-500">
        <div className="relative mx-auto max-w-[1400px] rounded-[1.25rem] p-[1px] overflow-hidden">
          {/* Animated Border Shine Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(90deg, rgba(201,162,76,0.1), rgba(201,162,76,1), rgba(201,162,76,0.1))",
              backgroundSize: "200% 100%",
              animation: "borderShineBg 4s infinite linear",
            }}
          />
          <style>{`
            @keyframes borderShineBg {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>

          <div
            className={`relative z-10 flex w-full items-center justify-between rounded-[calc(1.25rem-1px)] bg-[#080605]/95 px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-shadow duration-500 md:px-10 ${
              scrolled ? "shadow-[0_0_35px_rgba(201,162,76,0.25)]" : ""
            }`}
          >



          {/* Left Section */}
          <Link to="/" data-cursor="view" className="relative z-40 flex items-center gap-5">
            <span className="font-display text-2xl text-gold">Braids Doc</span>
            <span className="hidden h-4 w-px bg-gold/30 md:block" />
            <span className="hidden text-[9px] uppercase tracking-[0.3em] text-ivory/50 md:block">
              Luxury Braiding Studio
            </span>
          </Link>

          {/* Right Section - Desktop Navigation */}
          <nav
            ref={barRef}
            onMouseLeave={onLeave}
            className="relative z-40 hidden items-center gap-8 lg:flex"
          >
            {LINKS.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  data-cursor={l.to === "/book" ? "book" : "view"}
                  data-active={active}
                  onMouseEnter={onHover}
                  className={`text-[9px] uppercase tracking-[0.25em] transition-colors ${
                    active ? "text-gold" : "text-ivory/80 hover:text-gold"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            {/* Underline for active link */}
            <span
              aria-hidden
              className="absolute -bottom-2 h-px bg-gold transition-all duration-500"
              style={{
                transform: `translateX(${underline.x}px)`,
                width: underline.w,
                opacity: underline.op,
              }}
            />

            <Link
              to="/book"
              data-cursor="book"
              className="ml-2 rounded-full border border-gold/40 px-5 py-2.5 text-[9px] uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-ink hover:shadow-[0_0_15px_rgba(201,162,76,0.3)]"
            >
              Book Consultation &gt;
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="relative z-40 flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 text-gold"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8 px-6 pt-20">
          {LINKS.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-display uppercase tracking-widest transition-colors ${
                  active ? "text-gold" : "text-ivory/80"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
