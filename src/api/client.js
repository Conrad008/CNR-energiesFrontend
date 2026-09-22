import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })

export const tokens = {
  get access() { return localStorage.getItem('access') },
  get refresh() { return localStorage.getItem('refresh') },
  set({ access, refresh }) {
    if (access) localStorage.setItem('access', access)
    if (refresh) localStorage.setItem('refresh', refresh)
  },
  clear() { localStorage.removeItem('access'); localStorage.removeItem('refresh') },
}

api.interceptors.request.use((config) => {
  if (tokens.access) config.headers.Authorization = `Bearer ${tokens.access}`
  return config
})

let refreshing = null

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const isAuthCall = original?.url?.includes('/auth/')
    if (error.response?.status === 401 && !original._retry && !isAuthCall && tokens.refresh) {
      original._retry = true
      refreshing ??= axios
        .post(`${api.defaults.baseURL}/auth/refresh/`, { refresh: tokens.refresh })
        .then((r) => { tokens.set(r.data); return r.data.access })
        .catch((e) => { tokens.clear(); window.location.assign('/login'); throw e })
        .finally(() => { refreshing = null })
      const access = await refreshing
      original.headers.Authorization = `Bearer ${access}`
      return api(original)
    }
    return Promise.reject(error)
  }
)

export default api