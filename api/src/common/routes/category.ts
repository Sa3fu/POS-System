import { Router } from 'express'
import { createCategoryValidation } from '../utils/validationSchema.js'
import { checkSchema } from 'express-validator'
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from '../../modules/category/category.js'

const router = Router()

router.post('/create', checkSchema(createCategoryValidation), createCategory)
router.post('/update/:id', updateCategory)
router.post('/delete/:id', deleteCategory)
router.get('/getAll', getCategory)
router.get('/get/:id', getCategoryById)

export default router
