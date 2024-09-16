import { Router } from 'express'
import { save } from '../../modules/category/save.js'
import { remove } from '../../modules/category/remove.js'
import { detail } from '../../modules/category/detail.js'

const router = Router()

router.post('/save', save)
router.post('remove', remove)
router.get('/detail', detail)
export default router
