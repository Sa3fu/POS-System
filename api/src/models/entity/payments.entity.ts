import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    nullable: false,
  })
  saleId: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  paymentMethod: string

  @Column({
    type: 'decimal',
    nullable: false,
  })
  amountPaid: number

  @Column({
    type: 'varchar',
    nullable: false,
  })
  status: string // e.g., 'paid', 'unpaid', 'refunded'

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  paymentDate: Date
}
