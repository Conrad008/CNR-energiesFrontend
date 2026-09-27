import api from './client'
export const listTanks = () => api.get('/tanks/')
export const recordDip = (tankId, payload) => api.post(`/tanks/${tankId}/dip/`, payload)
export const getTankVariance = (tankId) => api.get(`/tanks/${tankId}/variance/`)