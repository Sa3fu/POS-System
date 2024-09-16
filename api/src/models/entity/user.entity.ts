import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { Sales } from './sales.entity.js'

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Sales, (sales) => sales.user)
  sales: Sales[]

  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  role: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isDelete: boolean
}
