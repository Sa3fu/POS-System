import { Request, Response } from 'express'
import Joi from 'joi'
import { validate } from '../../common/utils/_validate.js'
import { Customer } from '../../models/entity/customer.entity.js'

//Update product PATCH
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const data = await Customer.update(parseInt(id), { isDelete: true })
    return res.status(201).send({ success: true, message: 'Customer removed successfully', data })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
