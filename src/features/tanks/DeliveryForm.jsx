import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { recordDelivery } from '@/api/deliveries'

export default function DeliveryForm({ tanks, onDone }) {
    const [tankId, setTankId] = useState(tanks[0]?.id || '')
    const [supplier, setSupplier] = useState('')
    const [invoice, setInvoice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unitCost, setUnitCost] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await recordDelivery({
                tank: tankId, supplier_name: supplier, invoice_number: invoice,
                quantity_liters: quantity, unit_cost: unitCost,
            })
            setSupplier(''); setInvoice(''); setQuantity(''); setUnitCost('')
            onDone()
        } catch (err) {
            setError(err.response?.data?.error || 'Could not record delivery.')
        } finally { setBusy(false) }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-line bg-surface p-4">
            <h2 className="font-semibold">Record delivery</h2>
            {error && <div className="rounded-lg border border-danger/40 p-3 text-sm text-danger">{error}</div>}
            <label className="block text-sm">Tank
                <select
                    required value={tankId} onChange={(e) => setTankId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                    {tanks.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.product_name})</option>)}
                </select>
            </label>
            <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm">Supplier
                    <Input required value={supplier} onChange={(e) => setSupplier(e.target.value)} className="mt-1" />
                </label>
                <label className="block text-sm">Invoice number
                    <Input required value={invoice} onChange={(e) => setInvoice(e.target.value)} className="mt-1" />
                </label>
                <label className="block text-sm">Quantity (liters)
                    <Input type="number" min="0" step="0.01" required value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 tabular-nums" />
                </label>
                <label className="block text-sm">Unit cost (KSh)
                    <Input type="number" min="0" step="0.01" required value={unitCost} onChange={(e) => setUnitCost(e.target.value)} className="mt-1 tabular-nums" />
                </label>
            </div>
            <Button type="submit" disabled={busy} className="w-full sm:w-auto">
                {busy && <Loader2 size={16} className="animate-spin" />} Record delivery
            </Button>
        </form>
    )

}