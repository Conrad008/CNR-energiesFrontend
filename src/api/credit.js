import api from './client'
export const listCustomers = () => api.get('/credit-customers/')
export const getCustomer = (id) => api.get(`/credit-customers/${id}/`)
export const createCustomer = (payload) => api.post('/credit-customers/', payload)
export const recordCreditSale = (customerId, payload) => api.post(`/credit-customers/${customerId}/sales/`, payload)
export const recordCreditPayment = (customerId, payload) => api.post(`/credit-customers/${customerId}/payments/`, payload)