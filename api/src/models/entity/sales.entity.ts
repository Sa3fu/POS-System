import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Payment } from './payments.entity.js'
import { Customer } from './customer.entity.js'
import { Users } from './user.entity.js'
import { SaleProduct } from './saleProducts.entity.js'
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

  @ManyToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: Promise<Users>

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale)
  saleProducts: SaleProduct[]

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
