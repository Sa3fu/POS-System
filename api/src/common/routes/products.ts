import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { createProductValidation } from '../utils/validationSchema.js'
import { createProduct, getAllProduct, getProductById } from '../../modules/product/product.js'

const router = Router()

router.post('/create', checkSchema(createProductValidation), createProduct)
router.get('/getAll', getAllProduct)
router.get('/:id', getProductById)

export default router
