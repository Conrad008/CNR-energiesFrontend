import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/api/client'
import CloseMetersForm from '@/features/shifts/CloseMetersForm'
import { formatDateTime, formatKsh } from '@/lib/format'
import Badge from '@/components/ui/Badge'

export default function ShiftDetailPage() {
  const { id } = useParams()
  const [shift, setShift] = useState(null)

  useEffect(() => {
    api.get('/shifts/').then((r) => setShift(r.data.find((s) => s.id === id)))
  }, [id])

  if (!shift) return <p className="text-muted">Loading…</p>

   return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Shift</h1>
        <Badge>{shift.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-4 text-sm sm:grid-cols-4">
        <div><div className="text-muted-foreground">Attendant</div>{shift.attendant_email}</div>
        <div><div className="text-muted-foreground">Started</div>{formatDateTime(shift.start_time)}</div>
        <div><div className="text-muted-foreground">Opening float</div>{formatKsh(shift.opening_cash_float)}</div>
        <div><div className="text-muted-foreground">Ended</div>{formatDateTime(shift.end_time)}</div>
      </div>

      {shift.status === 'ACTIVE' && <CloseMetersForm shift={shift} />}

      {shift.status !== 'ACTIVE' && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="p-3">Nozzle</th><th className="p-3">Opening</th><th className="p-3">Closing</th><th className="p-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {shift.pump_readings.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="p-3">{r.nozzle_name}</td>
                  <td className="p-3 tabular-nums">{r.opening_meter}</td>
                  <td className="p-3 tabular-nums">{r.closing_meter ?? '—'}</td>
                  <td className="p-3 tabular-nums">{formatKsh(r.expected_revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}