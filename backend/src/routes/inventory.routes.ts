import { Router } from "express"
import { body } from "express-validator"
import {
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventory.controller"
import { authenticate } from "../middleware/auth"
import { validate } from "../middleware/validate"

const router = Router()

router.use(authenticate)

router.get("/", getInventory)

router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Item name is required")
      .isLength({ max: 100 })
      .withMessage("Name must be under 100 characters"),
    body("quantity")
      .isFloat({ min: 0 })
      .withMessage("Quantity must be a positive number"),
    body("unit")
      .trim()
      .notEmpty()
      .withMessage("Unit is required"),
    body("costPrice")
      .isFloat({ min: 0 })
      .withMessage("Cost price must be a positive number"),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Category is required"),
    body("storageType")
      .trim()
      .notEmpty()
      .withMessage("Storage type is required"),
    body("expiryDate")
      .optional()
      .isISO8601()
      .withMessage("Expiry date must be a valid date"),
  ],
  validate,
  addInventoryItem
)

router.put("/:id", authenticate, updateInventoryItem)
router.delete("/:id", authenticate, deleteInventoryItem)

export default router