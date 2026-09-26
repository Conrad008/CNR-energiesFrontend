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

    return (
        <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-line p-3">
            <h3 className="text-sm font-semibold">Record credit sale</h3>
            {error && <div className="rounded-lg border border-danger/40 p-2 text-xs text-danger">{error}</div>}
            <label className="block text-sm">Amount (KSh)
                <Input type="number" min="0.01" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 tabular-nums" />
            </label>
            <label className="block text-sm">Description
                <Input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1" placeholder="e.g. Diesel, 200L" />
            </label>
            <Button type="submit" disabled={busy} className="w-full sm:w-auto">
                {busy && <Loader2 size={16} className="animate-spin" />} Record sale
            </Button>
        </form>
    )
}