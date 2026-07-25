import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* gold wipe overlay on route change */}
      <AnimatePresence>
        <motion.div
          key={path + "-wipe"}
          initial={{ scaleX: 1, transformOrigin: "left" }}
          animate={{ scaleX: 0, transformOrigin: "right" }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-none fixed inset-0 z-[70]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #8b6f2a 20%, #c9a24c 50%, #f0d78c 60%, #8b6f2a 80%, transparent 100%)",
          }}
        />
      </AnimatePresence>
    </>
  );
}
