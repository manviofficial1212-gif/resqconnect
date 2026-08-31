import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory')({
  component: InventoryTracker,
})

function InventoryTracker() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-3xl font-bold text-blue-500">Inventory Tracker</h1>
      <p className="mt-4 text-neutral-400">Real-time tracking of medical kits, food rations, and clean water supplies.</p>
    </div>
  )
}