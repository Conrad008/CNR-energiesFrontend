import { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { listUsers } from '@/api/users'
import UserList from '@/features/users/UserList'
import UserForm from '@/features/users/UserForm'
import Spinner from '@/components/ui/Spinner'
import ErrorState from '@/components/ui/ErrorState'
import Button from '@/components/ui/Button'

export default function Users() {
    const { data: users, loading, error, refresh } = useFetch(() => listUsers())
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Users</h1>
                <Button variant="outline" onClick={() => setShowForm((s) => !s)}>{showForm ? 'Close' : 'Add user'}</Button>
            </div>
            {showForm && <UserForm onDone={() => { setShowForm(false); refresh() }} />}
            {loading && <Spinner />}
            {error && <ErrorState message={error} onRetry={refresh} />}
            {users && <UserList users={users} />}
        </div>
    )
}