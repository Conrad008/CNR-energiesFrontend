import { formatLiters } from '@/lib/format'

export default function StockSummary({ tanks }) {
  if (!tanks.length) return <p className="text-sm text-muted">No tanks recorded.</p>

  return(
        <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-line text-left text-muted">
                        <th className="p-3">Tank</th>
                        <th className="p-3">Station</th>
                        <th className="p-3">Product</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Fill</th>
                    </tr>
                </thead>
                
                <tbody>
                    {tanks.map((t) => (
                        <tr key={t.tank_id} className="border-b border-line last:border-0">
                            <td className="p-3">{t.tank_name}</td>
                            <td className="p-3 text-muted">{t.station_name}</td>
                            <td className="p-3 text-muted">{t.fuel_product}</td>
                            <td className="p-3 tabular-nums">{formatLiters(t.current_capacity_liters)}</td>
                            <td className={`p-3 tabular-nums font-medium ${t.is_low_stock ? 'text-danger' : 'text-ink'}`}>
                                {t.fill_percentage}%{t.is_low_stock && ' error!'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}