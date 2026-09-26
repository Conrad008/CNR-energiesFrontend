import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { recordCreditPayment } from '@/api/credit'

const METHODS = ['CASH', 'MPESA', 'BANK_TRANSFER', 'CHEQUE']

export default function PaymentForm({ customer, onDone }) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('BANK_TRANSFER')
  const [reference, setReference] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  
}