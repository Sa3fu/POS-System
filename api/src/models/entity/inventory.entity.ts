import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm'
import { Products } from './product.entity.js'
import { SaleProduct } from './saleProducts.entity.js'

@Entity({ name: 'inventory' })
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Products,
    (products) => {
      products.inventory
    },
    { nullable: true }
  )
  @JoinColumn({ name: 'productId' })
  product: Promise<Products>

  @ManyToOne(
    () => SaleProduct,
    (sale) => {
      sale.inventories
    },
    { nullable: true }
  )
  saleProduct: Promise<SaleProduct>

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity: number

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date
}
