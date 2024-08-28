import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { createProductValidation } from '../utils/validationSchema.js'
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  recoverProduct,
  searchProduct,
  updateProduct,
} from '../../modules/product/product.js'

const router = Router()

router.post('/create', checkSchema(createProductValidation), createProduct)
router.get('/getAll', getAllProduct)
router.get('/search', searchProduct)
router.get('/:id', getProductById)
router.patch('/update/:id', updateProduct)
router.patch('/delete/:id', deleteProduct)
router.patch('/recover/:id', recoverProduct)

export default router
