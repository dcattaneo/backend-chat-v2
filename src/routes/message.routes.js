import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { sendMessage, getMessages } from "../controllers/message.controllers.js";


const router = Router()


router.get("/:id", authRequired, getMessages);
router.post("/send/:id", authRequired, sendMessage);

export default router;