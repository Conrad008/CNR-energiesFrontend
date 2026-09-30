import { useFetch } from '@/hooks/useFetch'
import { getDashboard, getStockSummary } from '@/api/analytics'
import DashboardCharts from '@/features/analytics/DashboardCharts'
import StockSummary from '@/features/analytics/StockSummary'
import Spinner from '@/components/ui/Spinner'
import ErrorState from '@/components/ui/ErrorState'
import { formatKsh } from '@/lib/format'

export default function Dashboard() {
  const { data: dash, loading: dashLoading, error: dashError, refresh: refreshDash } = useFetch(() => getDashboard(30))
  const { data: stock, loading: stockLoading, error: stockError, refresh: refreshStock } = useFetch(() => getStockSummary())
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {dashLoading && <Spinner label="Loading dashboard…" />}
      {dashError && <ErrorState message={dashError} onRetry={refreshDash} />}
      {dash && (
        <>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="text-xs text-muted">Shifts logged</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{dash.total_shifts_logged}</div>
            </div>
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="text-xs text-muted">Reconciled</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{dash.completed_reconciled_shifts}</div>
            </div>
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="text-xs text-muted">Expected revenue</div>
              <div className="mt-1 text-xl font-semibold tabular-nums">{formatKsh(dash.revenue_summary.total_expected_revenue)}</div>
            </div>
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="text-xs text-muted">Variance</div>
              <div className={`mt-1 text-xl font-semibold tabular-nums ${Number(dash.revenue_summary.total_variance) < 0 ? 'text-danger' : 'text-primary'}`}>
                {formatKsh(dash.revenue_summary.total_variance)}
              </div>
            </div>
          </div>
          <DashboardCharts data={dash} />
        </>
      )}

      <h2 className="text-lg font-semibold">Stock summary</h2>
      {stockLoading && <Spinner label="Loading stock…" />}
      {stockError && <ErrorState message={stockError} onRetry={refreshStock} />}
      {stock && <StockSummary tanks={stock} />}
    </div>
  )
}
