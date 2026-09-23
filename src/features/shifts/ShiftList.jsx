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

        <tbody>
            {shifts.map((s) => (
                <tr key={s.id} className="border-b border-line last:border-0">
                    <td className="py-2">
                        <Link to={`/shifts/${s.id}`} className="font-medium text-primary hover:underline">{s.attendant_email}</Link>
                    </td>
                    <td className="py-2"><Badge variant={statusVariant[s.status] || 'muted'}>{s.status}</Badge></td>
                    <td className="py-2 text-muted">{formatDateTime(s.start_time)}</td>
                    <td className="py-2 tabular-nums">{s.opening_cash_float}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
    )
}