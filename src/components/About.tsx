import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { principles } from "@/data/expertise";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="About"
          title={<>Engineering for trust and scale.</>}
        />

        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            <p>
              I&apos;m Mostafa Samir, a Senior Full Stack Engineer with 4+ years building
              high-performance microservices and modern web architectures. My focus is systems that
              must stay correct under load — the kind banking and fintech environments depend on.
            </p>
            <p>
              Most of my work lives in .NET 8 and ASP.NET Core, structured with Clean Architecture
              and DDD, backed by SQL Server, PostgreSQL and Redis. I&apos;ve led transitions to
              multi-tenant architectures with secure data isolation and hierarchical RBAC, and built
              real-time backends with SignalR serving 1,000+ endpoints.
            </p>
            <p>
              On the frontend I ship with Angular, React and Next.js in TypeScript. Reliability,
              security and measurable performance are not features I add later — a 300% database
              performance improvement came from treating them as part of the design.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl hairline bg-surface/35 p-7 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full hairline bg-brand/10 font-mono text-sm text-brand-soft">
                  MS
                </div>
                <div>
                  <div className="font-semibold">Mostafa Samir</div>
                  <div className="text-sm text-muted-foreground">Banking &amp; Fintech Systems</div>
                </div>
              </div>

              <div className="mono-label mt-8">Principles</div>
              <div className="mt-4 grid gap-px overflow-hidden rounded-xl hairline sm:grid-cols-2">
                {principles.map((p) => (
                  <div key={p} className="bg-background/50 px-4 py-4 text-sm">
                    {p}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Based in</span>
                  <span className="text-foreground">Tanta, Egypt · Remote</span>
                </div>
                <div className="flex justify-between">
                  <span>Engagements</span>
                  <span className="text-foreground">Full-time · Contract</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
