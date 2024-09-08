import { Request, Response } from 'express'
import { Products } from '../../models/entity/product.entity.js'

export const detail = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    if (id) {
      const data = await Products.find({
        where: {
          id: parseInt(id),
          isDeleted: false,
        },
      })
      return res.status(201).send({ data })
    } else {
      const data = await Products.find({
        where: {
          isDeleted: false,
        },
      })
      return res.status(201).send({ success: true, data })
    }
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
