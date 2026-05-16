import api from "./api"

export const registerApi = async (data: {
  email: string
  password: string
  name: string
  restaurantName: string
}) => {
  const response = await api.post("/auth/register", data)
  return response.data
}

export const loginApi = async (data: {
  email: string
  password: string
}) => {
  const response = await api.post("/auth/login", data)
  return response.data
}

export const getMeApi = async () => {
  const response = await api.get("/auth/me")
  return response.data
}