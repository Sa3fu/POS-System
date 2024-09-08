import { Router } from 'express'
import { save } from '../../modules/customer/save'
import { remove } from '../../modules/customer/remove'
import { detail } from '../../modules/customer/detail'

const router = Router()

router.post('/save', save)
router.post('/remove', remove)
router.get('/detail', detail)

export default router
