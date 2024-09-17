export interface PaginationParams {
  page: number
  limit: number
  offset: number
}

export interface SortParams {
  sortOrder: 'ASC' | 'DESC'
}

export const getPaginationParams = (query: any): PaginationParams => {
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 15
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

export const getSortParams = (query: any): SortParams => {
  const sort = (query.sort as string) || 'desc'
  const validSortOrders: Set<string> = new Set(['ASC', 'DESC'])
  const sortOrder: 'ASC' | 'DESC' = validSortOrders.has(sort.toUpperCase())
    ? (sort.toUpperCase() as 'ASC' | 'DESC')
    : 'ASC'

  return { sortOrder }
}
