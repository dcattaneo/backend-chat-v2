import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'



const app = express()


const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://frontend-chat-v2.vercel.app']
    : ['http://localhost:5173'];
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)
export default app
