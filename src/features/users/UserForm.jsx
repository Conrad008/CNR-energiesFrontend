import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { createUser } from '@/api/users'
import { ROLE } from '@/lib/roles'

export default function UserForm({ onDone }) {
    const [form, setForm] = useState({ email: '', password: '', first_name: '', last_name: '', role: ROLE.ATTENDANT, phone_number: '' })
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

    async function onSubmit(e) {
        e.preventDefault()
        setBusy(true); setError('')
        try {
            await createUser(form)
            onDone()
        } catch (err) {
            const data = err.response?.data
            setError(typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Could not create user.')
        } finally { setBusy(false) }
    }
}
