import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
// import AppShell from './components/layout/AppShell'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient()

function App() {

  return (
    <>
    </>
  )
}

export default App
