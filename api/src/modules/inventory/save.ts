import { Request, Response } from 'express'
import Joi from 'joi'
import { validate } from '../../common/utils/_validate.js'
import { Inventory } from '../../models/entity/inventory.entity.js'
import { Products } from '../../models/entity/product.entity.js'

//Update product PATCH
export const save = async (req: Request, res: Response) => {
  validate(
    req,
    res,
    Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
    })
  )

  const { productId, ...fields } = req.body

  let inventory
  try {
    const product = await Products.findOne({ where: { id: parseInt(productId) } })
    inventory = await Inventory.create({
      ...fields,
      product,
    })
    await inventory.save()

    return res
      .status(201)
      .send({ success: true, message: 'Inventory created successfully', data: inventory })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
