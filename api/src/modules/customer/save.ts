import { Request, Response } from 'express'
import { Customer } from '../../models/entity/customer.entity.js'
import Joi from 'joi'
import { validate } from '../../common/utils/_validate.js'

export const save = async (req: Request, res: Response) => {
  const phoneNumberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/
  validate(
    req,
    res,
    Joi.object({
      name: Joi.string().required().pattern(phoneNumberPattern),
      phoneNumber: Joi.string().required(),
      email: Joi.string().email().optional(),
    })
  )

  const { id, ...fields } = req.body

  let customer
  try {
    if (id) {
      customer = await Customer.update(parseInt(id), fields)
      return res.status(200).send(customer)
    } else {
      customer = Customer.create({
        ...fields,
      })

      await customer.save()
    }

    return res
      .status(201)
      .send({ success: true, message: 'Customer created successfully', data: customer })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
