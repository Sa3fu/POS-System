import { Router } from 'express'
import { save } from '../../modules/customer/save.js'
import { remove } from '../../modules/customer/remove.js'
import { detail } from '../../modules/customer/detail.js'

const router = Router()

router.post('/save', save)
router.post('/remove', remove)
router.get('/detail', detail)

export default router
