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
}