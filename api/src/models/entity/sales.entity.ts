import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'sales' })
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'date',
    nullable: false,
  })
  saleDate: Date

  @Column({
    type: 'int',
    nullable: false,
  })
  customerId: number

  @Column({
    type: 'int',
    nullable: false,
  })
  userId: number

  @Column({
    type: 'decimal',
    nullable: false,
  })
  totalAmount: number

  @Column({
    type: 'int',
    nullable: false,
  })
  paymentId: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date
}
