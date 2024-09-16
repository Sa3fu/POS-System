import { Router } from 'express'
import '../strategies/local-strategy.js'
import { authenticateUser } from '../../modules/user/authenticateUser.js'
import { save } from '../../modules/user/save.js'
import { remove } from '../../modules/user/remove.js'
import { detail } from '../../modules/user/detail.js'

const router = Router()

router.post('/save', save)
router.post('/auth', authenticateUser)
router.post('/remove', remove)
router.get('/detail', detail)

export default router
