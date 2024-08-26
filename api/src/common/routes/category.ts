import { Router } from 'express'
import { createCategoryValidation } from '../utils/validationSchema.js'
import { checkSchema } from 'express-validator'
import { createCategory } from '../../modules/category/category.js'

const router = Router()

router.post('/create', checkSchema(createCategoryValidation), createCategory)

export default router
