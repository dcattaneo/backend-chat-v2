import app from './app.js'
import dotenv from "dotenv";
import { connectDB } from './db.js'

dotenv.config()

const PORT = 8080

connectDB()

app.listen(PORT, () => {
    console.log('server on port', PORT)
})



