import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
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
