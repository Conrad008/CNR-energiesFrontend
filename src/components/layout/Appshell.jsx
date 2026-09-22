import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, Fuel } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/shifts', label: 'Shifts', icon: Fuel },
]