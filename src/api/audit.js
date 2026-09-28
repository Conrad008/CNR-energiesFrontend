import api from './client'
export const listAuditLogs = () => api.get('/audit-logs/')