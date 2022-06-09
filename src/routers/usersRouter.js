import { Router } from "express";
import { getUserId, getUsersRanking } from "../controllers/usersController.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";

const usersRouter = Router()

usersRouter.get('/ranking', getUsersRanking)
usersRouter.get('/users/:id', validateToken, getUserId)


export default usersRouter