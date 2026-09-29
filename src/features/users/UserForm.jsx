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

      return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-line bg-surface p-4">
      <h2 className="font-semibold">Add staff member</h2>
      {error && <div className="rounded-lg border border-danger/40 p-3 text-sm text-danger">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">First name
          <Input required value={form.first_name} onChange={set('first_name')} className="mt-1" />
        </label>
        <label className="block text-sm">Last name
          <Input required value={form.last_name} onChange={set('last_name')} className="mt-1" />
        </label>
        <label className="block text-sm">Email
          <Input type="email" required value={form.email} onChange={set('email')} className="mt-1" />
        </label>
        <label className="block text-sm">Phone
          <Input value={form.phone_number} onChange={set('phone_number')} className="mt-1" />
        </label>
        <label className="block text-sm">Password
          <Input type="password" required minLength={8} value={form.password} onChange={set('password')} className="mt-1" />
        </label>
        <label className="block text-sm">Role
          <select value={form.role} onChange={set('role')} className="mt-1 w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/30">
            {Object.values(ROLE).map((r) => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
          </select>
        </label>
      </div>
      <Button type="submit" disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Create user</Button>
    </form>
  )
}
