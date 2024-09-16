import { Request, Response } from 'express'
import { Category } from '../../models/entity/category.entity.js'

export const detail = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    if (id) {
      const data = await Category.find({
        where: {
          id: parseInt(id),
          isDelete: false,
        },
      })
      return res.status(201).send({ data })
    } else {
      const data = await Category.find({
        where: {
          isDelete: false,
        },
      })
      return res.status(201).send({ success: true, data })
    }
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
