import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { formatKsh } from '@/lib/format'
import { reconcileShift } from '@/api/reconciliation'

export default function ReconcileForm({ shift }) {
  const navigate = useNavigate()
  const [cash, setCash] = useState('0.00')
  const [mpesa, setMpesa] = useState('0.00')
  const [card, setCard] = useState('0.00')
  const [credit, setCredit] = useState('0.00')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

}