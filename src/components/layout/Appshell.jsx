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