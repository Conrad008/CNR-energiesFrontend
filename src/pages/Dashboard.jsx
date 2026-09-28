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
}