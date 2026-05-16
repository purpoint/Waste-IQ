import { Router } from "express"
import { body } from "express-validator"
import { getWasteLogs, addWasteLog, deleteWasteLog } from "../controllers/waste.controller"
import { authenticate } from "../middleware/auth"
import { validate } from "../middleware/validate"

const router = Router()

router.use(authenticate)

router.get("/", getWasteLogs)

router.post(
  "/",
  [
    body("itemName")
      .trim()
      .notEmpty()
      .withMessage("Item name is required")
      .isLength({ max: 100 })
      .withMessage("Item name must be under 100 characters"),
    body("quantity")
      .isFloat({ min: 0 })
      .withMessage("Quantity must be a positive number"),
    body("unit")
      .trim()
      .notEmpty()
      .withMessage("Unit is required"),
    body("reason")
      .trim()
      .notEmpty()
      .withMessage("Reason is required"),
    body("cost")
      .isFloat({ min: 0 })
      .withMessage("Cost must be a positive number"),
  ],
  validate,
  addWasteLog
)

router.delete("/:id", deleteWasteLog)

export default router