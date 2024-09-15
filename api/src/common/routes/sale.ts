import { Router } from 'express'
import { save } from '../../modules/sale/save.js'
import { detail } from '../../modules/sale/detail.js'

const router = Router()

router.post('/save', save)
router.get('/detail', detail)

export default router
