import api from './client'
export const initiateSTKPush = (payload) => api.post('/mpesa/stk-push/', payload)
export const getMpesaStatus = (checkoutId) => api.get(`/mpesa/status/${checkoutId}/`)