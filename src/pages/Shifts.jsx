import { useEffect, useState } from 'react'
import StartShiftForm from '@/features/shifts/StartShiftForm'
import ShiftList from '@/features/shifts/ShiftList'
import { listShifts } from '@/api/shifts'
import { useAuth } from '@/context/AuthContext'
import { isAttendant } from '@/lib/roles'

export default function Shifts() {
  const { user } = useAuth()
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listShifts().then((r) => setShifts(r.data)).finally(() => setLoading(false))
  }, [])

    return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Shifts</h1>
      {isAttendant(user) && <StartShiftForm />}
      {loading ? <p className="text-muted">Loading…</p> : <ShiftList shifts={shifts} />}
    </div>
  )
}