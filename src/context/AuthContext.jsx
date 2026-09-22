import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import api, { tokens } from '../api/client'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(!!tokens.access)

    useEffect(() => {
        if (!tokens.access) return
        api.get('/users/me/')
            .then((r) => setUser(r.data))
            .catch(() => tokens.clear())
            .finally(() => setLoading(false))

    }, [])

    const login = useCallback(async (email, password) => {
        const { data } = await api.post('/auth/login/', { email, password })
        tokens.set(data)
        setUser(data.user)
    }, [])

    const logout = useCallback(() => { tokens.clear(); setUser(null) }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

