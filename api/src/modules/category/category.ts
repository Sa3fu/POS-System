import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { Category } from '../../models/entity/category.entity.js'

// create category and save POST
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

// Get all the category from table GET
export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    return res.status(200).send({ categories })
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

//Get the category from table with id
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const category = await Category.findOneBy({ id: parseInt(id) })
    if (!category) {
      return res.status(400).send({ message: 'Category not found' })
    }
    return res.status(200).send(category)
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

//To update the category from table
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const category = await Category.findOneBy({ id: parseInt(id) })

    if (!category) {
      return res.status(400).send({ message: 'Category not found' })
    }

    if (name) category.name = name

    await category.save()

    return res.status(200).send(category)
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
