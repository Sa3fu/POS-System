import { Request, Response } from 'express'
import { Products } from '../../models/entity/product.entity.js'
import Joi from 'joi'
import { validate } from '../../common/utils/_validate.js'

//Update product PATCH
export const save = async (req: Request, res: Response) => {
  validate(
    req,
    res,
    Joi.object({
      id: Joi.string(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      price: Joi.number().required(),
      sku: Joi.string().required(),
      barcode: Joi.string().required(),
      category: Joi.number().required(),
      isEnabled: Joi.boolean().optional,
    })
  )

  const { id } = req.body
  const fields = req.body

  let product
  try {
    if (id) {
      product = await Products.update(parseInt(id), fields)
      return res.status(200).send(product)
    } else {
      product = Products.create({
        ...fields,
      })

      await product.save()
    }

    return res
      .status(201)
      .send({ success: true, message: 'Product created successfully', data: product })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
