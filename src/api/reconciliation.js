import api from './client'
export const reconcileShift = (shiftId, payload) => api.post(`/shifts/${shiftId}/reconcile/`, payload)