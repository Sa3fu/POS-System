import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { createProductValidation } from '../utils/validationSchema.js'
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductByCategory,
  getProductById,
  recoverProduct,
  searchProduct,
  updateProduct,
} from '../../modules/product/product.js'

const router = Router()

router.post('/create', checkSchema(createProductValidation), createProduct)
router.post('/update/:id', updateProduct)
router.post('/delete/:id', deleteProduct)
router.post('/recover/:id', recoverProduct)
router.get('/getAll', getAllProduct)
router.get('/search', searchProduct)
router.get('/:id', getProductById)
router.get('/category/:categoryId', getProductByCategory)

export default router
