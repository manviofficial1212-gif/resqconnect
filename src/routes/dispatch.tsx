import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, Map as MapIcon, Lock, ArrowRight, CheckCircle2, Package } from "lucide-react";

export const Route = createFileRoute("/dispatch")({
  head: () => ({
    meta: [
      { title: "Volunteer Kanban Operations Hub — ResQConnect" },
      {
        name: "description",
        content:
          "Claim, lock and track relief tasks across open demands, en-route dispatch, delivery proof and verified resolutions.",
      },
      { property: "og:title", content: "Volunteer Kanban Operations Hub — ResQConnect" },
      {
        property: "og:description",
        content: "Claim and track relief tasks across the ResQConnect dispatch workflow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DispatchPage,
});

type Stage = "open" | "enroute" | "proof" | "verified";
type Priority = "critical" | "high" | "moderate";

interface Task {
  id: string;
  priority: Priority;
  items: string;
  distanceKm: number;
  score: number;
  stage: Stage;
  unit?: string;
}

const COLUMNS: { id: Stage; title: string; hint: string }[] = [
  { id: "open", title: "Open Demands", hint: "UNCLAIMED SOS CALLS" },
  { id: "enroute", title: "Claimed & En Route", hint: "VOLUNTEERS DISPATCHED" },
  { id: "proof", title: "Delivered / Pending Proof", hint: "AWAITING DROP VERIFICATION" },
  { id: "verified", title: "Verified & Resolved", hint: "CLOSED THIS CYCLE" },
];

const PRIORITY_STYLE: Record<Priority, string> = {
  critical: "border-primary/60 bg-primary/12 text-primary",
  high: "border-warn/50 bg-warn/12 text-warn",
  moderate: "border-info/50 bg-info/12 text-info",
};

const INITIAL: Task[] = [
  { id: "SOS-2291", priority: "critical", items: "Insulin, trauma kits, ORS ×120", distanceKm: 1.2, score: 9.4, stage: "open" },
  { id: "SOS-2290", priority: "critical", items: "200L potable water, purification tabs", distanceKm: 2.6, score: 9.1, stage: "open" },
  { id: "SOS-2288", priority: "high", items: "Dry rations ×210, baby formula", distanceKm: 3.8, score: 7.8, stage: "open" },
  { id: "SOS-2284", priority: "high", items: "Rice sacks ×40, cooking oil ×20L", distanceKm: 6.4, score: 7.1, stage: "open" },
  { id: "SOS-2278", priority: "moderate", items: "Tarpaulin ×30, blankets ×90", distanceKm: 8.1, score: 4.2, stage: "open" },
  { id: "SOS-2282", priority: "high", items: "Water 100L, rations ×45", distanceKm: 2.1, score: 7.4, stage: "enroute", unit: "UNIT K-7" },
  { id: "SOS-2280", priority: "critical", items: "Med kits ×12, tarpaulin ×10", distanceKm: 4.4, score: 8.9, stage: "enroute", unit: "UNIT C-2" },
  { id: "SOS-2271", priority: "moderate", items: "Rations ×75, med kits ×6", distanceKm: 5.9, score: 3.8, stage: "proof", unit: "UNIT A-4" },
  { id: "SOS-2264", priority: "high", items: "Water 300L, ORS ×80", distanceKm: 7.2, score: 6.6, stage: "proof", unit: "UNIT B-1" },
  { id: "SOS-2251", priority: "critical", items: "Oxygen concentrator ×2", distanceKm: 3.1, score: 9.6, stage: "verified", unit: "UNIT D-9" },
  { id: "SOS-2248", priority: "moderate", items: "Blankets ×120", distanceKm: 9.5, score: 3.1, stage: "verified", unit: "UNIT K-7" },
];

const NEXT: Record<Stage, Stage | null> = {
  open: "enroute",
  enroute: "proof",
  proof: "verified",
  verified: null,
};

const ACTION: Record<Stage, string> = {
  open: "Claim & Lock Task",
  enroute: "Mark Delivered",
  proof: "Verify Drop",
  verified: "Resolved",
};

function DispatchPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL);
  const [filter, setFilter] = useState<"all" | Priority>("all");
  const [dragId, setDragId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? tasks : tasks.filter((t) => t.priority === filter)),
    [tasks, filter],
  );

  const move = (id: string, stage: Stage) =>
    setTasks((all) =>
      all.map((t) =>
        t.id === id
          ? { ...t, stage, unit: t.unit ?? `UNIT ${String.fromCharCode(65 + (id.charCodeAt(6) % 20))}-${id.slice(-1)}` }
          : t,
      ),
    );

  const advance = (t: Task) => {
    const next = NEXT[t.stage];
    if (next) move(t.id, next);
  };

  const filters: { id: "all" | Priority; label: string }[] = [
    { id: "all", label: "ALL" },
    { id: "critical", label: "CRITICAL" },
    { id: "high", label: "HIGH" },
    { id: "moderate", label: "MODERATE" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface">
              <Radar className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight">ResQConnect</span>
          </Link>
          <span className="hidden font-mono text-[11px] tracking-[0.12em] text-muted-foreground sm:inline">
            / VOLUNTEER OPS HUB
          </span>

          <div className="ml-auto flex items-center gap-1 rounded-md border border-border bg-surface p-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] transition-colors ${
                  filter === f.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <Link
            to="/map"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-[13px] font-medium transition-colors hover:bg-secondary"
          >
            <MapIcon className="h-4 w-4" /> Live SOS Map
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-5 py-6">
        <h1 className="sr-only">Volunteer Kanban Operations Hub</h1>
        <div className="grid gap-4 lg:grid-cols-4">
          {COLUMNS.map((col) => {
            const items = visible.filter((t) => t.stage === col.id);
            return (
              <section
                key={col.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragId) move(dragId, col.id);
                  setDragId(null);
                }}
                className="panel flex flex-col rounded-xl"
              >
                <div className="border-b border-border px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[13px] font-semibold tracking-tight">{col.title}</h2>
                    <span className="font-mono text-[11px] text-muted-foreground">{items.length}</span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    {col.hint}
                  </p>
                </div>
                <div className="flex-1 space-y-3 p-3">
                  {items.length === 0 && (
                    <p className="rounded-md border border-dashed border-border px-3 py-6 text-center font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                      NO TASKS
                    </p>
                  )}
                  {items.map((t) => (
                    <article
                      key={t.id}
                      draggable
                      onDragStart={() => setDragId(t.id)}
                      onDragEnd={() => setDragId(null)}
                      className="cursor-grab rounded-lg border border-border bg-surface p-3.5 transition-colors hover:border-muted-foreground/40 active:cursor-grabbing"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                        <span
                          className={`rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.08em] ${PRIORITY_STYLE[t.priority]}`}
                        >
                          {t.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-2 flex items-start gap-2 text-[13px] leading-snug">
                        <Package className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        {t.items}
                      </p>
                      <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
                        <span>{t.distanceKm.toFixed(1)} km away</span>
                        <span>SCORE {t.score.toFixed(1)}</span>
                      </div>
                      {t.unit && (
                        <p className="mt-1 font-mono text-[10px] tracking-[0.08em] text-signal">
                          {t.unit}
                        </p>
                      )}
                      {t.stage !== "verified" ? (
                        <button
                          type="button"
                          onClick={() => advance(t)}
                          className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-90 ${
                            t.stage === "open"
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-card text-foreground"
                          }`}
                        >
                          {t.stage === "open" ? (
                            <Lock className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5" />
                          )}
                          {ACTION[t.stage]}
                        </button>
                      ) : (
                        <div className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-signal/40 bg-signal/10 px-3 py-2 font-mono text-[10px] tracking-[0.1em] text-signal">
                          <CheckCircle2 className="h-3.5 w-3.5" /> VERIFIED
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
