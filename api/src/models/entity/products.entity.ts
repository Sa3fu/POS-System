import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'products' })
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string

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
