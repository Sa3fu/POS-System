import { Request, Response } from 'express'
import { SaleProduct } from '../../models/entity/saleProducts.entity.js'

export const detail = async (req: Request, res: Response) => {
  try {
    const data = await SaleProduct.createQueryBuilder('saleProduct')
      .leftJoin('saleProduct.sale', 'sale')
      .leftJoin('saleProduct.product', 'product')
      .leftJoin('sale.payment', 'payment')
      .leftJoin('sale.customer', 'customer')
      .leftJoin('sale.user', 'user')
      .select([
        'product.brand',
        'product.model',
        'product.price',
        'saleProduct.quantity',
        'saleProduct.priceAtSale',
        'sale.id',
        'payment.paymentMethod',
        'payment.paymentDate',
        'customer.name',
        'customer.phoneNumber',
        'user.username',
      ])
      .groupBy('sale.id, saleProduct.id')
      .getRawMany()

    return res.status(200).send({ success: true, data: data })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
