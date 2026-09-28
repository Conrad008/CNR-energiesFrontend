import { AlertTriangle } from 'lucide-react'

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="rounded-xl border border-danger/40 bg-danger/5 p-6 text-center">
      <AlertTriangle className="mx-auto mb-2 text-danger" size={24} />
      <p className="text-sm text-danger">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 text-sm font-medium text-primary hover:underline">
          Try again
        </button>
      )}
    </div>
  )
}