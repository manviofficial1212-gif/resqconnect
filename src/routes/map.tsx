import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import {
  Radar,
  LayoutDashboard,
  ListFilter,
  CircleAlert,
  CircleDot,
  Truck,
  Lock,
} from "lucide-react";
import {
  INITIAL_INCIDENTS,
  MAP_ZONE_LABEL,
  type IncidentFilter,
} from "@/lib/incidents";

const CrisisMap = lazy(() => import("@/components/CrisisMap"));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Live Operations Map — ResQConnect" },
      {
        name: "description",
        content:
          "Live operations map of active SOS requests, responder positions, and supply hub status across affected sectors.",
      },
      { property: "og:title", content: "Live Operations Map — ResQConnect" },
      {
        property: "og:description",
        content: "Track active SOS requests, responders, and supply hubs in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPage,
});

const filters: { key: IncidentFilter; label: string; icon: typeof ListFilter }[] = [
  { key: "all", label: "All Incidents", icon: ListFilter },
  { key: "critical", label: "Critical Only", icon: CircleAlert },
  { key: "unassigned", label: "Unassigned", icon: CircleDot },
];

function MapFallback() {
  return (
    <div className="grid-backdrop flex h-full w-full items-center justify-center bg-background">
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-signal opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
        </span>
        ESTABLISHING SATELLITE UPLINK…
      </div>
    </div>
  );
}

function MapPage() {
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [filter, setFilter] = useState<IncidentFilter>("all");
  const [flash, setFlash] = useState<string | null>(null);

  const claim = (id: string) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "transit" as const, assigned: true, unit: "YOUR UNIT" } : i,
      ),
    );
    setFlash(id);
    window.setTimeout(() => setFlash(null), 4500);
  };

  const visible = useMemo(
    () =>
      incidents.filter((i) =>
        filter === "all" ? true : filter === "critical" ? i.status === "critical" : !i.assigned,
      ),
    [incidents, filter],
  );

  const counts = useMemo(
    () => ({
      all: incidents.length,
      critical: incidents.filter((i) => i.status === "critical").length,
      unassigned: incidents.filter((i) => !i.assigned).length,
    }),
    [incidents],
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-background font-sans text-foreground">
      {/* MAP LAYER */}
      <div className="absolute inset-0">
        <ClientOnly fallback={<MapFallback />}>
          <Suspense fallback={<MapFallback />}>
            <CrisisMap incidents={visible} onClaim={claim} />
          </Suspense>
        </ClientOnly>
      </div>

      {/* TOP BAR */}
      <header className="absolute inset-x-0 top-0 z-[1001] flex h-14 items-center gap-4 border-b border-border bg-background/85 px-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface">
            <Radar className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} />
          </div>
          <span className="text-sm font-semibold tracking-tight">ResQConnect</span>
          <span className="hidden font-mono text-[10px] tracking-[0.14em] text-muted-foreground sm:inline">
            / LIVE OPERATIONS MAP
          </span>
        </div>
        <span className="hidden items-center gap-2 rounded border border-border bg-surface px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {MAP_ZONE_LABEL}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-primary lg:inline-flex">
            {counts.critical} CRITICAL OPEN
          </span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <LayoutDashboard className="h-4 w-4" />
            Kanban Dispatch Board
          </Link>
        </div>
      </header>

      {/* FILTER PANEL */}
      <aside className="panel absolute left-4 top-[4.5rem] z-[1001] w-60 rounded-xl p-3">
        <div className="flex items-center justify-between px-1 pb-2">
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
            INCIDENT FILTERS
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {visible.length} VISIBLE
          </span>
        </div>
        <div className="space-y-1">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`flex w-full items-center gap-2.5 rounded-md border px-3 py-2 text-left text-[13px] transition-colors ${
                  active
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <f.icon className={`h-3.5 w-3.5 ${active ? "text-primary" : ""}`} />
                {f.label}
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {counts[f.key]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 space-y-1.5 border-t border-border px-1 pt-3 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" /> CRITICAL — MEDICAL / WATER
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" /> HIGH — RATIONS / SHELTER
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#3b82f6]" /> IN TRANSIT — UNIT ASSIGNED
          </div>
        </div>
      </aside>

      {/* CLAIM CONFIRMATION */}
      {flash && (
        <div className="absolute bottom-6 left-1/2 z-[1001] flex -translate-x-1/2 items-center gap-3 rounded-lg border border-signal/40 bg-surface px-4 py-3 shadow-panel">
          <Lock className="h-4 w-4 text-signal" />
          <div className="font-mono text-[11px] tracking-[0.1em] text-foreground">
            LOCK ACQUIRED — {flash} ASSIGNED TO YOUR UNIT
          </div>
          <Truck className="h-4 w-4 text-info" />
        </div>
      )}
    </div>
  );
}
