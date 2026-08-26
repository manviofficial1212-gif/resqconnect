import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MAP_CENTER,
  formatElapsed,
  statusLine,
  type Incident,
} from "@/lib/incidents";

function markerIcon(i: Incident): L.DivIcon {
  return L.divIcon({
    className: "rq-marker-wrap",
    html: `<div class="rq-marker rq-marker--${i.status}"><span class="rq-marker__pulse"></span><span class="rq-marker__dot"></span></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -14],
  });
}

function popupHtml(i: Incident): string {
  const action = i.assigned
    ? `<div class="rq-pop__assigned">TASK LOCKED — ${i.unit ?? "UNIT"} EN ROUTE</div>`
    : `<button type="button" class="rq-claim" data-claim="${i.id}">CLAIM &amp; DISPATCH</button>`;
  return `
    <div class="rq-pop">
      <div class="rq-pop__top">
        <span class="rq-tag rq-tag--${i.status}">${statusLine(i)}</span>
        <span class="rq-pop__id">${i.id}</span>
      </div>
      <div class="rq-pop__rows">
        <div><span>LOCATION</span><b>${i.location}</b></div>
        <div><span>HEADCOUNT</span><b>${i.headcount} PAX</b></div>
        <div><span>NEEDED SUPPLIES</span><b>${i.supplies}</b></div>
        <div><span>TIME ELAPSED</span><b>${formatElapsed(i.elapsedMin)} HRS</b></div>
      </div>
      ${action}
    </div>`;
}

export default function CrisisMap({
  incidents,
  onClaim,
}: {
  incidents: Incident[];
  onClaim: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const onClaimRef = useRef(onClaim);
  onClaimRef.current = onClaim;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: MAP_CENTER,
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: true,
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      },
    ).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const markers = markersRef.current;
    const seen = new Set<string>();

    for (const incident of incidents) {
      seen.add(incident.id);
      const existing = markers.get(incident.id);
      if (existing) {
        existing.setIcon(markerIcon(incident));
        existing.setPopupContent(popupHtml(incident));
        continue;
      }
      const marker = L.marker([incident.lat, incident.lng], {
        icon: markerIcon(incident),
        title: incident.id,
      }).bindPopup(popupHtml(incident), {
        className: "rq-popup",
        closeButton: false,
        minWidth: 260,
        maxWidth: 300,
      });
      marker.on("popupopen", () => {
        const btn = marker
          .getPopup()
          ?.getElement()
          ?.querySelector<HTMLButtonElement>("[data-claim]");
        btn?.addEventListener("click", () => {
          onClaimRef.current(incident.id);
          map.closePopup();
        });
      });
      marker.addTo(map);
      markers.set(incident.id, marker);
    }

    markers.forEach((marker, id) => {
      if (!seen.has(id)) {
        marker.remove();
        markers.delete(id);
      }
    });
  }, [incidents]);

  return <div ref={containerRef} className="h-full w-full" />;
}
