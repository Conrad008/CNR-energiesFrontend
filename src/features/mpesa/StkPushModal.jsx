import { useEffect, useRef, useState } from 'react'
import { X, Loader2, CheckCircle2, XCircle, Clock, Smartphone } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { formatKsh } from '@/lib/format'
import { initiateSTKPush, getMpesaStatus } from '@/api/mpesa'

const PHASE = {
    ENTER: 'ENTER',
    SENDING: 'SENDING',
    WAITING: 'WAITING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    TIMEOUT: 'TIMEOUT',
}

const POLL_INTERVAL_MS = 3000
const POLL_TIMEOUT_MS = 120000

export default function StkPushModal({ amount, shiftId, creditCustomerId, onClose, onSuccess }) {
    const [phase, setPhase] = useState(PHASE.ENTER)
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [txn, setTxn] = useState(null)
    const pollTimer = useRef(null)
    const pollDeadline = useRef(null)
}