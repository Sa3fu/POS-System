import { Router } from 'express'
import userRouter from './user.js'
import categoryRouter from './category.js'
const router = Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)

export default router
