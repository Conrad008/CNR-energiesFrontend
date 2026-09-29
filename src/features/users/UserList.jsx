import Badge from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/format'

export default function UserList({ users }) {
    if (!users.length) return <p className="text-sm text-muted">No users yet.</p>

    return (
        <>
            <table className="hidden w-full text-sm md:table">
                <thead>
                    <tr className="border-b border-line text-left text-muted">
                        <th className="py-2 font-medium">Name</th><th className="py-2 font-medium">Email</th>
                        <th className="py-2 font-medium">Role</th><th className="py-2 font-medium">Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-b border-line last:border-0">
                            <td className="py-2">{u.first_name} {u.last_name}</td>
                            <td className="py-2 text-muted">{u.email}</td>
                            <td className="py-2"><Badge>{u.role}</Badge></td>
                            <td className="py-2 text-muted">{formatDateTime(u.date_joined)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="space-y-3 md:hidden">
                {users.map((u) => (
                    <div key={u.id} className="rounded-xl border border-line bg-surface p-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{u.first_name} {u.last_name}</span>
                            <Badge>{u.role}</Badge>
                        </div>
                        <div className="mt-1 text-sm text-muted">{u.email}</div>
                    </div>
                ))}
            </div>
        </>
    )
}