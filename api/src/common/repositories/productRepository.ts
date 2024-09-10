// repositories/productRepository.ts
import { AppDataSource } from '../../server/db.js'
import { Products } from '../../models/entity/product.entity.js'

export const getProductByIdWithSumQuantity = async (id: number) => {
  const productRepository = AppDataSource.getRepository(Products)
  const result = await productRepository
    .createQueryBuilder('product')
    .leftJoin('product.inventory', 'inventory')
    .innerJoin('product.category', 'category')
    .select([
      'product.id',
      'product.brand',
      'product.model',
      'product.price',
      'product.sku',
      'product.isDeleted',
      'product.isEnabled',
      'category.name',
    ])
    .addSelect('COALESCE(SUM(inventory.quantity), 0)', 'quantitySum')
    .where('product.id = :id', { id })
    .andWhere('product.isDeleted = false')
    .groupBy('product.id')
    .addGroupBy('category.name')
    .getRawOne()

  if (result) {
    result.product_isDeleted = Boolean(result.product_isDeleted)
    result.product_isEnabled = Boolean(result.product_isEnabled)
  }

  return result
}

export const getAllProductsWithSumQuantity = async () => {
  const productRepository = AppDataSource.getRepository(Products)
  const results = await productRepository
    .createQueryBuilder('product')
    .leftJoin('product.inventory', 'inventory')
    .innerJoin('product.category', 'category')
    .select([
      'product.id',
      'product.brand',
      'product.model',
      'product.price',
      'product.sku',
      'product.isDeleted',
      'product.isEnabled',
      'category.name',
    ])
    .addSelect('COALESCE(SUM(inventory.quantity), 0)', 'quantitySum')
    .where('product.isDeleted = false')
    .groupBy('product.id')
    .addGroupBy('category.name')
    .getRawMany()

  results.forEach((result) => {
    result.product_isDeleted = Boolean(result.product_isDeleted)
    result.product_isEnabled = Boolean(result.product_isEnabled)
  })

  return results
}
