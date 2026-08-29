import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, Brain, Lock, ShieldAlert, LayoutDashboard, Map as MapIcon } from "lucide-react";

export const Route = createFileRoute("/protocols")({
  head: () => ({
    meta: [
      { title: "Response Protocols & SOPs — ResQConnect" },
      {
        name: "description",
        content:
          "Standard operating procedures for ResQConnect: AI triage scoring rubric, the 4-stage volunteer task-locking lifecycle, and ground safety guidelines.",
      },
      { property: "og:title", content: "Response Protocols & SOPs — ResQConnect" },
      {
        property: "og:description",
        content: "Triage scoring, task-locking lifecycle, and field safety rules for responders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProtocolsPage,
});

const tiers = [
  {
    band: "CRITICAL",
    range: "8.5 – 10.0",
    tone: "border-primary/50 bg-primary/12 text-primary",
    body: "Life-threatening: medical emergencies, drowning risk, zero potable water beyond 12 hours, stranded infants or elderly. Auto-broadcast to all responders within 5 km.",
  },
  {
    band: "URGENT",
    range: "5.0 – 8.4",
    tone: "border-warn/50 bg-warn/12 text-warn",
    body: "Deteriorating: depleted rations, shelter breach, medication refills, sanitation failure. Queued to the nearest available unit with a 30-minute claim window.",
  },
  {
    band: "STANDARD RELIEF",
    range: "1.0 – 4.9",
    tone: "border-info/50 bg-info/12 text-info",
    body: "Stable but unmet: blankets, clothing, restock of non-critical goods, welfare checks. Batched into scheduled depot runs.",
  },
];

const stages = [
  {
    n: "STAGE 1",
    title: "Open Demands",
    body: "Verified SOS intakes enter the public queue with a computed urgency score, headcount, and GPS coordinates. Duplicate intakes within 150 m and 10 minutes are merged automatically.",
  },
  {
    n: "STAGE 2",
    title: "Claimed & En Route",
    body: "Claiming acquires an atomic lock on the task, so only one volunteer can ever hold it. The lock is exclusive for the trip duration and auto-releases on timeout or manual abandon, returning the task to Stage 1 with its original urgency preserved.",
  },
  {
    n: "STAGE 3",
    title: "Delivered / Pending Proof",
    body: "The volunteer marks the drop complete and uploads proof — a geotagged photo and recipient headcount. The task stays locked until a coordinator reviews it.",
  },
  {
    n: "STAGE 4",
    title: "Verified & Resolved",
    body: "A coordinator confirms the proof, decrements depot inventory, and closes the incident. Rejected proofs return the card to Stage 2 with the same volunteer assigned.",
  },
];

const safety = [
  {
    title: "Never enter moving floodwater",
    body: "Six inches of moving water can knock an adult down. Do not wade, swim, or drive through it — reroute and report the blockage to dispatch.",
  },
  {
    title: "Two-person minimum on every run",
    body: "No solo deployments into affected sectors. Log your unit pairing before departure and check in every 30 minutes.",
  },
  {
    title: "Treat all downed lines as live",
    body: "Maintain a 10-metre radius from fallen power lines and submerged electrical equipment. Escalate to the utility desk, not to volunteers.",
  },
  {
    title: "PPE is not optional",
    body: "Gloves, closed boots, and N95 masks on every drop. Waterborne pathogens and debris injuries are the leading volunteer casualty causes.",
  },
  {
    title: "Do not attempt technical rescue",
    body: "Roof extractions, confined-space entries, and swiftwater rescue belong to trained services. Mark the location as CRITICAL and hold position.",
  },
  {
    title: "Handover, then stand down",
    body: "Close your task in the app before leaving the field so the queue reflects ground truth. Fatigue causes errors — cap shifts at eight hours.",
  },
];

function ProtocolsPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface">
              <Radar className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">ResQConnect</span>
          </Link>
          <span className="hidden font-mono text-[10px] tracking-[0.14em] text-muted-foreground sm:inline">
            / PROTOCOL DOCS
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/map"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-secondary"
            >
              <MapIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Live Map</span>
            </Link>
            <Link
              to="/dispatch"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-secondary"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dispatch</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <span className="inline-block rounded border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
          [ STANDARD OPERATING PROCEDURES · REV 2026.03 ]
        </span>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          Emergency Response Protocols
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          The rules that govern triage scoring, task ownership, and field conduct across every
          ResQConnect deployment.
        </p>

        {/* SECTION 1 */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                SECTION 01
              </span>
              <h2 className="text-xl font-semibold tracking-tight">Automated AI Triage Matrix</h2>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Every intake is scored by Google Gemini 2.5 Flash against a 1–100 internal confidence
            scale, normalised to a 1.0–10.0 urgency value shown to responders. Inputs: reported need
            type, headcount, vulnerable persons present, time elapsed since intake, sector flood
            depth, and depot distance. Scores recompute every 10 minutes so untouched requests
            escalate on their own.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {tiers.map((t) => (
              <article key={t.band} className="panel rounded-xl p-5">
                <div className={`inline-flex rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] ${t.tone}`}>
                  {t.band}
                </div>
                <div className="mt-4 font-mono text-2xl font-semibold tracking-tight">{t.range}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface">
              <Lock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                SECTION 02
              </span>
              <h2 className="text-xl font-semibold tracking-tight">
                4-Stage Volunteer Task Locking Protocol
              </h2>
            </div>
          </div>
          <ol className="mt-6 space-y-3">
            {stages.map((s) => (
              <li key={s.n} className="panel rounded-xl p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                    {s.n}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
          <Link
            to="/dispatch"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <LayoutDashboard className="h-4 w-4" /> View the live Kanban board
          </Link>
        </section>

        {/* SECTION 3 */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface">
              <ShieldAlert className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                SECTION 03
              </span>
              <h2 className="text-xl font-semibold tracking-tight">
                Ground Safety Guidelines for Rescue Volunteers
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {safety.map((s) => (
              <article key={s.title} className="panel rounded-xl p-5">
                <h3 className="text-[15px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-14 border-t border-border pt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
          THESE SOPS SUPPLEMENT — NEVER REPLACE — DIRECTIVES ISSUED BY OFFICIAL EMERGENCY SERVICES.
        </p>
      </main>
    </div>
  );
}
