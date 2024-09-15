import { Request, Response } from 'express'
import { Customer } from '../../models/entity/customer.entity.js'
import { Payment } from '../../models/entity/payments.entity.js'
import { Sales } from '../../models/entity/sales.entity.js'
import { SaleProduct } from '../../models/entity/saleProducts.entity.js'
import { Inventory } from '../../models/entity/inventory.entity.js'

export const save = async (req: Request, res: Response) => {
  const { customerId, userId, productId, ...fields } = req.body

  let saleProduct
  let customer
  try {
    const totalQuantity = await Inventory.createQueryBuilder('inventory')
      .where('inventory.product = :productId', { productId })
      .select('SUM(inventory.quantity)', 'sum')
      .getRawOne()

    console.log(totalQuantity, fields.quantity)

    if (totalQuantity.sum < fields.quantity) {
      return res.status(400).send({
        success: false,
        message: `${fields.quantity} quantity is not available in inventory`,
      })
    } else {
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

      saleProduct = await SaleProduct.create({
        ...fields,
        product: productId,
        sale: sale,
      })

      await saleProduct.save()

      const inventory = await Inventory.create({
        ...fields,
        saleProduct: saleProduct,
        product: productId,
        quantity: -Math.abs(fields.quantity),
      })

      await inventory.save()

      return res
        .status(201)
        .send({ success: true, message: 'Sales created successfully', data: saleProduct })
    }
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
