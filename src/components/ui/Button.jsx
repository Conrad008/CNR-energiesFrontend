export default function Button({ variant = 'primary', className = '', children, ...props }) {
    const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60'
    const variants = {
        primary: 'bg-primary text-on-primary hover:opacity-90',
        outline: 'border border-line text-ink hover:bg-line/30',
    }
}