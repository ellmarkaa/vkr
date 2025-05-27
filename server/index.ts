import express, { Express, Request, Response , Application } from 'express';
import mongoose from "mongoose"
import config from "config"
import fileUpload from "express-fileupload"
import cors from 'cors';
// import authRouter from "./routes/auth.routes"
// import fileRouter from "./routes/file.routes"
const app: Application = express()
const PORT = config.get('serverPort')
// import corsMiddleware from './middleware/cors.middleware'

app.use(fileUpload({}))
app.use(express.json())
app.use(cors())
app.use(express.static('static'))
// app.use("/api/auth", authRouter)
// app.use("/api/files", fileRouter)


const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"), {dbName: 'cloud'})

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
