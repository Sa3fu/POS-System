import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../common/config/env'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST || 'localhost',
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['src/entity/*.ts'],
  synchronize: true,
})

export default AppDataSource
