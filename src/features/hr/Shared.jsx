export const LEAVE_TYPES = [
  { value: 'ANNUAL', label: 'Annual leave' },
  { value: 'MATERNITY', label: 'Maternity leave' },
  { value: 'PATERNITY', label: 'Paternity leave' },
  { value: 'SICK', label: 'Sick leave' },
]

export const leaveTypeLabel = (v) => LEAVE_TYPES.find((t) => t.value === v)?.label ?? v

export const inputCls =
  'w-full rounded-lg border border-line bg-app px-3 py-2 text-sm outline-none focus:border-primary'
export const btnPrimary =
  'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary disabled:opacity-60'
export const btnGhost =
  'rounded-lg border border-line px-4 py-2 text-sm font-medium hover:bg-line/50 disabled:opacity-60'

const STATUS_STYLE ={
  PENDING: 'bg-amber-500/15 text-amber-500',
  APPROVED: 'bg-green-500/15 text-green-500',
  REJECTED: 'bg-red-500/15 text-red-500',
  CANCELLED: 'bg-line text-muted',

}

export function statusBadge ({status}) {
  const label = status ? status.charAt(0) + status.slice(1).toLowerCase() : ''
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[status] ?? 'bg-line text-muted'}`}
    >
      {label}
    </span>
  )
}

export function errMsg(err, fallback = 'Something went wrong. Please try again.') {
  const d = err?.response?.data
  if (!d) return fallback
  if (typeof d === 'string') return d.length < 200 ? d : fallback
  if (d.error) return d.error
  if (d.detail) return d.detail
  const parts = Object.entries(d).map(([k, v]) => {
    const text = Array.isArray(v) ? v.join(' ') : String(v)
    return k === 'non_field_errors' ? text : `${k.replace(/_/g, ' ')}: ${text}`
  })
  return parts.join(' · ') || fallback
}

export function daysBetween(from, to) {
  if (!from || !to) return 0
  const d = Math.round((new Date(to) - new Date(from)) / 86400000) + 1
  return d > 0 ? d : 0
}

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '—')

export const fmtKes = (n) =>
  n === null || n === undefined || n === ''
    ? '—'
    : Number(n).toLocaleString('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 })

export const todayLocal = () => new Date().toLocaleDateString('en-CA')