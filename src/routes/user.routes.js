import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getUsers } from "../controllers/user.controllers.js";


const router = Router();


router.get("/", authRequired, getUsers);

export default router;
