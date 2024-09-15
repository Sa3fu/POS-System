import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Category } from './category.entity.js'
import { Inventory } from './inventory.entity.js'
import { SaleProduct } from './saleProducts.entity.js'

@Entity({ name: 'products' })
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  brand: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  model: string

  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  sku: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isEnabled: boolean

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isDeleted: boolean

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  barcode: string

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: Promise<Category>

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  @JoinColumn()
  inventory: Inventory[]

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.product)
  saleProduct: SaleProduct[]
}
