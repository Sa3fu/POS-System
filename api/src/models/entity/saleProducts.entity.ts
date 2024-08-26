import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'sale_products' })
export class SaleProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    nullable: false,
  })
  saleId: number

  @Column({
    type: 'int',
    nullable: false,
  })
  productId: number

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity: number

  @Column({
    type: 'decimal',
    nullable: false,
  })
  priceAtSale: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date
}
