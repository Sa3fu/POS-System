import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AppDataSource from './server/db.js'
import router from './common/routes/index.js'
import passport from 'passport'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:4000', credentials: true }))
app.use(express.json())

app.use(passport.initialize())

app.use(router)

//@ts-ignore
app.get('/', (req, res) => {
  res.send({ msg: 'HELLO WORLD' })
})

const PORT = process.env.PORT || 8000

AppDataSource.initialize()
  .then(() => {
    console.log('DB connected')
    app.listen(PORT, () => {
      console.log('Server Connected')
    })
  })
  .catch((error) => {
    console.log(error)
    console.error(error.stack)
  })
