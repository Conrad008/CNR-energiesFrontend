import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import api, { tokens } from '../api/client'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!tokens.access)
  
}
