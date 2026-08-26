import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Siren,
  ArrowLeft,
  MapPin,
  Minus,
  Plus,
  HeartPulse,
  Droplets,
  Utensils,
  LifeBuoy,
  Tent,
  CheckCircle2,
  ArrowRight,
  Radar,
} from "lucide-react";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "Emergency Intake Console (SOS) — ResQConnect" },
      {
        name: "description",
        content:
          "File an emergency supply or rescue request with ResQConnect dispatch. Requests are prioritized by criticality and volunteer proximity.",
      },
      { property: "og:title", content: "Emergency Intake Console (SOS) — ResQConnect" },
      {
        property: "og:description",
        content: "File an emergency supply or rescue request with ResQConnect dispatch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SOSPage,
});

const categories = [
  { id: "medical", label: "Medical Kits", icon: HeartPulse },
  { id: "water", label: "Drinking Water", icon: Droplets },
  { id: "food", label: "Food Rations", icon: Utensils },
  { id: "rescue", label: "Rescue Evacuation", icon: LifeBuoy },
  { id: "shelter", label: "Shelter Kits", icon: Tent },
];

const urgencies = [
  { id: "critical", label: "CRITICAL", sub: "Danger / Trapped", tone: "text-primary border-primary/60 bg-primary/12" },
  { id: "high", label: "HIGH", sub: "Supplies Out", tone: "text-warn border-warn/50 bg-warn/12" },
  { id: "moderate", label: "MODERATE", sub: "24h Reserve", tone: "text-info border-info/50 bg-info/12" },
];

function SOSPage() {
  const [gps, setGps] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [picked, setPicked] = useState<string[]>(["water"]);
  const [count, setCount] = useState(12);
  const [urgency, setUrgency] = useState("critical");
  const [ticket, setTicket] = useState<string | null>(null);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const detect = () => {
    setLocating(true);
    setTimeout(() => {
      setGps("13.0418° N, 80.2341° E");
      setLocating(false);
    }, 900);
  };

  const broadcast = () => {
    setTicket(`SOS-${2400 + Math.floor(Math.random() * 99)}`);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface">
              <Radar className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight">ResQConnect</span>
          </Link>
          <Link
            to="/map"
            className="ml-auto font-mono text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground"
          >
            LIVE MAP
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pb-24 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK TO DISPATCH
        </Link>

        {ticket && (
          <div className="panel mt-5 rounded-xl border-signal/40 p-5">
            <div className="flex items-center gap-2 text-signal">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-mono text-[11px] tracking-[0.14em]">SOS BROADCAST CONFIRMED</span>
            </div>
            <p className="mt-3 font-mono text-2xl font-semibold tracking-tight">{ticket}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your request is live in the dispatch queue. Nearest responders have been pinged.
            </p>
            <Link
              to="/map"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Track Incident on Live Map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="panel mt-5 rounded-xl p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <Siren className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Emergency Intake Console
            </h1>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            For immediate life-threatening emergencies also call official services on 112.
          </p>

          {/* GPS */}
          <section className="mt-7">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              01 / LOCATION LOCK
            </h2>
            <button
              type="button"
              onClick={detect}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <MapPin className="h-4 w-4" />
              {locating ? "Acquiring satellites…" : "Detect My GPS Location"}
            </button>
            {gps && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-signal/40 bg-signal/10 px-3 py-2 font-mono text-[11px] tracking-[0.08em] text-signal">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-signal opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                GPS LOCKED · {gps}
              </div>
            )}
          </section>

          {/* Categories */}
          <section className="mt-8">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              02 / SUPPLIES REQUIRED
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => {
                const on = picked.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(c.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] transition-colors ${
                      on
                        ? "border-primary/60 bg-primary/12 text-primary"
                        : "border-border bg-surface text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <c.icon className="h-3.5 w-3.5" />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Headcount */}
          <section className="mt-8">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              03 / AFFECTED HEADCOUNT
            </h2>
            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                aria-label="Decrease affected count"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface transition-colors hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="min-w-20 text-center font-mono text-3xl font-semibold tracking-tight">
                {count}
              </div>
              <button
                type="button"
                aria-label="Increase affected count"
                onClick={() => setCount((c) => c + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface transition-colors hover:bg-secondary"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                PEOPLE AT SITE
              </span>
            </div>
          </section>

          {/* Urgency */}
          <section className="mt-8">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              04 / URGENCY LEVEL
            </h2>
            <div className="mt-3 grid gap-2">
              {urgencies.map((u) => (
                <label
                  key={u.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                    urgency === u.id ? u.tone : "border-border bg-surface text-muted-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    className="sr-only"
                    checked={urgency === u.id}
                    onChange={() => setUrgency(u.id)}
                  />
                  <span
                    className={`h-3 w-3 rounded-full border ${
                      urgency === u.id ? "border-current bg-current" : "border-muted-foreground"
                    }`}
                  />
                  <span className="font-mono text-[12px] tracking-[0.08em]">[{u.label}]</span>
                  <span className="text-[13px]">{u.sub}</span>
                </label>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={broadcast}
            className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-4 font-mono text-sm font-semibold tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Siren className="h-4 w-4" />
            BROADCAST SOS
          </button>
        </div>
      </div>
    </div>
  );
}
