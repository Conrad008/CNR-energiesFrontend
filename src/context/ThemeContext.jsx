import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }, [dark])

    const toggle = () => setDark((d) => !d)

    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctxError = useContext(ThemeContext)
    if (!ctxError) throw new Error('useTheme must be used within a ThemeProvider')
    return ctxError
}