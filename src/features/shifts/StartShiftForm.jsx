import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { listStations } from '@/api/stations'
import { startShift } from '@/api/shifts'

export default function StartShiftForm() {
  const navigate = useNavigate()
  const [stations, setStations] = useState([])
  const [stationId, setStationId] = useState('')
  const [openingFloat, setOpeningFloat] = useState('0.00')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

    useEffect(() => {
        listStations().then((r) => {
            setStations(r.data)
            if (r.data.length === 1) setStationId(r.data[0].id)
        })
    }, [])

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            const { data } = await startShift(stationId, openingFloat)
            navigate(`/shifts/${data.id}`)
        } catch (err) {
            setError(err.response?.data?.error || 'Could not start shift.')
        } finally { setBusy(false) }
    }


    return (
        <Card>
            <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="font-semibold">Start a shift</h2>
                {error && <div className="rounded-lg border border-danger/40 p-3 text-sm text-danger">{error}</div>}
                <label className="block text-sm">Station
                    <select
                        required value={stationId} onChange={(e) => setStationId(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="" disabled>Select a station</option>
                        {stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </label>
                <label className="block text-sm">Opening cash float (KSh)
                    <Input type="number" min="0" step="0.01" value={openingFloat} onChange={(e) => setOpeningFloat(e.target.value)} className="mt-1" />
                </label>
                <Button type="submit" disabled={busy || !stationId} className="w-full sm:w-auto">
                    {busy && <Loader2 size={16} className="animate-spin" />} Start shift
                </Button>
            </form>
        </Card>
    )

}