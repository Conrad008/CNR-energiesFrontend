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

