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
        </table>
    </>
    )
}