import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { Category } from '../../models/entity/category.entity.js'

export const createCategory = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const error = result.array().map((err) => err.msg)
    return res.status(400).send({ error: error })
  }

  const data = matchedData(req)

  const newCategory = Category.create(data)

  try {
    const saveCategory = await newCategory.save()
    return res
      .status(201)
      .send({ success: true, message: 'Category created successfully', data: saveCategory })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error in creating category',
      error: error.message,
    })
  }
}
