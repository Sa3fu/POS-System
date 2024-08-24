import { Router, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { createUserValidation } from '../utils/validationSchema.js'
import '../strategies/local-strategy.js'
import { createUser } from '../../modules/user/create.js'
import { authenticateUser, checkAuthStatus } from '../../modules/user/authenticateUser.js'
import { authenticateJWT } from '../../middlewares/authenticateJwt.js'

const router = Router()

router.post('/createUser', checkSchema(createUserValidation), createUser)

router.post('/auth', authenticateUser)

router.get('/auth/status', authenticateJWT, checkAuthStatus)

export default router
