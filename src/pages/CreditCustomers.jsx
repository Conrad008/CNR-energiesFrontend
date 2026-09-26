import { useEffect, useState } from 'react'
import CustomerList from '@/features/credit/CustomerList'
import { listCustomers } from '@/api/credit'

export default function CreditCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listCustomers().then((r) => setCustomers(r.data)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Credit customers</h1>
      {loading ? <p className="text-muted">Loading…</p> : <CustomerList customers={customers} />}
    </div>
  )
}