import { Router } from 'express'
import { save } from '../../modules/product/save.js'
import { remove } from '../../modules/product/remove.js'
import { detail } from '../../modules/product/detail.js'

const router = Router()

router.post('/save', save)

router.post('/remove', remove)

router.get('/detail', detail)

export default router
