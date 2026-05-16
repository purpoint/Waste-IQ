import api from "./api"

export const getAIInsightsApi = async () => {
  const response = await api.get("/ai/insights")
  return response.data
}

export const chatWithAIApi = async (message: string, history: { role: string; content: string }[]) => {
  const response = await api.post("/ai/chat", { message, history })
  return response.data
}