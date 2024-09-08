import { Request, Response } from 'express'
import { Inventory } from '../../models/entity/inventory.entity'
import { Products } from '../../models/entity/product.entity'
import { DeepPartial } from 'typeorm'

// Create inventory
export const addToInventory = async (req: Request, res: Response) => {
  const { quantity, productId, lastRestocked } = req.body

  // Validate the incoming request
  if (!productId || quantity === undefined) {
    return res.status(400).send({
      success: false,
      message: 'Product ID, quantity, and last restocked date are required.',
    })
  }

  try {
    // Check if product exists
    const product = await Products.findOne({ where: { id: productId } })
    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product not found.',
      })
    }

    const addInventory = await Inventory.create({
      quantity,
      productId,
      lastRestocked: lastRestocked ? new Date(lastRestocked) : new Date(),
    } as DeepPartial<Inventory>)

    return res.status(201).send({
      success: true,
      message: 'Inventory added successfully.',
      data: addInventory,
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'An error occurred while adding to the inventory.',
      error: error.message,
    })
  }
}
