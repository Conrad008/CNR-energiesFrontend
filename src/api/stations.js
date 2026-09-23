import api from './client'
export const listStations = () => api.get('/stations/')