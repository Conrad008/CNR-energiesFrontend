import { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { listFuelProducts } from '@/api/fuel'
import PriceUpdateForm from '@/features/fuel/PriceUpdateForm'
import Spinner from '@/components/ui/Spinner'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import { formatKsh, formatDateTime } from '@/lib/format'

export default function FuelProducts() {
  const { data: products, loading, error, refresh } = useFetch(() => listFuelProducts())
  const [editing, setEditing] = useState(null)

  
}