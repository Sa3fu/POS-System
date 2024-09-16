import { Request, Response } from 'express'
import Joi from 'joi'
import { validate } from '../../common/utils/_validate.js'
import { Category } from '../../models/entity/category.entity.js'

export const save = async (req: Request, res: Response) => {
  validate(
    req,
    res,
    Joi.object({
      name: Joi.string().required(),
    })
  )

  const { id, ...fields } = req.body

  let customer
  try {
    if (id) {
      customer = await Category.update(parseInt(id), fields)
      return res.status(200).send(customer)
    } else {
      customer = Category.create({
        ...fields,
      })

      await customer.save()
    }

    return res
      .status(201)
      .send({ success: true, message: 'Category created successfully', data: customer })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
