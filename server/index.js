import express from 'express'
import cors from 'cors'



const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())



app.get("/",(req,res)=>{
  res.send("Welcome to Mini Loan App");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})