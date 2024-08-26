import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'inventory' })
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    nullable: false,
  })
  productId: number // Foreign Key to Products table

  @Column({
    type: 'int',
    nullable: false,
  })
  stockQuantity: number

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
}
