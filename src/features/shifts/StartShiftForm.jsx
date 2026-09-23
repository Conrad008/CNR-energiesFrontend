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

    useEffect(() => {
        listStations().then((r) => {
            setStations(r.data)
            if (r.data.length === 1) setStationId(r.data[0].id)
        })
    }, [])

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            const { data } = await startShift(stationId, openingFloat)
            navigate(`/shifts/${data.id}`)
        } catch (err) {
            setError(err.response?.data?.error || 'Could not start shift.')
        } finally { setBusy(false) }
    }

}