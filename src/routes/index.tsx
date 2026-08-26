import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Radar,
  Siren,
  Map as MapIcon,
  Boxes,
  FileText,
  Users,
  Droplets,
  HeartPulse,
  Utensils,
  Navigation,
  Lock,
  WifiOff,
  Gauge,
  Github,
  Phone,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResQConnect — Real-Time Disaster Dispatch & Volunteer Ops" },
      {
        name: "description",
        content:
          "ResQConnect coordinates disaster response teams, field volunteers, and supply hubs with live SOS dispatch, zero-collision task locking, and offline-first field tools.",
      },
      { property: "og:title", content: "ResQConnect — Real-Time Disaster Dispatch" },
      {
        property: "og:description",
        content:
          "Zero-latency coordination for boots on the ground: live SOS map, volunteer dispatch, and relief inventory tracking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Live SOS Map", to: "/map", icon: MapIcon },
  { label: "Volunteer Hub", to: "/volunteers", icon: Users },
  { label: "Inventory Tracker", to: "/inventory", icon: Boxes },
  { label: "Protocol Docs", to: "/protocols", icon: FileText },
];

const tickerItems = [
  "ACTIVE FLOOD ALERT: SECTOR 4 & 9",
  "OPEN DEMANDS: 24",
  "ACTIVE RESPONDERS: 87",
  "AVG RESPONSE LATENCY: 12.4 MINS",
  "SUPPLY HUBS ONLINE: 6 / 7",
];

const sosCards = [
  {
    id: "SOS-2291",
    level: "CRITICAL",
    need: "Clean Water",
    sector: "Sector 4",
    icon: Droplets,
    people: 120,
    distance: "1.2 km away",
    age: "00:41",
    tone: "critical" as const,
  },
  {
    id: "SOS-2288",
    level: "URGENT",
    need: "Medical Kits",
    sector: "Sector 9",
    icon: HeartPulse,
    people: 34,
    distance: "3.8 km away",
    age: "02:16",
    tone: "urgent" as const,
  },
  {
    id: "SOS-2284",
    level: "STANDARD",
    need: "Dry Rations",
    sector: "Sector 2",
    icon: Utensils,
    people: 210,
    distance: "6.4 km away",
    age: "08:03",
    tone: "standard" as const,
  },
];

const toneStyles: Record<string, string> = {
  critical: "border-primary/60 bg-primary/12 text-primary",
  urgent: "border-warn/50 bg-warn/12 text-warn",
  standard: "border-info/50 bg-info/12 text-info",
};

const metrics = [
  { value: "1,420+", label: "Meals & Rations Dispatched" },
  { value: "98.4%", label: "Collision-Free Task Claims" },
  { value: "< 15s", label: "PWA Offline Sync Time" },
  { value: "100%", label: "Open-Source & Community Driven" },
];

const capabilities = [
  {
    icon: Navigation,
    kicker: "01 / PRIORITY",
    title: "Dynamic Urgency Engine",
    body: "Visual priority scoring computed from criticality tiers (Medical > Water > Food) weighted against live volunteer GPS proximity and travel feasibility.",
    detail: ["MEDICAL ×3.0", "WATER ×2.1", "FOOD ×1.4"],
  },
  {
    icon: Lock,
    kicker: "02 / INTEGRITY",
    title: "Zero-Collision Task Locking",
    body: "Atomic WebSocket locks claim a relief drop the instant a volunteer accepts, preventing duplicate runs and wasted fuel across overlapping teams.",
    detail: ["LOCK ACQUIRED", "TTL 90s", "AUTO-RELEASE"],
  },
  {
    icon: WifiOff,
    kicker: "03 / RESILIENCE",
    title: "Offline-First Field Resilience",
    body: "Service workers and IndexedDB caching keep map routes, task queues, and manifests readable inside network dead zones, syncing on reconnect.",
    detail: ["SW CACHE", "IDB QUEUE", "DELTA SYNC"],
  },
];

function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-signal opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface">
              <Radar className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">ResQConnect</span>
            <span className="hidden items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-signal lg:inline-flex">
              <LiveDot />
              LIVE DISPATCH SYSTEM ACTIVE
            </span>
          </div>

          <nav className="mx-auto hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.to}
                className="rounded-md px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a
              href="/volunteers"
              className="hidden rounded-md border border-border bg-surface px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-secondary sm:inline-block"
            >
              Volunteer Portal
            </a>
            <Link
              to="/sos"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Siren className="h-4 w-4" />
              Report Emergency (SOS)
            </Link>
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div className="overflow-hidden border-b border-border bg-surface">
        <div className="flex w-max animate-ticker">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {tickerItems.map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="flex items-center gap-3 px-6 py-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground"
                >
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-40" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/25" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:py-24">
            <div>
              <span className="inline-block rounded border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
                [ CRISIS LOGISTICS &amp; RELIEF DISPATCH ]
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Zero-latency coordination for boots on the ground.
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                A synchronized dispatch platform connecting disaster response coordinators, field
                volunteers, and emergency supply hubs during acute crisis events.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/sos"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Siren className="h-4 w-4" />
                  Request Emergency Supplies (SOS)
                </Link>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <MapIcon className="h-4 w-4" />
                  Open Live Operations Map
                </Link>
              </div>
              <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <LiveDot /> UPTIME 99.98%
                </div>
                <div>NODES: 14 REGIONS</div>
                <div>LAST SYNC: 3s AGO</div>
              </dl>
            </div>

            {/* DISPATCH BOARD MOCKUP */}
            <div className="panel rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                  <LiveDot />
                  LIVE DISPATCH BOARD
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border border-b border-border font-mono text-[11px] text-muted-foreground">
                <div className="px-4 py-3">
                  QUEUE<span className="ml-2 text-foreground">24</span>
                </div>
                <div className="px-4 py-3">
                  CLAIMED<span className="ml-2 text-foreground">17</span>
                </div>
                <div className="px-4 py-3">
                  ETA AVG<span className="ml-2 text-foreground">12.4m</span>
                </div>
              </div>

              <div className="space-y-3 p-4">
                {sosCards.map((c) => (
                  <article
                    key={c.id}
                    className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-muted-foreground/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card">
                          <c.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div
                            className={`inline-flex rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] ${toneStyles[c.tone]}`}
                          >
                            [{c.level}: {c.need} | {c.sector}]
                          </div>
                          <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                            {c.id} · {c.people} affected · open {c.age}
                          </p>
                        </div>
                      </div>
                      <span className="whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                        {c.distance}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
                        <Gauge className="h-3.5 w-3.5" />
                        PRIORITY SCORE {c.tone === "critical" ? "9.4" : c.tone === "urgent" ? "7.8" : "4.2"}
                      </div>
                      <button
                        type="button"
                        className={
                          c.tone === "critical"
                            ? "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                            : "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                        }
                      >
                        Claim Task
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-border px-5 sm:divide-x lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="px-2 py-8 sm:px-8">
                <div className="text-3xl font-semibold tracking-tight lg:text-4xl">{m.value}</div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
                  [ CORE CAPABILITIES ]
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Built for the first 72 hours.
                </h2>
              </div>
              <a
                href="/protocols"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
              >
                READ PROTOCOL DOCS <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {capabilities.map((c) => (
                <article key={c.title} className="panel flex flex-col rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface">
                      <c.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                      {c.kicker}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
                    {c.detail.map((d) => (
                      <span
                        key={d}
                        className="rounded border border-border bg-surface px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface">
              <Radar className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight">ResQConnect</span>
            <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
              BUILT FOR OMNIKON NATIONAL HACKATHON 2026
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-5 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
            <a
              href="https://github.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> GITHUB REPO
            </a>
            <a href="tel:112" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Phone className="h-3.5 w-3.5" /> DISASTER HOTLINE 112
            </a>
            <a href="/status" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Activity className="h-3.5 w-3.5" /> SYSTEM STATUS
              <LiveDot className="ml-1" />
            </a>
          </nav>
        </div>
        <p className="mt-8 border-t border-border pt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
          © 2026 RESQCONNECT · OPEN-SOURCE CRISIS INFRASTRUCTURE · NOT A SUBSTITUTE FOR OFFICIAL
          EMERGENCY SERVICES
        </p>
      </footer>
    </div>
  );
}
