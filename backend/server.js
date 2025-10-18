import express from 'express'
import dotenv from 'dotenv'
import conn from './conn/conn.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config()
conn();
const app = express()
app.use(express.json());

const port = process.env.PORT||4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1/auth',authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})