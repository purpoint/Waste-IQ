import api from "./api"

export interface WasteLog {
  id: string
  itemName: string
  quantity: number
  unit: string
  reason: string
  cost: number
  createdAt: string
}

export const getWasteLogsApi = async () => {
  const response = await api.get("/waste")
  return response.data
}

export const addWasteLogApi = async (data: {
  itemName: string
  quantity: string
  unit: string
  reason: string
  cost: string
}) => {
  const response = await api.post("/waste", data)
  return response.data
}

export const deleteWasteLogApi = async (id: string) => {
  const response = await api.delete(`/waste/${id}`)
  return response.data
}