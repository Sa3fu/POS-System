import { Router } from 'express'
import userRouter from './user.js'
import categoryRouter from './category.js'
import productRouter from './products.js'
import customerRouter from './customer.js'
import inventoryRouter from './inventory.js'

const router = Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/customer', customerRouter)
router.use('/inventory', inventoryRouter)

export default router
