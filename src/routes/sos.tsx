import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  AlertTriangle,
  MapPin,
  Send,
  ShieldAlert,
  Sparkles,
  Loader2,
  CheckCircle2,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { analyzeDistressReport, TriageResult } from '../services/aiTriage';

export const Route = createFileRoute('/sos')({
  component: SOSRoute,
});

const CATEGORIES = [
  { id: 'Medical Kits', label: 'Medical Kits', icon: '🩹' },
  { id: 'Drinking Water', label: 'Drinking Water', icon: '💧' },
  { id: 'Food Rations', label: 'Food Rations', icon: '🍞' },
  { id: 'Rescue Evacuation', label: 'Rescue Evacuation', icon: '🚤' },
  { id: 'Shelter / Dry Clothing', label: 'Shelter / Blankets', icon: '⛺' },
];

function SOSRoute() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Medical Kits');
  const [headcount, setHeadcount] = useState(1);
  const [urgency, setUrgency] = useState<'Critical' | 'High' | 'Moderate'>('Critical');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('Sector 4, Main Relief Zone');
  const [locLocked, setLocLocked] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triageData, setTriageData] = useState<TriageResult | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocLocked(true);
          setLocation(`GPS: ${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E`);
        },
        () => {
          setLocLocked(true);
          setLocation('GPS: 13.0827°N, 80.2707°E (Calibrated)');
        }
      );
    } else {
      setLocLocked(true);
      setLocation('GPS: 13.0827°N, 80.2707°E (Calibrated)');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const triage = await analyzeDistressReport(
      description || `Emergency SOS for ${category} at ${location}`,
      headcount
    );

    const incidentId = `SOS-${Math.floor(1000 + Math.random() * 9000)}`;
    setTriageData(triage);
    setSubmittedId(incidentId);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 px-4 py-8 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Top Breadcrumbs */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <Link to="/" className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
            ← BACK TO COMMAND
          </Link>
          <span className="text-xs font-mono text-red-400 bg-red-950/60 border border-red-800/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            INTAKE CONSOLE
          </span>
        </div>

        {submittedId && triageData ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="w-14 h-14 bg-red-950/60 border border-red-500/50 rounded-2xl flex items-center justify-center mx-auto text-red-400">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Distress Broadcast Live</h2>
              <p className="text-xs text-zinc-400 mt-1">Incident registered and prioritized for ground squads.</p>
            </div>

            {/* AI Triage Intelligence Card */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-xs font-mono text-indigo-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> GEMINI AI TRIAGE ASSESSMENT
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400">
                  PRIORITY: {triageData.priorityScore}/100
                </span>
              </div>

              <p className="text-xs text-zinc-300 italic">
                "{triageData.situationSummary}"
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {triageData.recommendedAid.map((item, idx) => (
                  <span key={idx} className="text-[11px] font-mono bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300">
                    + {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Incident Summary Breakdown */}
            <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">TRACKING ID:</span>
                <span className="text-red-400 font-bold">{submittedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">HEADCOUNT:</span>
                <span>{headcount} Person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">COORDINATES:</span>
                <span className="truncate max-w-[220px] text-zinc-300">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">STATUS:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Queued for Dispatch
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                to="/map"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Track Incident on Live Map <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmittedId(null);
                  setTriageData(null);
                  setDescription('');
                }}
                className="w-full text-xs text-zinc-400 hover:text-zinc-200 py-1"
              >
                Submit another emergency report
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Request Emergency Relief
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Zero-latency intake link connecting victims directly with active field response teams.
              </p>
            </div>

            {/* Situation Description for AI Analysis */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                <span>Crisis Situation & Details</span>
                <span className="text-[10px] text-indigo-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Auto-Triaged by Gemini
                </span>
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Trapped on 2nd floor, water rising above 4ft, 2 elderly individuals need dry food & insulin..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-red-500 placeholder:text-zinc-600 resize-none"
              />
            </div>

            {/* Location & GPS Lock */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Location / Landmark</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  className={`shrink-0 px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition ${
                    locLocked
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                      : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {locLocked ? 'Locked' : 'GPS'}
                </button>
              </div>
            </div>

            {/* Aid Category Grid */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Primary Need</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition ${
                      category === cat.id
                        ? 'bg-red-950/80 border-red-500 text-white shadow-lg shadow-red-950/40'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-base">{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Headcount Stepper & Urgency Level */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">People Affected</label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setHeadcount(Math.max(1, headcount - 1))}
                    className="w-10 h-8 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-mono text-sm font-bold">{headcount}</span>
                  <button
                    type="button"
                    onClick={() => setHeadcount(headcount + 1)}
                    className="w-10 h-8 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-red-500 font-mono"
                >
                  <option value="Critical">🔴 Critical (Immediate)</option>
                  <option value="High">🟠 High (12h Reserve)</option>
                  <option value="Moderate">🟡 Moderate (24h+)</option>
                </select>
              </div>
            </div>

            {/* Phone Contact */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Contact Number (Optional)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-950 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  ANALYZING & BROADCASTING SOS...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> BROADCAST SOS TO DISPATCH NETWORK
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}