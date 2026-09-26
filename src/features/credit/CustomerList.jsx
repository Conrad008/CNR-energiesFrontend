import { Link } from 'react-router-dom'
import { formatKsh } from '@/lib/format'
import Badge from '@/components/ui/Badge'

export default function CustomerList({ customers }) {
  if (!customers.length) return <p className="text-sm text-muted">No credit customers found.</p>

}