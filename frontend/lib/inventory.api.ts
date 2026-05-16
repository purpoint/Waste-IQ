import api from "./api"

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  expiryDate: string | null
  costPrice: number
  category: string
  supplier: string | null
  storageType: string
  createdAt: string
}

export const getInventoryApi = async () => {
  const response = await api.get("/inventory")
  return response.data
}

export const addInventoryItemApi = async (data: Omit<InventoryItem, "id" | "createdAt">) => {
  const response = await api.post("/inventory", data)
  return response.data
}

export const updateInventoryItemApi = async (id: string, data: Partial<InventoryItem>) => {
  const response = await api.put(`/inventory/${id}`, data)
  return response.data
}

export const deleteInventoryItemApi = async (id: string) => {
  const response = await api.delete(`/inventory/${id}`)
  return response.data
}