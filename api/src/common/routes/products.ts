import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { createProductValidation } from '../utils/validationSchema.js'
import { createProduct } from '../../modules/product/product.js'

const router = Router()

router.post('/create', checkSchema(createProductValidation), createProduct)

export default router
