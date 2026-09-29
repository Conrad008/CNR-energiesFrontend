import { useFetch } from '@/hooks/useFetch'
import { listAuditLogs } from '@/api/audit'
import Spinner from '@/components/ui/Spinner'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import { formatDateTime } from '@/lib/format'

export default function AuditLog() {
  const { data: logs, loading, error, refresh } = useFetch(() => listAuditLogs())

}