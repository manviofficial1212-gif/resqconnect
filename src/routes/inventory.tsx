import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Radar, Boxes, Search, Siren, LayoutDashboard, AlertTriangle, Warehouse, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory & Depot Tracker — ResQConnect" },
      {
        name: "description",
        content:
          "Live relief inventory across supply hubs: stock levels, low-stock alerts, and critical deficits by category and depot.",
      },
      { property: "og:title", content: "Inventory & Depot Tracker — ResQConnect" },
      {
        property: "og:description",
        content: "Track relief supplies, depot hubs, and critical deficits in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InventoryPage,
});

type Status = "adequate" | "low" | "critical";

interface Item {
  sku: string;
  name: string;
  category: string;
  stock: string;
  depot: string;
  status: Status;
}

const ITEMS: Item[] = [
  { sku: "MED-1120", name: "First Aid Trauma Kits", category: "Medical", stock: "1,240 units", depot: "HUB-01 · Anna Nagar", status: "adequate" },
  { sku: "MED-1145", name: "Insulin Cold Chain Boxes", category: "Medical", stock: "180 units", depot: "HUB-03 · Guindy", status: "low" },
  { sku: "WTR-2201", name: "20L Potable Water Cans", category: "Water", stock: "96 units", depot: "HUB-05 · Sector 9", status: "critical" },
  { sku: "WTR-2215", name: "Purification Tablet Strips", category: "Water", stock: "3,400 units", depot: "HUB-02 · Egmore", status: "adequate" },
  { sku: "RAT-3310", name: "MRE Ration Packs", category: "Rations", stock: "1,510 units", depot: "HUB-01 · Anna Nagar", status: "adequate" },
  { sku: "BOT-4402", name: "Inflatable Motor Boats", category: "Boats", stock: "9 units", depot: "HUB-04 · Adyar", status: "low" },
  { sku: "PWR-5501", name: "5kW Portable Generators", category: "Power", stock: "170 units", depot: "HUB-06 · Perambur", status: "adequate" },
];

const CATEGORIES = ["All", "Medical", "Water", "Rations", "Boats", "Power"];

const statusStyle: Record<Status, string> = {
  adequate: "border-signal/40 bg-signal/10 text-signal",
  low: "border-warn/45 bg-warn/10 text-warn",
  critical: "border-primary/50 bg-primary/12 text-primary",
};
const statusLabel: Record<Status, string> = {
  adequate: "ADEQUATE",
  low: "LOW STOCK",
  critical: "CRITICAL",
};

const metrics = [
  { icon: Warehouse, value: "6 / 7", label: "Active Supply Hubs Online" },
  { icon: PackageCheck, value: "6,605", label: "Total Supplies Indexed (Units)" },
  { icon: Boxes, value: "1", label: "Low Stock Alert Categories" },
  { icon: AlertTriangle, value: "1", label: "Critical Deficit · Sector 9 Water" },
];

function InventoryPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter(
      (i) =>
        (cat === "All" || i.category === cat) &&
        (q === "" ||
          i.name.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          i.depot.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl flex-wrap items-center gap-3 px-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface">
              <Radar className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">ResQConnect</span>
          </Link>
          <span className="hidden font-mono text-[10px] tracking-[0.14em] text-muted-foreground sm:inline">
            / INVENTORY &amp; DEPOT TRACKER
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/dispatch"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-secondary"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dispatch Board</span>
            </Link>
            <Link
              to="/sos"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Siren className="h-4 w-4" />
              <span className="hidden sm:inline">Report SOS</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Emergency Inventory &amp; Depot Tracker
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Real-time stock index across regional supply hubs. Deficits escalate automatically to the
          dispatch queue.
        </p>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="panel rounded-xl p-4">
              <m.icon className="h-4 w-4 text-primary" />
              <div className="mt-3 text-2xl font-semibold tracking-tight">{m.value}</div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </section>

        <section className="panel mt-8 rounded-xl">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search SKU, resource, or depot…"
                aria-label="Search inventory"
                className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] transition-colors ${
                    cat === c
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                  <th className="px-4 py-3 font-normal">SKU / ID</th>
                  <th className="px-4 py-3 font-normal">RESOURCE DESCRIPTION</th>
                  <th className="px-4 py-3 font-normal">CATEGORY</th>
                  <th className="px-4 py-3 font-normal">CURRENT STOCK</th>
                  <th className="px-4 py-3 font-normal">ASSIGNED DEPOT HUB</th>
                  <th className="px-4 py-3 font-normal">STOCK STATUS</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((i) => (
                  <tr key={i.sku} className="border-b border-border/70 last:border-0 hover:bg-secondary/40">
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{i.sku}</td>
                    <td className="px-4 py-3 text-sm">{i.name}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{i.category}</td>
                    <td className="px-4 py-3 font-mono text-[11px]">{i.stock}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{i.depot}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] ${statusStyle[i.status]}`}
                      >
                        {statusLabel[i.status]}
                      </span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center font-mono text-[11px] text-muted-foreground">
                      NO MATCHING RESOURCES INDEXED
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/dispatch"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <LayoutDashboard className="h-4 w-4" /> Back to Dispatch Board
          </Link>
          <Link
            to="/sos"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Siren className="h-4 w-4" /> Raise Supply SOS
          </Link>
        </div>
      </main>
    </div>
  );
}
