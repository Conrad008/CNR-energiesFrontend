import { formatLiters } from '@/lib/format'

export default function TankList({ tanks, onSelect }) {
  if (!tanks.length) return <p className="text-sm text-muted">No tanks set up yet.</p>

}