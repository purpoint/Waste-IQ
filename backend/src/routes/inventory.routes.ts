import { Router } from "express"
import {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventory.controller"
import { authenticate } from "../middleware/auth"

const router = Router()

router.use(authenticate)

router.get("/", getInventory)
router.post("/", addInventoryItem)
router.put("/:id", updateInventoryItem)
router.delete("/:id", deleteInventoryItem)

export default router