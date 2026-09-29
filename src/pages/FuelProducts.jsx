import { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { listFuelProducts } from '@/api/fuel'
import PriceUpdateForm from '@/features/fuel/PriceUpdateForm'
import Spinner from '@/components/ui/Spinner'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import { formatKsh, formatDateTime } from '@/lib/format'

export default function FuelProducts() {
  const { data: products, loading, error, refresh } = useFetch(() => listFuelProducts())
  const [editing, setEditing] = useState(null)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Fuel products</h1>
            {loading && <Spinner />}
            {error && <ErrorState message={error} onRetry={refresh} />}
            {products && products.length === 0 && <EmptyState title="No fuel products yet" description="Add one from the admin panel." />}
            {products && products.length > 0 && (
                <div className="space-y-3">
                    {products.map((p) => (
                        <div key={p.id} className="rounded-xl border border-line bg-surface p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <div className="font-medium">{p.name} <span className="text-sm text-muted">({p.code})</span></div>
                                    <div className="tabular-nums text-lg font-semibold text-primary">{formatKsh(p.current_price)}</div>
                                </div>
                                {editing === p.id ? (
                                    <PriceUpdateForm product={p} onDone={() => { setEditing(null); refresh() }} />
                                ) : (
                                    <button onClick={() => setEditing(p.id)} className="text-sm font-medium text-primary hover:underline">
                                        Change price
                                    </button>
                                )}
                            </div>
                            {p.price_history?.length > 0 && (
                                <details className="mt-3 text-xs text-muted">
                                    <summary className="cursor-pointer">Price history</summary>
                                    <ul className="mt-2 space-y-1">
                                        {p.price_history.map((h) => (
                                            <li key={h.id} className="tabular-nums">{formatKsh(h.price)} — from {formatDateTime(h.effective_from)}</li>
                                        ))}
                                    </ul>
                                </details>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}