import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './config/database.js'
import userRouter from './routes/user.router.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
await connectDB()

app.get('/', (req, res) => {
  res.send('Welcome to Mini Loan App')
})

app.use('/v1/auth', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
