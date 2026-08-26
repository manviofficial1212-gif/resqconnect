export type IncidentStatus = "critical" | "high" | "transit";
export type IncidentFilter = "all" | "critical" | "unassigned";

export interface Incident {
  id: string;
  status: IncidentStatus;
  tag: string;
  location: string;
  lat: number;
  lng: number;
  headcount: number;
  supplies: string;
  elapsedMin: number;
  assigned: boolean;
  unit?: string;
}

/** Simulated flood crisis zone: Chennai, Sector Grid 12 */
export const MAP_CENTER: [number, number] = [13.04, 80.24];
export const MAP_ZONE_LABEL = "CHENNAI FLOOD ZONE · SECTOR GRID 12";

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: "SOS-2291",
    status: "critical",
    tag: "MEDICAL",
    location: "T. Nagar Relief Camp",
    lat: 13.0418,
    lng: 80.2341,
    headcount: 120,
    supplies: "Insulin, trauma kits, ORS ×120",
    elapsedMin: 41,
    assigned: false,
  },
  {
    id: "SOS-2290",
    status: "critical",
    tag: "WATER",
    location: "Adyar Riverbank Settlement",
    lat: 13.0067,
    lng: 80.2572,
    headcount: 85,
    supplies: "200L potable water, purification tabs",
    elapsedMin: 55,
    assigned: false,
  },
  {
    id: "SOS-2286",
    status: "critical",
    tag: "MEDICAL",
    location: "Saidapet Bridge Shelter",
    lat: 13.0213,
    lng: 80.2231,
    headcount: 34,
    supplies: "Stretchers ×4, oxygen concentrator",
    elapsedMin: 18,
    assigned: false,
  },
  {
    id: "SOS-2275",
    status: "critical",
    tag: "WATER",
    location: "Mylapore Tank Ward",
    lat: 13.0368,
    lng: 80.2676,
    headcount: 140,
    supplies: "500L water, jerrycans ×60",
    elapsedMin: 12,
    assigned: false,
  },
  {
    id: "SOS-2288",
    status: "high",
    tag: "RATIONS",
    location: "Velachery Housing Board",
    lat: 12.9791,
    lng: 80.2209,
    headcount: 210,
    supplies: "Dry rations ×210, baby formula",
    elapsedMin: 136,
    assigned: false,
  },
  {
    id: "SOS-2284",
    status: "high",
    tag: "RATIONS",
    location: "Perambur Rail Colony",
    lat: 13.1211,
    lng: 80.233,
    headcount: 160,
    supplies: "Rice sacks ×40, cooking oil ×20L",
    elapsedMin: 190,
    assigned: false,
  },
  {
    id: "SOS-2278",
    status: "high",
    tag: "SHELTER",
    location: "Royapettah Lowlands",
    lat: 13.0535,
    lng: 80.2644,
    headcount: 90,
    supplies: "Tarpaulin ×30, blankets ×90",
    elapsedMin: 240,
    assigned: false,
  },
  {
    id: "SOS-2282",
    status: "transit",
    tag: "WATER + RATIONS",
    location: "Guindy Industrial Estate",
    lat: 13.0067,
    lng: 80.2206,
    headcount: 45,
    supplies: "Water 100L, rations ×45",
    elapsedMin: 95,
    assigned: true,
    unit: "UNIT K-7",
  },
  {
    id: "SOS-2280",
    status: "transit",
    tag: "MEDICAL",
    location: "Kotturpuram Embankment",
    lat: 13.0176,
    lng: 80.2396,
    headcount: 60,
    supplies: "Med kits ×12, tarpaulin ×10",
    elapsedMin: 150,
    assigned: true,
    unit: "UNIT C-2",
  },
  {
    id: "SOS-2271",
    status: "transit",
    tag: "RATIONS",
    location: "Egmore Station Shelter",
    lat: 13.0732,
    lng: 80.2609,
    headcount: 75,
    supplies: "Rations ×75, med kits ×6",
    elapsedMin: 300,
    assigned: true,
    unit: "UNIT A-4",
  },
];

export function formatElapsed(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function statusLine(i: Incident): string {
  if (i.status === "critical") return `[CRITICAL: ${i.tag}]`;
  if (i.status === "high") return `[HIGH: ${i.tag}]`;
  return `[IN TRANSIT: ${i.tag}]`;
}
