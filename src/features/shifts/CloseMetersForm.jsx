import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { closeMeters } from '@/api/shifts'

export default function CloseMetersForm({ shift }) {
    const navigate = useNavigate()
    const [values, setValues] = useState(
        Object.fromEntries(shift.pump_readings.map((r) => [r.nozzle, r.opening_meter]))
    )
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        const readings = shift.pump_readings.map((r) => ({ nozzle_id: r.nozzle, closing_meter: values[r.nozzle] }))
        try {
            await closeMeters(shift.id, readings)
            navigate(0)
        } catch (err) {
            setError(err.response?.data?.error || 'Could not save closing meters.')
        } finally { setBusy(false) }
    }

    return (
        <Card>
            <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="font-semibold">Closing meters</h2>
                {error && <div className="rounded-lg border border-danger/40 p-3 text-sm text-danger">{error}</div>}
                <div className="space-y-3">
                    {shift.pump_readings.map((r) => (
                        <div key={r.id} className="flex items-center justify-between gap-3">
                            <span className="text-sm">{r.nozzle_name} <span className="text-muted">({r.product_name})</span></span>
                            <Input
                                type="number" step="0.01" min={r.opening_meter} className="w-32 tabular-nums"
                                value={values[r.nozzle]}
                                onChange={(e) => setValues((v) => ({ ...v, [r.nozzle]: e.target.value }))}
                            />
                        </div>
                    ))}
                </div>
                <Button type="submit" disabled={busy} className="w-full sm:w-auto">
                    {busy && <Loader2 size={16} className="animate-spin" />} Submit closing meters
                </Button>
            </form>
        </Card>
    )
}