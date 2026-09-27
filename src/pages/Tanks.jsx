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
    
    return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Tanks</h1>
            <Button onClick={() => setShowDelivery((s) => !s)} variant="outline">
                {showDelivery ? 'Close' : 'Record delivery'}
            </Button>
        </div>
        
        {showDelivery && tanks.length > 0 && (
            <DeliveryForm tanks={tanks} onDone={() => { setShowDelivery(false); refresh() }} />
        )}
        
        {loading ? <p className="text-muted">Loading…</p> : <TankList tanks={tanks} onSelect={setSelected} />}
        
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6">
                        <button onClick={() => setSelected(null)} className="absolute right-4 top-4 text-muted hover:text-ink" aria-label="Close">
                            <X size={20} />
                        </button>
                        <DipReadingForm tank={selected} onDone={() => { setSelected(null); refresh() }} />
                    </div>
                </div>
            )}
    </div>
    )
}