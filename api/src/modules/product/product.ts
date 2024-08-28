import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { Products } from '../../models/entity/product.entity.js'
import { Category } from '../../models/entity/category.entity.js'
import { DeepPartial, Like } from 'typeorm'

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

//Update product PATCH
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const updates = req.body

  try {
    const product = await Products.findOne({
      where: { id: parseInt(id) },
      relations: ['category'],
    })

    if (!product) {
      return res.status(404).send({ message: 'Product not found' })
    }

    if (updates.categoryId !== undefined) {
      const category = await Category.findOneBy({ id: updates.categoryId })
      if (!category) {
        return res.status(400).send({ message: 'Invalid categoryId' })
      }
      product.category = Promise.resolve(category)
      delete updates.categoryId
    }

    Object.assign(product, updates)

    await product.save()

    return res.status(200).send(product)
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

//delete product PATCH
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await Products.findOneBy({ id: parseInt(id) })
    if (!product) {
      return res.status(400).send({ message: 'Category not found' })
    }
    product.isAvailable = true

    await product.save()

    return res.status(201).send({ message: 'Product deleted successfully' })
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

//Enable product PATCH
export const recoverProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await Products.findOneBy({ id: parseInt(id) })
    if (!product) {
      return res.status(400).send({ message: 'Category not found' })
    }
    product.isAvailable = false

    await product.save()

    return res.status(201).send({ message: 'Product Recovered successfully' })
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

//Search product GET
export const searchProduct = async (req: Request, res: Response) => {
  try {
    const { brand, model, price, sku } = req.query

    let queryBuilder = Products.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('1=1') // This allows us to always have a WHERE clause to start with

    if (brand) {
      queryBuilder = queryBuilder.andWhere('LOWER(product.brand) LIKE LOWER(:brand)', {
        brand: `%${brand}%`,
      })
    }

    if (model) {
      queryBuilder = queryBuilder.andWhere('LOWER(product.model) LIKE LOWER(:model)', {
        model: `%${model}%`,
      })
    }

    if (price) {
      const parsedPrice = parseFloat(price as string)
      if (!isNaN(parsedPrice)) {
        queryBuilder = queryBuilder.andWhere('product.price = :price', { price: parsedPrice })
      } else {
        return res.status(400).json({ message: 'Invalid price value' })
      }
    }

    if (sku) {
      queryBuilder = queryBuilder.andWhere('LOWER(product.sku) LIKE LOWER(:sku)', {
        sku: `%${sku}%`,
      })
    }

    const products = await queryBuilder.getMany()

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found matching the criteria' })
    }

    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
