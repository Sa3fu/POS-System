import { Router } from 'express'
import { save } from '../../modules/inventory/save.js'

const router = Router()

router.post('/save', save)

export default router
