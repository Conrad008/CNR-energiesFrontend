import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, Fuel } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/shifts', label: 'Shifts', icon: Fuel },
]

function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to} to={to} end={end} onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              isActive ? 'bg-primary text-on-primary' : 'text-muted hover:bg-line/50 hover:text-ink'
            }`}
        >
          <Icon size={18} /> {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function AppShell() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()

    return (
        <div className="min-h-screen bg-app text-ink">
            <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-surface md:block">
                <div className="px-6 py-5 text-lg font-bold text-primary">CNR Energies</div>
                <NavLinks />
            </aside>

            {open && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
                    <aside className="relative h-full w-64 border-r border-line bg-surface">
                        <div className="flex items-center justify-between px-6 py-5">
                            <span className="text-lg font-bold text-primary">CNR Energies</span>
                            <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
                        </div>
                        <NavLinks onNavigate={() => setOpen(false)} />
                    </aside>
                </div>
            )}

            <div className="md:pl-64">
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface px-4 py-3">
                    <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
                        <Menu size={22} />
                    </button>
                    <div className="hidden text-sm text-muted md:block">
                        {user?.first_name} {user?.last_name} · {user?.role}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={toggle} className="rounded-lg p-2 hover:bg-line/50" aria-label="Toggle theme">
                            {dark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button onClick={logout} className="rounded-lg p-2 hover:bg-line/50" aria-label="Log out">
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>
                <main className="mx-auto max-w-6xl p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}