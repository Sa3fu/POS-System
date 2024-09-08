import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm'
import { Products } from './product.entity.js'

@Entity({ name: 'inventory' })
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity: number

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  lastRestocked: Date

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

  @ManyToOne(
    () => Products,
    (products) => {
      products.inventory
    },
    { nullable: false }
  )
  @JoinColumn({ name: 'productId' })
  product: Promise<Products>
}
