import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/protocols')({
  component: ProtocolDocs,
})

function ProtocolDocs() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-3xl font-bold text-emerald-500">Protocol Documentation</h1>
      <p className="mt-4 text-neutral-400">Standard operating procedures and disaster response guides.</p>
    </div>
  )
}