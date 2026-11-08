import api from './client'

export const getMyProfile = () => api.get('/users/me/')

export const listLeave = () => api.get('/leave/')
export const applyForLeave = (formData) =>
  api.post('/leave/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const cancelLeave = (id) => api.delete(`/leave/${id}/`)
export const reviewLeave = (id, payload) => api.post(`/leave/${id}/review/`, payload)

export const listUsers = () => api.get('/users/')
export const updateUser = (id, payload) => api.patch(`/users/${id}/`, payload)

export async function downloadReport(path, filename) {
  const res = await api.get(path, { responseType: 'blob' })
  const url = window.URL.createObjectURL(res.data)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(url)
}