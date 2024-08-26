import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn } from 'typeorm'
import { Category } from './category.entity.js'

@Entity({ name: 'products' })
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @JoinColumn({
    name: 'category_id',
  })
  category: Category

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
  })
  isAvailable: boolean

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  barcode: string
}
