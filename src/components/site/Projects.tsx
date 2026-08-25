import { useState } from "react";
import listingsImg from "@/assets/project-listings.jpg";
import iotImg from "@/assets/project-iot.jpg";
import crmImg from "@/assets/project-crm.jpg";
import pwaImg from "@/assets/project-pwa.jpg";
import { Reveal } from "./Reveal";
import { SpotlightCard } from "./SpotlightCard";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  category: "Listings & Search" | "Brokerage Operations" | "Buyer Experience";
  image: string;
  ref: string;
  summary: string;
  specs: { label: string; value: string }[];
  stack: string[];
};

const projects: Project[] = [
  {
    title: "MLS-Grade Property Listing Engine",
    category: "Listings & Search",
    image: listingsImg,
    ref: "PRJ–01",
    summary:
      "Property listing and search backend on .NET 8 microservices — MLS-style feed ingestion, geo and faceted search, viewing requests, offers, agent commissions and escrow-ready closing payments, built with Repository Pattern and Unit of Work.",
    specs: [
      { label: "Services", value: "9 bounded contexts" },
      { label: "Search", value: "Geo + faceted, Redis-cached" },
      { label: "Uptime", value: "Zero-downtime deploys" },
    ],
    stack: [".NET 8", "DDD", "PostgreSQL", "Redis", "gRPC"],
  },
  {
    title: "Real-Time Property & IoT Dashboard",
    category: "Brokerage Operations",
    image: iotImg,
    ref: "PRJ–02",
    summary:
      "Full-stack operations dashboard tracking building sensors, site logistics and unit handover status live across 1,000+ endpoints with SignalR streaming and telemetry rollups.",
    specs: [
      { label: "Endpoints", value: "1,000+ live" },
      { label: "Latency", value: "Sub-second push" },
      { label: "Frontend", value: "Angular + charts" },
    ],
    stack: ["Angular", "SignalR", "SQL Server", "Docker"],
  },
  {
    title: "Multi-Tenant Brokerage CRM/ERP Sync",
    category: "Brokerage Operations",
    image: crmImg,
    ref: "PRJ–03",
    summary:
      "Synchronization layer between brokerage CRM leads and back-office ERP: tenant-isolated pipelines, hierarchical RBAC per branch and consistent large-scale data transfer.",
    specs: [
      { label: "Tenancy", value: "Isolated per brokerage" },
      { label: "Access", value: "Hierarchical RBAC" },
      { label: "Volume", value: "Bulk-consistent sync" },
    ],
    stack: ["ASP.NET Core", "EF Core", "Azure DevOps", "OAuth 2.0"],
  },
  {
    title: "Listings PWA & Web Vitals",
    category: "Buyer Experience",
    image: pwaImg,
    ref: "PRJ–04",
    summary:
      "SEO-first property browsing experience in Next.js: server-rendered listing pages, image pipelines, saved-search PWA offline mode and near-perfect Core Web Vitals.",
    specs: [
      { label: "Rendering", value: "SSR + ISR" },
      { label: "Mobile", value: "Installable PWA" },
      { label: "SEO", value: "Structured listings" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
];

const filters = [
  "All",
  "Listings & Search",
  "Brokerage Operations",
  "Buyer Experience",
] as const;

const PAGE_SIZE = 4;

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [page, setPage] = useState(1);
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount));
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="portfolio" className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          eyebrow="The portfolio"
          title={
            <>
              Featured builds, <em className="not-italic text-accent">listed</em>{" "}
              like properties
            </>
          }
          lede="Four systems taken from architecture diagram to production: listing search that stays instant at scale, brokerage back-offices that never leak a tenant row, and buyer frontends engineered around Core Web Vitals."
          aside={
            <div
              role="group"
              aria-label="Filter projects by domain"
              className="flex flex-wrap gap-2 md:max-w-[15rem] md:justify-end"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active === f}
                  onClick={() => {
                    setActive(f);
                    setPage(1);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs tracking-[0.1em] uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    active === f
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "hairline text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />

        <div className="mt-10 grid sm:mt-12 gap-8 lg:grid-cols-2">
          {visible.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} variant="reveal-blur">
              <SpotlightCard
                as="article"
                className="lift group h-full overflow-hidden rounded-4xl bg-card edge-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-64 w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scrim/70 via-scrim/5 to-transparent opacity-80"
                  />
                  <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
                    <span className="rounded-full bg-card/85 px-4 py-1.5 text-[0.68rem] tracking-[0.16em] uppercase backdrop-blur-md edge-panel">
                      {p.category}
                    </span>
                    <span className="figure text-sm text-onmedia/85">{p.ref}</span>
                  </div>
                </div>

                <div className="p-7 sm:p-8">
                  <h3 className="text-2xl leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>

                  <dl className="mt-7 grid grid-cols-3 gap-4 rounded-2xl bg-secondary/40 p-5 edge-panel">
                    {p.specs.map((s) => (
                      <div key={s.label}>
                        <dt className="eyebrow text-[0.62rem]">{s.label}</dt>
                        <dd className="mt-1.5 text-sm leading-snug">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full px-3.5 py-1.5 text-xs text-muted-foreground hairline"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {pageCount > 1 && (
          <nav
            aria-label="Projects pagination"
            className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--edge-line)] pt-6"
          >
            <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
              Page {current} / {pageCount}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 1}
                className="hairline rounded-full px-4 py-2 text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Prev
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-current={n === current ? "page" : undefined}
                  onClick={() => goTo(n)}
                  className={cn(
                    "figure h-9 w-9 rounded-full text-xs transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    n === current
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "hairline text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {String(n).padStart(2, "0")}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === pageCount}
                className="hairline rounded-full px-4 py-2 text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </div>
    </section>
  );
}
