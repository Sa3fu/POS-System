import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'invoices' })
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  invoiceNumber: string

  @Column({
    type: 'decimal',
    nullable: false,
  })
  totalAmount: number

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
    type: 'date',
    nullable: false,
  })
  invoiceDate: Date

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
