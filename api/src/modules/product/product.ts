import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { Products } from '../../models/entity/product.entity.js'
import { Category } from '../../models/entity/category.entity.js'
import { DeepPartial } from 'typeorm'

//Create new product POST
export const createProduct = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const error = result.array().map((err) => err.msg)
    return res.status(400).send({ error: error })
  }

  const data = matchedData(req)

  if (isNaN(data.categoryId)) {
    return res.status(400).send({ success: false, message: 'Invalid categoryId: must be a number' })
  }

  //Ensure category id is valid
  const category = await Category.findOneBy({ id: data.categoryId })
  if (!category) {
    return res.status(400).send({ success: false, message: 'Invalid categoryId' })
  }

  const newProduct = Products.create({
    ...data,
    isAvailable: false,
    category: category,
  } as DeepPartial<Products>)

  try {
    const saveProduct = await newProduct.save()
    return res
      .status(201)
      .send({ success: true, message: 'Product created successfully', data: saveProduct })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error in creating Product',
      error: error.message,
    })
  }
}
