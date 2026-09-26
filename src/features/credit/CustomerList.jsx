import { Link } from 'react-router-dom'
import { formatKsh } from '@/lib/format'
import Badge from '@/components/ui/Badge'

export default function CustomerList({ customers }) {
  if (!customers.length) return <p className="text-sm text-muted">No credit customers found.</p>

    return ( 
    <>
        <table className="hidden w-full text-sm md:table">
            <thead>
                <tr className="border-b border-line text-left text-muted">
                    <th className="py-2 font-medium">Name</th>
                    <th className="py-2 font-medium">Balance</th>
                    <th className="py-2 font-medium">Limit</th>
                    <th className="py-2 font-medium">Available</th>
                    <th className="py-2 font-medium">Status</th>
                </tr>
            </thead>

            <tbody>
                {customers.map((c) => (
                    <tr key={c.id} className="border-b border-line last:border-0">
                        <td className="py-2">
                            <Link to={`/credit/${c.id}`} className="font-medium text-primary hover:underline">{c.name}</Link>
                            {c.company_name && <div className="text-xs text-muted">{c.company_name}</div>}
                        </td>
                        <td className="py-2 tabular-nums">{formatKsh(c.current_balance)}</td>
                        <td className="py-2 tabular-nums">{formatKsh(c.credit_limit)}</td>
                        <td className="py-2 tabular-nums">{formatKsh(c.available_credit)}</td>
                        <td className="py-2"><Badge variant={c.is_active ? 'default' : 'muted'}>{c.is_active ? 'Active' : 'Inactive'}</Badge></td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <div className="space-y-3 md:hidden">
            {customers.map((c) => (
                <Link key={c.id} to={`/credit/${c.id}`} className="block rounded-xl border border-line bg-surface p-4">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">{c.name}</span>
                        <Badge variant={c.is_active ? 'default' : 'muted'}>{c.is_active ? 'Active' : 'Inactive'}</Badge>
                    </div>
                    
                    <div className="mt-1 text-sm tabular-nums">Balance: {formatKsh(c.current_balance)}</div>
                    <div className="text-sm tabular-nums text-muted">Available: {formatKsh(c.available_credit)}</div>
                </Link>
            ))}
        </div>
    </>
    )
}