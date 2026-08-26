import { createFileRoute, Link } from "@tanstack/react-router";
import { Map as MapIcon, ArrowLeft } from "lucide-react";

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

function MapPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK TO DISPATCH
        </Link>
        <div className="panel mt-6 grid-backdrop rounded-xl p-8">
          <div className="flex items-center gap-3">
            <MapIcon className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">Live Operations Map</h1>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Sector overlays, responder telemetry, and offline route caching are being connected to
            this view.
          </p>
        </div>
      </div>
    </div>
  );
}
