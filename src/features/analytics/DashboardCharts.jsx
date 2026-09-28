import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatKsh } from '@/lib/format'

const CHANNEL_COLORS = ['#15803d', '#4ade80', '#93a59b', '#dc2626']

export default function DashboardCharts({ data }) {
  const channels = [
    { name: 'Cash', value: Number(data.payment_channel_breakdown.cash) },
    { name: 'M-Pesa', value: Number(data.payment_channel_breakdown.mpesa) },
    { name: 'Card', value: Number(data.payment_channel_breakdown.card) },
    { name: 'B2B Credit', value: Number(data.payment_channel_breakdown.b2b_credit) },
  ].filter((c) => c.value > 0)

    return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-line bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-muted">Payment channels</h3>
        {channels.length ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={channels} dataKey="value" nameKey="name" outerRadius={80} label={(e) => e.name}>
                {channels.map((_, i) => <Cell key={i} fill={CHANNEL_COLORS[i % CHANNEL_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => formatKsh(v)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="py-16 text-center text-sm text-muted">No revenue recorded in this period.</p>
        )}
      </div>
      
      <div className="rounded-xl border border-line bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-muted">Expected vs. collected</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={[{
              name: 'Revenue',
              Expected: Number(data.revenue_summary.total_expected_revenue),
              Collected: Number(data.revenue_summary.total_actual_collected),
            }]}
          >
            <XAxis dataKey="name" stroke="var(--muted)" fontSize={12} />
            <YAxis stroke="var(--muted)" fontSize={12} />
            <Tooltip formatter={(v) => formatKsh(v)} />
            <Bar dataKey="Expected" fill="#93a59b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Collected" fill="#15803d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    )
}