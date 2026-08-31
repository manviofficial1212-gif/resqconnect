import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/volunteers')({
  component: VolunteerHub,
})

function VolunteerHub() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-3xl font-bold text-red-500">Volunteer Hub</h1>
      <p className="mt-4 text-neutral-400">Manage volunteer assignments, check-ins, and field teams.</p>
    </div>
  )
}