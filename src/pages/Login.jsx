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
}