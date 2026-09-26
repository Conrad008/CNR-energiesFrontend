import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { recordCreditSale } from '@/api/credit'

export default function CreditSaleForm({ customer, onDone }) {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await recordCreditSale(customer.id, { amount, description })
            setAmount(''); setDescription('')
            onDone()
        } catch (err) {
            setError(err.response?.data?.error || 'Could not record sale.')
        } finally { setBusy(false) }
    }

}