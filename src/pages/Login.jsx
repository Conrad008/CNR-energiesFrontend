import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Fuel, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

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

    const field = 'w-full rounded-lg border border-line bg-app px-3 py-2 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/30'

    return (
        <div className="flex min-h-screen items-center justify-center bg-app p-4">
            <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-2xl border border-line bg-surface p-6 shadow-sm">
                <div className="flex items-center gap-2 text-primary">
                    <Fuel /> <span className="text-xl font-bold">CNR Energies</span>
                </div>
                <p className="text-sm text-muted">Sign in to manage your station.</p>
                {error && <div className="rounded-lg border border-danger/40 p-3 text-sm text-danger">{error}</div>}
                <label className="block text-sm">Email
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-1`} />
                </label>
                <label className="block text-sm">Password
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} mt-1`} />
                </label>
                <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 font-medium text-on-primary disabled:opacity-60">
                    {busy && <Loader2 size={16} className="animate-spin" />} Sign in
                </button>
            </form>
        </div>
    )
}