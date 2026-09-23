import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { listStations } from '@/api/stations'
import { startShift } from '@/api/shifts'

export default function StartShiftForm() {
  const navigate = useNavigate()
  const [stations, setStations] = useState([])
  const [stationId, setStationId] = useState('')
  const [openingFloat, setOpeningFloat] = useState('0.00')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

}