import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { tokens } from '../api/client'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(!!tokens.access)

    useEffect(() => {
        if (!tokens.access) return
        authApi.me()
            .then((r) => setUser(r.data))
            .catch(() => tokens.clear())
            .finally(() => setLoading(false))
    }, [])

    const login = useCallback(async (email, password) => {
        const { data } = await authApi.login(email, password)
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