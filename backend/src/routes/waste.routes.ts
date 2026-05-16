import { Router } from "express"
import { getWasteLogs, addWasteLog, deleteWasteLog } from "../controllers/waste.controller"
import { authenticate } from "../middleware/auth"

const router = Router()

router.use(authenticate)

router.get("/", getWasteLogs)
router.post("/", addWasteLog)
router.delete("/:id", deleteWasteLog)

export default router