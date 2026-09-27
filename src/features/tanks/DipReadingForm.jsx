import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { recordDip } from '@/api/tanks'

export default function DipReadingForm({ tank, onDone }) {
    const [dipCm, setDipCm] = useState('')
    const [liters, setLiters] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await recordDip(tank.id, { dip_depth_cm: dipCm, physical_liters: liters })
            setDipCm(''); setLiters('')
            onDone()
        } catch (err) {
            setError(err.response?.data?.error || 'Could not record dip reading.')
        } finally { setBusy(false) }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-line p-3">
            <h3 className="text-sm font-semibold">Record dip reading — {tank.name}</h3>
            {error && <div className="rounded-lg border border-danger/40 p-2 text-xs text-danger">{error}</div>}
            <label className="block text-sm">Dip depth (cm)
                <Input type="number" min="0" step="0.1" value={dipCm} onChange={(e) => setDipCm(e.target.value)} className="mt-1 tabular-nums" />
            </label>
            <label className="block text-sm">Physical volume (liters)
                <Input type="number" min="0" step="0.01" required value={liters} onChange={(e) => setLiters(e.target.value)} className="mt-1 tabular-nums" />
            </label>
            <Button type="submit" disabled={busy} className="w-full sm:w-auto">
                {busy && <Loader2 size={16} className="animate-spin" />} Submit dip reading
            </Button>
        </form>
    )
}