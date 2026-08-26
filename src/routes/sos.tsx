import { createFileRoute, Link } from "@tanstack/react-router";
import { Siren, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "Report Emergency (SOS) — ResQConnect" },
      {
        name: "description",
        content:
          "File an emergency supply or rescue request with ResQConnect dispatch. Requests are prioritized by criticality and volunteer proximity.",
      },
      { property: "og:title", content: "Report Emergency (SOS) — ResQConnect" },
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

function SOSPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto max-w-2xl px-5 py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK TO DISPATCH
        </Link>
        <div className="panel mt-6 rounded-xl p-8">
          <div className="flex items-center gap-3">
            <Siren className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">Emergency Request Intake</h1>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The intake form is being wired to the live dispatch queue. For immediate life-threatening
            emergencies, contact official services on 112.
          </p>
        </div>
      </div>
    </div>
  );
}
