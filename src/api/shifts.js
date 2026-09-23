import api from './client'
export const startShift = (station, opening_cash_float) =>
  api.post('/shifts/start/', { station, opening_cash_float })
export const closeMeters = (shiftId, readings) =>
  api.post(`/shifts/${shiftId}/close-meters/`, { readings })
export const listShifts = () => api.get('/shifts/')