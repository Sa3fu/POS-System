import { Request, Response } from 'express'
import {
  getAllProductsWithSumQuantity,
  getProductByIdWithSumQuantity,
} from '../../common/repositories/productRepository.js'

export const detail = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    if (id) {
      const data = await getProductByIdWithSumQuantity(parseInt(id))
      return res.status(201).send({ data })
    } else {
      const data = await getAllProductsWithSumQuantity()

      return res.status(201).send({ success: true, data })
    }
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
