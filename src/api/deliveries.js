import api from './client'
export const listTanksForDelivery = () => api.get('/tanks/')
export const recordDelivery = (payload) => api.post('/deliveries/', payload)