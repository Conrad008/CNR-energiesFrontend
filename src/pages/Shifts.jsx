import { useEffect, useState } from 'react'
import StartShiftForm from '@/features/shifts/StartShiftForm'
import ShiftList from '@/features/shifts/ShiftList'
import { listShifts } from '@/api/shifts'
import { useAuth } from '@/auth/AuthContext'
import { isAttendant } from '@/lib/roles'

export default function Shifts() {
  const { user } = useAuth()
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listShifts().then((r) => setShifts(r.data)).finally(() => setLoading(false))
  }, [])

}