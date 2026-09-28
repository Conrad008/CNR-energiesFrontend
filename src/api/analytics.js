import api from './client'
export const getDashboard = (days = 30) => api.get(`/analytics/dashboard/?days=${days}`)
export const getStockSummary = () => api.get('/analytics/stock-summary/')