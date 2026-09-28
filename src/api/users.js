import api from './client'
export const listUsers = () => api.get('/users/')
export const createUser = (payload) => api.post('/users/', payload)
export const updateUser = (id, payload) => api.patch(`/users/${id}/`, payload)