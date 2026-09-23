import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Fuel, Loader2 } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function Login() {
    const { user, login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    if (user) return <Navigate to="/" replace />

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await login(email, password)
            navigate(location.state?.from?.pathname || '/', { replace: true })
        } catch (err) {
            setError(err.response?.data?.detail || 'Could not sign in. Check your details.')
        } finally { setBusy(false) }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-app p-4">
            <Card className="w-full max-w-sm">
                <div className="mb-4 flex items-center gap-2 text-primary">
                    <Fuel /> <span className="text-xl font-bold">CNR Energies</span>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <p className="text-sm text-muted">Sign in to manage your station.</p>
                    {error && <div className="rounded-lg border border-danger/40 p-3 text-sm text-danger">{error}</div>}
                    <label className="block text-sm">Email
                        <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                    </label>
                    <label className="block text-sm">Password
                        <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
                    </label>
                    <Button type="submit" disabled={busy} className="w-full">
                        {busy && <Loader2 size={16} className="animate-spin" />} Sign in
                    </Button>
                </form>
            </Card>
        </div>
    )
}