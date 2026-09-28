import { Loader2 } from 'lucide-react'

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-muted">
      <Loader2 className="animate-spin" size={20} /> <span className="text-sm">{label}</span>
    </div>
  )
}