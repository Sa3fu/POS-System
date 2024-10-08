import { Router } from 'express'
import { save } from '../../modules/inventory/save.js'
import { detail } from '../../modules/inventory/detail.js'

const router = Router()

router.post('/save', save)
router.get('/detail', detail)

export default router
