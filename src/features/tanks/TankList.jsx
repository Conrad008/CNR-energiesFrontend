import { formatLiters } from '@/lib/format'

export default function TankList({ tanks, onSelect }) {
  if (!tanks.length) return <p className="text-sm text-muted">No tanks set up yet.</p>

  return(
    <>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tanks.map((t) => {
            const pct = t.capacity_liters > 0
            ? Math.min(100, Math.round((t.current_capacity_liters / t.capacity_liters) * 100))
            : 0
            const low = pct < 20
            return (
                <button
                    key={t.id} onClick={() => onSelect(t)}
                    className="rounded-xl border border-line bg-surface p-4 text-left hover:border-primary"
                >
                    <div className="flex items-center justify-between">
                        <span className="font-medium">{t.name}</span>
                        <span className="text-xs text-muted">{t.product_name}</span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-line">
                        <div
                            className={`h-2 rounded-full ${low ? 'bg-danger' : 'bg-primary'}`}
                            style={{ width: `${pct}%` }}
                        />
                    </div>   
                </button>
            )
        })}
    </div>
    
    </>
  )
}