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

}