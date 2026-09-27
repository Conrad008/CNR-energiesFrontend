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
            await recordDip(tank.id, { dip_level_cm: dipCm, dip_liters: liters })
            setDipCm(''); setLiters('')
            onDone()
        } catch (err) {
            setError(err.response?.data?.error || 'Could not record dip reading.')
        } finally { setBusy(false) }
    }

}