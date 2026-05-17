import api from "./api"

export const getAnalyticsApi = async () => {
  const response = await api.get("/analytics")
  return response.data
}

export const getDashboardStatsApi = async () => {
  const response = await api.get("/analytics/dashboard")
  return response.data
}