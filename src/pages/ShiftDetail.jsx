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

}