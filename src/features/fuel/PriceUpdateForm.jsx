import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { updateFuelPrice } from '@/api/fuel'

export default function PriceUpdateForm({ product, onDone }) {
  const [price, setPrice] = useState(product.current_price)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)}