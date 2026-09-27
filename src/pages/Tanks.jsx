import { useEffect, useState } from 'react'
import TankList from '@/features/tanks/TankList'
import DipReadingForm from '@/features/tanks/DipReadingForm'
import DeliveryForm from '@/features/tanks/DeliveryForm'
import { listTanks } from '@/api/tanks'
import Button from '@/components/ui/Button'
import { X } from 'lucide-react'
 export default function Tanks() {
  const [tanks, setTanks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [showDelivery, setShowDelivery] = useState(false)

  const refresh = () => listTanks().then((r) => { setTanks(r.data); setSelected(null) }).finally(() => setLoading(false))
  useEffect(() => { refresh() }, [])

}