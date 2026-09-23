const styles = {
  default: 'bg-primary/15 text-primary',
  muted: 'bg-line/40 text-muted',
  outline: 'border border-line text-ink',
}

export default function Badge({ variant = 'default', children }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}