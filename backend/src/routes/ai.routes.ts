import { Router } from "express"
import { getAIInsights, chatWithAI } from "../controllers/ai.controller"
import { authenticate } from "../middleware/auth"

const router = Router()

router.use(authenticate)

router.get("/insights", getAIInsights)
router.post("/chat", chatWithAI)

export default router