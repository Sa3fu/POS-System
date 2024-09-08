import { Request, Response } from 'express'
import { Products } from '../../models/entity/product.entity.js'
import Joi from 'joi'
import { validate } from '../../common/utils/_validate.js'

//Update product PATCH
export const remove = async (req: Request, res: Response) => {
  validate(
    req,
    res,
    Joi.object({
      id: Joi.string().required(),
    })
  )
  try {
    const { id } = req.body

    const data = await Products.update(parseInt(id), { isDeleted: true })
    return res.status(201).send({ success: true, message: 'Product removed successfully', data })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
