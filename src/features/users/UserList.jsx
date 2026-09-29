import Badge from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/format'

export default function UserList({ users }) {
  if (!users.length) return <p className="text-sm text-muted">No users yet.</p>

}