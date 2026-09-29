import { useFetch } from '@/hooks/useFetch'
import { listAuditLogs } from '@/api/audit'
import Spinner from '@/components/ui/Spinner'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import { formatDateTime } from '@/lib/format'

export default function AuditLog() {
  const { data: logs, loading, error, refresh } = useFetch(() => listAuditLogs())

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Audit log</h1>
            {loading && <Spinner />}
            {error && <ErrorState message={error} onRetry={refresh} />}
            {logs && logs.length === 0 && <EmptyState title="No activity recorded yet" description="Actions like price changes and approvals will appear here." />}
            {logs && logs.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-line">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-line text-left text-muted">
                                <th className="p-3">When</th><th className="p-3">User</th><th className="p-3">Action</th><th className="p-3">Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((l) => (
                                <tr key={l.id} className="border-b border-line last:border-0">
                                    <td className="p-3 text-muted">{formatDateTime(l.timestamp)}</td>
                                    <td className="p-3">{l.user_email}</td>
                                    <td className="p-3">{l.action}</td>
                                    <td className="p-3 text-muted">{l.model_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )

}