import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedRoute from './auth/ProtectedRoute'
import AppShell from './components/layout/Appshell'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Shifts from './pages/Shifts'
import ShiftDetailPage from './pages/ShiftDetailPage'
import CreditCustomers from './pages/CreditCustomers'
import CreditCustomerDetail from './pages/CreditCustomerDetail'
import Tanks from './pages/Tanks'
import FuelProducts from './pages/FuelProducts'
import Users from './pages/Users'
import AuditLog from './pages/AuditLog'

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
                  <Route path="/credit" element={<CreditCustomers />} />
                  <Route path="/credit/:id" element={<CreditCustomerDetail />} />
                  <Route path="/tanks" element={<Tanks />} />
                </Route>
              <Route path="/fuel-products" element={<FuelProducts />} />
              <Route element={<ProtectedRoute roles={['SUPER_ADMIN']} />}>
                <Route path="/users" element={<Users />} />
                <Route path="/audit-logs" element={<AuditLog />} />
              </Route>
              </Route>
            </Routes>
          </Router>
    </QueryClientProvider>
  )
}
