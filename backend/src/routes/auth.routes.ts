import { Router } from "express"
import { body } from "express-validator"
import { register, login, getMe } from "../controllers/auth.controller"
import { authenticate } from "../middleware/auth"
import { validate } from "../middleware/validate"

const router = Router()

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 100 })
      .withMessage("Name must be under 100 characters"),
    body("restaurantName")
      .trim()
      .notEmpty()
      .withMessage("Restaurant name is required")
      .isLength({ max: 100 })
      .withMessage("Restaurant name must be under 100 characters"),
  ],
  validate,
  register
)

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validate,
  login
)

router.get("/me", authenticate, getMe)

export default router