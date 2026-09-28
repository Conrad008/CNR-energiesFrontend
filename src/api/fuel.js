import api from './client'
export const listFuelProducts = () => api.get('/fuel-products/')
export const updateFuelPrice = (productId, price) => api.post(`/fuel-products/${productId}/update-price/`, { price })