import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export function LoadSequence({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("bd-loaded") === "1") {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("bd-loaded", "1");
      setDone(true);
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {!done && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
            style={{ background: "#0a0806" }}
          >
            <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
              <motion.ellipse
                cx="60"
                cy="70"
                rx="45"
                ry="60"
                stroke="#c9a24c"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <motion.text
                x="60"
                y="82"
                textAnchor="middle"
                fontFamily="Cormorant Garamond, serif"
                fontSize="34"
                fill="#c9a24c"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                BD
              </motion.text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
