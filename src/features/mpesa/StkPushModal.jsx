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

    useEffect(() => () => clearTimeout(pollTimer.current), [])

    async function poll(checkoutId) {
        if (Date.now() > pollDeadline.current) {
            setPhase(PHASE.TIMEOUT)
            return
        }
        try {
            const { data } = await getMpesaStatus(checkoutId)
            if (data.status === 'SUCCESS') {
                setTxn(data)
                setPhase(PHASE.SUCCESS)
                onSuccess?.(data)
                return
            }
            if (data.status === 'FAILED') {
                setTxn(data)
                setPhase(PHASE.FAILED)
                return
            }
            if (data.status === 'TIMEOUT') {
                setPhase(PHASE.TIMEOUT)
                return
            }
            pollTimer.current = setTimeout(() => poll(checkoutId), POLL_INTERVAL_MS)
        } catch {
            pollTimer.current = setTimeout(() => poll(checkoutId), POLL_INTERVAL_MS)
        }
    }

    async function onSubmit(e) {
        e.preventDefault()
        setError('')
        setPhase(PHASE.SENDING)
        try {
            const { data } = await initiateSTKPush({
                phone_number: phone,
                amount,
                shift: shiftId,
                credit_customer: creditCustomerId,
            })
            setTxn(data)
            setPhase(PHASE.WAITING)
            pollDeadline.current = Date.now() + POLL_TIMEOUT_MS
            pollTimer.current = setTimeout(() => poll(data.checkout_request_id), POLL_INTERVAL_MS)
        } catch (err) {
            setError(err.response?.data?.error || 'Could not start the M-Pesa payment.')
            setPhase(PHASE.ENTER)
        }
    }

    function retry() {
        clearTimeout(pollTimer.current)
        setError('')
        setPhase(PHASE.ENTER)
    }
    
}