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

}