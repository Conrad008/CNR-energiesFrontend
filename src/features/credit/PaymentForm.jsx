import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import StkPushModal from '@/features/mpesa/StkPushModal'
import { recordCreditPayment } from '@/api/credit'

const METHODS = ['CASH', 'MPESA', 'BANK_TRANSFER', 'CHEQUE']

export default function PaymentForm({ customer, onDone }) {
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('BANK_TRANSFER')
    const [reference, setReference] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)
    const [showStk, setShowStk] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await recordCreditPayment(customer.id, { amount, payment_method: method, reference_number: reference })
            setAmount(''); setReference('')
            onDone()
        } catch (err) {
            setError(err.response?.data?.error || 'Could not record payment.')
        } finally { setBusy(false) }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-line p-3">
            <h3 className="text-sm font-semibold">Record payment</h3>
            {error && <div className="rounded-lg border border-danger/40 p-2 text-xs text-danger">{error}</div>}

            <label className="block text-sm">Amount (KSh)
                <Input
                    type="number" min="0.01" step="0.01" max={customer.current_balance} required
                    value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 tabular-nums"
                />
            </label>

            <label className="block text-sm">Method
                <select
                    value={method} onChange={(e) => setMethod(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                    {METHODS.map((m) => <option key={m} value={m}>{m.replace('_', ' ')}</option>)}
                </select>
            </label>

            {method === 'MPESA' ? (
                <Button
                    type="button" variant="outline" className="w-full"
                    onClick={() => setShowStk(true)}
                    disabled={!amount || Number(amount) <= 0}
                >
                    Send M-Pesa request
                </Button>
            ) : (
                <label className="block text-sm">Reference (optional)
                    <Input value={reference} onChange={(e) => setReference(e.target.value)} className="mt-1" />
                </label>
            )}

            {method === 'MPESA' && reference && (
                <p className="text-xs text-muted">M-Pesa receipt: <span className="tabular-nums">{reference}</span></p>
            )}

            <Button type="submit" disabled={busy || (method === 'MPESA' && !reference)} className="w-full sm:w-auto">
                {busy && <Loader2 size={16} className="animate-spin" />} Record payment
            </Button>

            {showStk && (
                <StkPushModal
                    amount={amount || '0'}
                    creditCustomerId={customer.id}
                    onClose={() => setShowStk(false)}
                    onSuccess={(txn) => {
                        setReference(txn.mpesa_receipt_number)
                        setShowStk(false)
                    }}
                />
            )}
        </form>
    )
}