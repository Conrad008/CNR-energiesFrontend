import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { updateFuelPrice } from '@/api/fuel'

export default function PriceUpdateForm({ product, onDone }) {
    const [price, setPrice] = useState(product.current_price)
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await updateFuelPrice(product.id, price)
            onDone()
        } catch (err) {
            setError(err.response?.data?.error || 'Could not update price.')
        } finally { setBusy(false) }
    }

    return (
        <form onSubmit={onSubmit} className="flex items-end gap-2">
            <label className="block text-sm">New price (KSh/L)
                <Input type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-32 tabular-nums" />
            </label>
            <Button type="submit" disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Update</Button>
            {error && <span className="text-xs text-danger">{error}</span>}
        </form>
    )

}