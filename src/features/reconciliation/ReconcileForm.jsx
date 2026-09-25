import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { formatKsh } from '@/lib/format'
import { reconcileShift } from '@/api/reconciliation'

export default function ReconcileForm({ shift }) {
    const navigate = useNavigate()
    const [cash, setCash] = useState('0.00')
    const [mpesa, setMpesa] = useState('0.00')
    const [card, setCard] = useState('0.00')
    const [credit, setCredit] = useState('0.00')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    const expected = useMemo(
        () => shift.pump_readings.reduce((sum, r) => sum + Number(r.expected_revenue || 0), 0),
        [shift.pump_readings]
    )
    const actualTotal = [cash, mpesa, card, credit].reduce((s, v) => s + (Number(v) || 0), 0)
    const variance = actualTotal - expected
    const isShort = variance < 0

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await reconcileShift(shift.id, {
                actual_cash: cash, actual_mpesa: mpesa, actual_card: card, actual_credit: credit,
            })
            navigate(0)
        } catch (err) {
            setError(err.response?.data?.error || 'Could not reconcile shift.')
        } finally { setBusy(false) }
    }

}