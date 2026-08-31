export function RadarLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 shadow-inner p-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g fill="none" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="4" fill="#ef4444" stroke="none" />
          <circle cx="50" cy="50" r="16" />
          <path d="M 50 25 A 25 25 0 1 1 25 50" />
          <path d="M 50 25 C 68 25 72 35 60 48 L 50 50" />
          <path d="M 28 20 A 38 38 0 0 0 15 62" />
          <path d="M 24 76 A 38 38 0 0 0 78 80" />
          <path d="M 87 64 A 38 38 0 0 0 85 40" />
          <circle cx="28" cy="35" r="3.5" fill="#ef4444" stroke="none" />
          <circle cx="48" cy="74" r="3.5" fill="#ef4444" stroke="none" />
        </g>
      </svg>
    </div>
  )
}