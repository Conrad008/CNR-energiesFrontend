export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 ${className}`}
      {...props}
    />
  )
}