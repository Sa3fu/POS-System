import { Request, Response } from 'express'
import {
  getAllProductsWithSumQuantity,
  getProductByIdWithSumQuantity,
} from '../../common/repositories/productRepository.js'
import { getPaginationParams, getSortParams } from '../../common/utils/paginationSort.js'

export const detail = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const paginationParams = getPaginationParams(req.query)
    const sortParams = getSortParams(req.query)

    if (id) {
      const data = await getProductByIdWithSumQuantity(parseInt(id))
      return res.status(201).send({ data })
    } else {
      const { data, totalCount } = await getAllProductsWithSumQuantity(paginationParams, sortParams)

      const totalPages = Math.ceil(totalCount / paginationParams.limit)

      return res
        .status(201)
        .send({ success: true, data, totalPages, currentPage: paginationParams.page })
    }
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
