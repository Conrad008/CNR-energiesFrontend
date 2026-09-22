import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import { ThemeProvider } from './context/ThemeContext'
// import AppShell from './components/layout/AppShell'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppShell />}>
                    <Route index element={<Dashboard />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </AuthProvider> 
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
