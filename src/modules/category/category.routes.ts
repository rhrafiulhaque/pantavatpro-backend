import express from 'express'
import validateRequest from '../../app/middleware/validateRequest'
import { categoryController } from './category.controller'
import { CategoryValidation } from './category.validation'
const router = express.Router()
router.post(
  '/add-category-item',
  validateRequest(CategoryValidation.CategoryValidationZodSchema),
  categoryController.addCategory,
)
router.get('/get-all-category', categoryController.getAllCategory)

export const categoryRoutes = router
