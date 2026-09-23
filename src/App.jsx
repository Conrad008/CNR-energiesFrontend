import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedRoute from './auth/ProtectedRoute'
import AppShell from './components/layout/Appshell'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Shifts from './pages/Shifts'
import ShiftDetailPage from './pages/ShiftDetailPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AppShell />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/shifts" element={<Shifts />} />
                  <Route path="/shifts/:id" element={<ShiftDetailPage />} />
                </Route>
              </Route>
            </Routes>
          </Router>
    </QueryClientProvider>
  )
}
