import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm'
import { Sales } from './sales.entity.js'

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Sales, (sale) => sale.payment)
  sale: Promise<Sales>

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
    type: 'decimal',
    nullable: true,
  })
  discount: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  paymentDate: Date
}
