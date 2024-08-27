import { Router } from 'express'
import userRouter from './user.js'
import categoryRouter from './category.js'
import productRouter from './products.js'
const router = Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)

export default router
