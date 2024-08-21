import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'


const app = express()
app.use(express.json());
app.use(cors({
    origin: 'https://frontend-chat-v1.vercel.app',
    credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)
export default app