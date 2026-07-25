import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { CustomCursor } from "@/components/system/CustomCursor";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { GrainOverlay } from "@/components/system/GrainOverlay";
import { Nav } from "@/components/system/Nav";
import { PageTransition } from "@/components/system/PageTransition";
import { LoadSequence } from "@/components/system/LoadSequence";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gold">404</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-ivory/60">Page not found</p>
        <a
          href="/"
          className="mt-8 inline-block border border-gold px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-ink"
        >
          Return home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl text-gold">Something broke</h1>
        <p className="mt-3 text-sm text-ivory/60">Try again in a moment.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 border border-gold px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-ink"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Braids Doc — Luxury Braiding Studio in Los Angeles" },
      {
        name: "description",
        content:
          "Premium braiding. Personalized beauty. Confidence, styled by experts. Book knotless, Fulani, boho and stitch braids in LA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Braids Doc — Luxury Braiding Studio in Los Angeles" },
      { name: "twitter:title", content: "Braids Doc — Luxury Braiding Studio in Los Angeles" },
      { property: "og:description", content: "Premium braiding. Personalized beauty. Confidence, styled by experts. Book knotless, Fulani, boho and stitch braids in LA." },
      { name: "twitter:description", content: "Premium braiding. Personalized beauty. Confidence, styled by experts. Book knotless, Fulani, boho and stitch braids in LA." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Watermark() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[990] flex items-center">
      <a
        href="https://vysen.systems"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        className="pointer-events-auto group relative overflow-hidden rounded-full border border-gold/30 bg-black/40 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-ivory/60 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:text-ivory hover:shadow-[0_0_25px_rgba(201,162,76,0.25)]"
      >
        <span className="relative z-10 flex items-center gap-1.5">
          Made by <span className="font-medium text-gold transition-colors duration-300 group-hover:text-gold-light">vysen.systems</span>
        </span>
      </a>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <LoadSequence>
          <CustomCursor />
          <GrainOverlay />
          <Nav />
          <PageTransition>
            <Outlet />
          </PageTransition>
          <Watermark />
        </LoadSequence>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
