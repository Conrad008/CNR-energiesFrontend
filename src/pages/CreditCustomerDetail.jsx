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

}