import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Inventory } from './inventory.entity.js'
import { Sales } from './sales.entity.js'
import { Products } from './product.entity.js'

@Entity({ name: 'sale_products' })
export class SaleProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Inventory, (inventory) => inventory.saleProduct)
  inventories: Inventory[]

  @ManyToOne(() => Sales, (sales) => sales.saleProducts)
  @JoinColumn({ name: 'salesId' })
  sale: Promise<Sales>

  @ManyToOne(() => Products, (products) => products.saleProduct)
  product: Promise<Products>

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
