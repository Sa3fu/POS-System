import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Payment } from './payments.entity.js'
import { Customer } from './customer.entity.js'
@Entity({ name: 'sales' })
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Payment, { nullable: false })
  @JoinColumn({ name: 'paymentId' }) // Specifies the foreign key column
  payment: Payment

  @ManyToOne(() => Customer, (customer) => customer.sales, { nullable: false })
  @JoinColumn({ name: 'customerId' })
  customer: Promise<Customer>

  @Column({
    type: 'int',
    nullable: false,
  })
  user_Id: number

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
