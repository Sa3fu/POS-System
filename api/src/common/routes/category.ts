import { Router } from 'express'
import { createCategoryValidation } from '../utils/validationSchema.js'
import { checkSchema } from 'express-validator'
import { createCategory, getCategory, getCategoryById } from '../../modules/category/category.js'

const router = Router()

router.post('/create', checkSchema(createCategoryValidation), createCategory)
router.get('/getAll', getCategory)
router.get('/get/:id', getCategoryById)

export default router
