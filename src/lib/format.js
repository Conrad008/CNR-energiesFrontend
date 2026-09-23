export const formatKsh = (n) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 2 }).format(Number(n) || 0)

export const formatDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' }) : '—'