import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { Sales } from './sales.entity.js'

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Sales, (sales) => sales.customer)
  sales: Sales[]

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  phoneNumber: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email: string

  @Column({
    type: 'boolean',
    nullable: false,
  })
  isDelete: boolean
}
