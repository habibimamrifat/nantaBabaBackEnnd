import express, { Application, Request, Response } from "express"
import cors from "cors"
const app:Application = express()

// use express json Perser
app.use(express.json())
// middleware
app.use(cors())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app