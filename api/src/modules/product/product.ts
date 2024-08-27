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
//get all Product GET
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Products.find({
      where: { isAvailable: false },
      relations: ['category'],
      select: { category: { name: true } },
    })
    return res.status(200).send({ products })
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

//get product by ID GET
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await Products.findOne({
      where: { id: parseInt(id) },
      relations: ['category'],
      select: { category: { name: true } },
    })
    if (!product) {
      return res.status(400).send({ message: 'Product not found' })
    }
    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}
