import { Link } from 'react-router-dom'
import { formatDateTime } from '@/lib/format'
import Badge from '@/components/ui/Badge'

const statusVariant = {
  OPEN: 'muted', ACTIVE: 'default', PENDING_RECONCILIATION: 'outline',
  RECONCILED: 'muted', CLOSED: 'muted',
}

export default function ShiftList({ shifts }) {
  if (!shifts.length) return <p className="text-sm text-muted">No shifts yet.</p>

}