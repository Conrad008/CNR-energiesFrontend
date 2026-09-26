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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={phase === 'WAITING' || phase === 'SENDING' ? undefined : onClose} />
            <div className="relative w-full max-w-sm rounded-2xl border border-line bg-surface p-6">
                <button onClick={onClose} className="absolute right-4 top-4 text-muted hover:text-ink" aria-label="Close">
                    <X size={20} />
                </button>

                {phase === PHASE.ENTER && (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Smartphone /> <span className="font-semibold">M-Pesa payment</span>
                        </div>
                        <p className="text-sm text-muted">Sending a request for {formatKsh(amount)}.</p>
                        {error && <div className="rounded-lg border border-danger/40 p-3 text-sm text-danger">{error}</div>}
                        <label className="block text-sm">Phone number
                            <Input
                                type="tel" required placeholder="0712345678" value={phone}
                                onChange={(e) => setPhone(e.target.value)} className="mt-1"
                            />
                        </label>
                        <Button type="submit" className="w-full">Send payment request</Button>
                    </form>
                )}

                {phase === PHASE.SENDING && (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="text-sm text-muted">Sending request…</p>
                    </div>
                )}

                {phase === PHASE.WAITING && (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <p className="font-medium">Check your phone</p>
                        <p className="text-sm text-muted">Enter your M-Pesa PIN on the prompt sent to {phone}.</p>
                    </div>
                )}

                {phase === PHASE.SUCCESS && (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                        <CheckCircle2 className="text-primary" size={40} />
                        <p className="font-medium">Payment received</p>
                        <p className="text-sm text-muted">Receipt: {txn?.mpesa_receipt_number}</p>
                        <Button onClick={onClose} className="mt-2 w-full">Done</Button>
                    </div>
                )}

                {phase === PHASE.FAILED && (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                        <XCircle className="text-danger" size={40} />
                        <p className="font-medium">Payment failed</p>
                        <p className="text-sm text-muted">{txn?.result_desc || 'The customer declined or the request failed.'}</p>
                        <Button onClick={retry} variant="outline" className="mt-2 w-full">Try again</Button>
                    </div>
                )}

                {phase === PHASE.TIMEOUT && (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                        <Clock className="text-muted" size={40} />
                        <p className="font-medium">No response yet</p>
                        <p className="text-sm text-muted">The request may still complete. Check M-Pesa transactions later, or try again.</p>
                        <Button onClick={retry} variant="outline" className="mt-2 w-full">Try again</Button>
                    </div>
                )}
            </div>
        </div>
    )

}