import { Link } from 'react-router-dom'
import { formatDateTime } from '@/lib/format'
import Badge from '@/components/ui/Badge'

const statusVariant = {
  OPEN: 'muted', ACTIVE: 'default', PENDING_RECONCILIATION: 'outline',
  RECONCILED: 'muted', CLOSED: 'muted',
}

export default function ShiftList({ shifts }) {
  if (!shifts.length) return <p className="text-sm text-muted">No shifts yet.</p>

    return (
    <>
          <table className="hidden w-full text-sm md:table">
                <thead>
                    <tr className="border-b border-line text-left text-muted">
                        <th className="py-2 font-medium">Attendant</th>
                        <th className="py-2 font-medium">Status</th>
                        <th className="py-2 font-medium">Started</th>
                        <th className="py-2 font-medium">Opening float</th>
                    </tr>
                </thead>
          </table>

    </>
    )
}