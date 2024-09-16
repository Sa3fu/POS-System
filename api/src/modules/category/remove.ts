import { Request, Response } from 'express'
import { Category } from '../../models/entity/category.entity.js'

//Update product PATCH
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const data = await Category.update(parseInt(id), { isDelete: true })
    return res.status(201).send({ success: true, message: 'Category removed successfully', data })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
