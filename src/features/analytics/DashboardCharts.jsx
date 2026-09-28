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

}