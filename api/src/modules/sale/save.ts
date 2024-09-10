import { Request, Response } from 'express'
import { Customer } from '../../models/entity/customer.entity.js'
import { Payment } from '../../models/entity/payments.entity.js'

export const save = async (req: Request, res: Response) => {
  const { customerId, name, ...fields } = req.body

  let sale
  let customer
  try {
    if (customerId) {
      await Customer.findOne({ where: { id: parseInt(customerId) } })
    } else if (name) {
      await Customer.findOne({ where: { name } })
    } else {
      customer = await Customer.create({
        ...fields,
      })

      await customer.save()
    }

    const payment = await Payment.create({
      ...fields,
      customer: customer,
    })

    await payment.save()

    return res
      .status(201)
      .send({ success: true, message: 'Customer created successfully', data: sale })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
