import { Request, Response } from 'express'
import { Inventory } from '../../models/entity/inventory.entity.js'
import { getPaginationParams, getSortParams } from '../../common/utils/paginationSort.js'

export const detail = async (req: Request, res: Response) => {
  try {
    // Get pagination and sorting params from utility functions
    const { page, limit, offset } = getPaginationParams(req.query)
    const { sortOrder } = getSortParams(req.query)

    // Fetch data with pagination and sorting
    const data = await Inventory.createQueryBuilder('inventory')
      .innerJoin('inventory.product', 'product')
      .leftJoin('product.category', 'category')
      .select([
        'inventory.id',
        'product.brand',
        'product.model',
        'product.sku',
        'product.id',
        'inventory.quantity',
        'category.name',
      ])
      .orderBy('inventory.id', sortOrder)
      .skip(offset)
      .take(limit)
      .getRawMany()

    // Get the total count of items for pagination
    const totalCount = await Inventory.createQueryBuilder('inventory')
      .innerJoin('inventory.product', 'product')
      .leftJoin('product.category', 'category')
      .getCount()

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit)

    return res.status(200).send({
      success: true,
      data,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
