import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCustomer } from '@/api/credit'
import { formatKsh } from '@/lib/format'
import CreditSaleForm from '@/features/credit/CreditSaleForm'
import PaymentForm from '@/features/credit/PaymentForm'
import Card from '@/components/ui/Card'

export default function CreditCustomerDetail() {
    const { id } = useParams()
    const [customer, setCustomer] = useState(null)

    const refresh = () => getCustomer(id).then((r) => setCustomer(r.data))
    useEffect(() => { refresh() }, [id])

    if (!customer) return <p className="text-muted">Loading…</p>

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">{customer.name}</h1>
            <Card>
                <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                    <div><div className="text-muted">Balance</div><div className="tabular-nums font-medium">{formatKsh(customer.current_balance)}</div></div>
                    <div><div className="text-muted">Limit</div><div className="tabular-nums font-medium">{formatKsh(customer.credit_limit)}</div></div>
                    <div><div className="text-muted">Available</div><div className="tabular-nums font-medium">{formatKsh(customer.available_credit)}</div></div>
                </div>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2">
                <CreditSaleForm customer={customer} onDone={refresh} />
                <PaymentForm customer={customer} onDone={refresh} />
            </div>
        </div>
    )
}