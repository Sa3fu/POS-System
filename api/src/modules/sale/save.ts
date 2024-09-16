import { Request, Response } from 'express'
import { Customer } from '../../models/entity/customer.entity.js'
import { Payment } from '../../models/entity/payments.entity.js'
import { Sales } from '../../models/entity/sales.entity.js'
import { SaleProduct } from '../../models/entity/saleProducts.entity.js'
import { Inventory } from '../../models/entity/inventory.entity.js'

export const save = async (req: Request, res: Response) => {
  const { customerId, userId, productId, products, quantity, priceAtSale, ...fields } = req.body

  let saleProducts = []
  let customer
  try {
    for (const product of products) {
      const { productId, quantity } = product

      const totalQuantity = await Inventory.createQueryBuilder('inventory')
        .where('inventory.product = :productId', { productId })
        .select('SUM(inventory.quantity)', 'sum')
        .getRawOne()

      if (totalQuantity.sum < quantity) {
        return res.status(400).send({
          success: false,
          message: `${quantity} quantity is not available in inventory`,
        })
      }
    }
    if (customerId) {
      customer = await Customer.findOne({ where: { id: parseInt(customerId) } })
    } else {
      customer = await Customer.create({
        ...fields,
      })

      await customer.save()
    }

    const payment = await Payment.create({
      ...fields,
    })

    await payment.save()

    const sale = await Sales.create({
      customer: customer,
      payment: payment,
      user: userId,
    })

    await sale.save()

    for (const product of products) {
      const { productId, quantity, priceAtSale } = product

      const saleProduct = await SaleProduct.create({
        ...fields,
        product: productId,
        sale: sale,
        quantity: quantity,
        priceAtSale: priceAtSale,
      })

      await saleProduct.save()
      saleProducts.push(saleProduct)

      const inventory = await Inventory.create({
        ...fields,
        saleProduct: saleProduct,
        product: productId,
        quantity: -Math.abs(quantity),
      })

      await inventory.save()
    }

    return res
      .status(201)
      .send({ success: true, message: 'Sales created successfully', data: saleProducts })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
