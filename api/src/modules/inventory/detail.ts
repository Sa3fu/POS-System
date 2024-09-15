import { Request, Response } from 'express'
import { Inventory } from '../../models/entity/inventory.entity.js'

export const detail = async (req: Request, res: Response) => {
  try {
    const data = await Inventory.createQueryBuilder('inventory')
      .innerJoin('inventory.product', 'product')
      .leftJoin('product.category', 'category')
      .select([
        'product.brand',
        'product.model',
        'product.id',
        'inventory.quantity',
        'category.name',
      ])
      .getMany()
    return res.status(201).send({ success: true, data })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
