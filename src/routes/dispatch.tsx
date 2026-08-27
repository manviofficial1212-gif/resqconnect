import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Kanban,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Truck,
  ShieldAlert,
  ArrowRight,
  Filter,
  Check,
  ChevronRight,
  Map as MapIcon,
} from 'lucide-react';

export const Route = createFileRoute('/dispatch')({
  component: DispatchRoute,
});

type CardStatus = 'open' | 'en_route' | 'delivered' | 'verified';

interface TaskCard {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  location: string;
  distance: string;
  headcount: number;
  priority: 'Critical' | 'High' | 'Moderate';
  status: CardStatus;
  assignee?: string;
  timeAgo: string;
}

const INITIAL_TASKS: TaskCard[] = [
  {
    id: 'SOS-8412',
    title: 'Elderly trapped on 2nd floor, rising water',
    category: 'Rescue Evacuation',
    categoryIcon: '🚤',
    location: 'Sector 4, North Bund',
    distance: '1.2 km away',
    headcount: 4,
    priority: 'Critical',
    status: 'open',
    timeAgo: '4m ago',
  },
  {
    id: 'SOS-7104',
    title: 'Clean drinking water & infant formula needed',
    category: 'Drinking Water',
    categoryIcon: '💧',
    location: 'Community Center, Ward 12',
    distance: '2.8 km away',
    headcount: 12,
    priority: 'High',
    status: 'open',
    timeAgo: '11m ago',
  },
  {
    id: 'SOS-6291',
    title: 'First aid kits & insulin supplies',
    category: 'Medical Kits',
    categoryIcon: '🩹',
    location: 'Bridge Junction, Block B',
    distance: '0.8 km away',
    headcount: 2,
    priority: 'Critical',
    status: 'en_route',
    assignee: 'Squad 3 (Boat Unit)',
    timeAgo: '22m ago',
  },
  {
    id: 'SOS-5140',
    title: 'Emergency rations & dry blankets drop',
    category: 'Food Rations',
    categoryIcon: '🍞',
    location: 'Shelter Base 2',
    distance: '3.4 km away',
    headcount: 25,
    priority: 'Moderate',
    status: 'delivered',
    assignee: 'Rapid Volunteer Team A',
    timeAgo: '45m ago',
  },
  {
    id: 'SOS-4902',
    title: 'Generator fuel & solar charging bank',
    category: 'Power Supply',
    categoryIcon: '⚡',
    location: 'Sector 9 Primary Clinic',
    distance: '4.1 km away',
    headcount: 50,
    priority: 'High',
    status: 'verified',
    assignee: 'Civil Defense Core',
    timeAgo: '1h 10m ago',
  },
];

const COLUMNS: { id: CardStatus; title: string; subtitle: string; color: string; badgeBg: string }[] = [
  { id: 'open', title: 'Open Demands', subtitle: 'Unassigned live SOS calls', color: 'border-red-500/40 text-red-400', badgeBg: 'bg-red-950/60 border-red-800 text-red-400' },
  { id: 'en_route', title: 'Claimed & En Route', subtitle: 'Assigned to field squads', color: 'border-amber-500/40 text-amber-400', badgeBg: 'bg-amber-950/60 border-amber-800 text-amber-400' },
  { id: 'delivered', title: 'Delivered / Pending Proof', subtitle: 'Awaiting drop verification', color: 'border-blue-500/40 text-blue-400', badgeBg: 'bg-blue-950/60 border-blue-800 text-blue-400' },
  { id: 'verified', title: 'Verified & Resolved', subtitle: 'Mission accomplished', color: 'border-emerald-500/40 text-emerald-400', badgeBg: 'bg-emerald-950/60 border-emerald-800 text-emerald-400' },
];

function DispatchRoute() {
  const [tasks, setTasks] = useState<TaskCard[]>(INITIAL_TASKS);
  const [filterPriority, setFilterPriority] = useState<string>('All');

  const advanceTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        if (t.status === 'open') return { ...t, status: 'en_route', assignee: 'Volunteer You (Claimed)' };
        if (t.status === 'en_route') return { ...t, status: 'delivered' };
        if (t.status === 'delivered') return { ...t, status: 'verified' };
        return t;
      })
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterPriority === 'All') return true;
    return t.priority === filterPriority;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col">
      {/* Top Header Bar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur px-5 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Volunteer Dispatch Board
                <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                  LIVE SYNC
                </span>
              </h1>
              <p className="text-xs text-zinc-400">4-Stage zero-collision coordination hub for boots on the ground.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Priority Filter */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1 gap-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-zinc-500 mr-1" />
              {['All', 'Critical', 'High'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                    filterPriority === p ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <Link
              to="/map"
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
            >
              <MapIcon className="w-3.5 h-3.5 text-red-400" />
              Switch to Live Map
            </Link>

            <Link
              to="/sos"
              className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-red-950"
            >
              + Submit SOS
            </Link>
          </div>
        </div>
      </header>

      {/* 4-Column Kanban Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-3.5 flex flex-col gap-3 min-h-[500px]"
              >
                {/* Column Title */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 px-1">
                  <div>
                    <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-200">
                      {col.title}
                    </h2>
                    <p className="text-[11px] text-zinc-500">{col.subtitle}</p>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${col.badgeBg}`}>
                    {columnTasks.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 rounded-xl p-3.5 space-y-3 transition group shadow-sm"
                    >
                      {/* Card Header: Category & Priority */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                          <span>{task.categoryIcon}</span> {task.category}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                            task.priority === 'Critical'
                              ? 'bg-red-950/80 border-red-800 text-red-400'
                              : task.priority === 'High'
                              ? 'bg-amber-950/80 border-amber-800 text-amber-400'
                              : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Card Details */}
                      <p className="text-xs font-medium text-zinc-200 leading-snug">{task.title}</p>

                      {/* Card Meta Stats */}
                      <div className="space-y-1 text-[11px] font-mono text-zinc-400 border-t border-zinc-900 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 truncate text-zinc-400">
                            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                            {task.location}
                          </span>
                          <span className="text-zinc-500">{task.distance}</span>
                        </div>
                        <div className="flex items-center justify-between pt-0.5">
                          <span className="flex items-center gap-1 text-zinc-400">
                            <Users className="w-3 h-3 text-blue-400 shrink-0" />
                            {task.headcount} Affected
                          </span>
                          <span className="text-zinc-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {task.timeAgo}
                          </span>
                        </div>
                        {task.assignee && (
                          <div className="text-[10px] text-amber-400 font-sans pt-1 flex items-center gap-1">
                            <Truck className="w-3 h-3" /> {task.assignee}
                          </div>
                        )}
                      </div>

                      {/* Action Button to Advance Stage */}
                      {task.status !== 'verified' && (
                        <button
                          onClick={() => advanceTask(task.id)}
                          className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition mt-1"
                        >
                          {task.status === 'open' && (
                            <>
                              Claim & Lock Task <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                            </>
                          )}
                          {task.status === 'en_route' && (
                            <>
                              Mark Drop Delivered <Truck className="w-3.5 h-3.5 text-amber-400" />
                            </>
                          )}
                          {task.status === 'delivered' && (
                            <>
                              Verify & Close Case <Check className="w-3.5 h-3.5 text-emerald-400" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-zinc-600 text-xs font-mono border border-dashed border-zinc-800/60 rounded-xl">
                      No active tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}