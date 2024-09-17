// repositories/productRepository.ts
import { AppDataSource } from '../../server/db.js'
import { Products } from '../../models/entity/product.entity.js'
import { PaginationParams, SortParams } from '../utils/paginationSort.js'

export const getProductByIdWithSumQuantity = async (id: number) => {
  const productRepository = AppDataSource.getRepository(Products)
  const data = await productRepository
    .createQueryBuilder('product')
    .leftJoin('product.inventory', 'inventory')
    .innerJoin('product.category', 'category')
    .select([
      'product.id',
      'product.brand',
      'product.model',
      'product.price',
      'product.sku',
      'product.barcode',
      'product.isDeleted',
      'product.isEnabled',
      'category.name',
    ])
    .addSelect('COALESCE(SUM(inventory.quantity), 0)', 'quantitySum')
    .where('product.id = :id', { id })
    .andWhere('product.isDeleted = false')
    .andWhere('product.isEnabled = false')
    .groupBy('product.id')
    .addGroupBy('category.name')
    .getRawOne()

  return data
}

export const getAllProductsWithSumQuantity = async (
  pagination: PaginationParams,
  sort: SortParams
) => {
  const productRepository = AppDataSource.getRepository(Products)
  const { limit, offset } = pagination
  const { sortOrder } = sort
  const data = await productRepository
    .createQueryBuilder('product')
    .leftJoin('product.inventory', 'inventory')
    .innerJoin('product.category', 'category')
    .select([
      'product.id',
      'product.brand',
      'product.model',
      'product.price',
      'product.sku',
      'product.barcode',
      'product.isDeleted',
      'product.isEnabled',
      'category.name',
    ])
    .addSelect('COALESCE(SUM(inventory.quantity), 0)', 'quantitySum')
    .where('product.isDeleted = false')
    .andWhere('product.isEnabled = false')
    .groupBy('product.id')
    .addGroupBy('category.name')
    .orderBy('product.brand', sortOrder)
    .skip(offset)
    .take(limit)
    .getRawMany()

  const totalCount = await productRepository
    .createQueryBuilder('product')
    .where('product.isDeleted = false')
    .andWhere('product.isEnabled = false')
    .getCount()

  return { data, totalCount }
}
