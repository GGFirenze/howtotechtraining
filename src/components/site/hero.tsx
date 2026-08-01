"use client";

import { trackEvent } from "@/lib/analytics/events";
import { smoothScrollToAnchor } from "@/lib/scroll";

export function Hero() {
  return (
    <section className="bg-hero-glow relative overflow-hidden px-6 pt-36 pb-24 sm:px-10 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="border-border-soft bg-background-elevated text-foreground-muted mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-widest uppercase">
          <span aria-hidden className="bg-brand-emerald-bright size-1.5 rounded-full" />
          Guide + Services for Technical Trainers
        </p>

        <h1 className="text-foreground text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          Crack the secret to a successful <span className="text-brand-gradient">VILT</span>{" "}
          session.
        </h1>

        <p className="text-foreground-muted mx-auto mt-6 max-w-2xl text-lg leading-8 text-pretty sm:text-xl">
          The 130-page practical guide to designing and delivering Virtual Instructor-Led Training
          that actually sticks, plus hands-on services and training outsourcing for teams that want
          to improve their delivery.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {/*
            Hero CTAs use a JavaScript handler instead of the browser's
            default anchor-link behaviour. The native behaviour produces
            no DOM mutation when the target is already in the viewport,
            which Amplitude flags as a Dead Click and which session
            replay confirmed correlates with immediate site abandonment
            (especially on mobile, where 67% of dead-clicks on these
            buttons led to bounces).

            smoothScrollToAnchor() guarantees a DOM mutation (the
            `target-pulse` class is added then removed), a visible
            cyan pulse around the target section, and a smooth scroll
            with the offset set in globals.css. The plain href is
            kept so SEO crawlers, screen readers, and JS-disabled
            visitors still see a real link destination.
          */}
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              trackEvent("Get Guide Clicked", { click_location: "hero_section" });
              smoothScrollToAnchor("pricing");
            }}
            className="bg-foreground text-background inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Get the guide
          </a>
          {/*
            Secondary hero CTA promoted from 'See what's inside' to
            'Explore our services' on 12 July 2026 to give the two
            higher-margin service tiers (Delivery Pack, Train the
            Trainer) surface at the top of the funnel. The 'What's
            inside' section is still reachable via the header nav
            and by scrolling.
          */}
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              trackEvent("Services Clicked", { click_location: "hero_section" });
              smoothScrollToAnchor("services");
            }}
            className="border-border-soft text-foreground hover:bg-background-elevated inline-flex h-12 items-center justify-center rounded-full border px-7 text-sm font-semibold transition-colors"
          >
            Explore our services
          </a>
        </div>

        <p className="text-foreground-subtle mt-8 text-xs">
          Guide: £15 one-time · Services: free exploratory call
        </p>
      </div>
    </section>
  );
}
