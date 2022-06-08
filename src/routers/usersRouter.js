import { Router } from "express";
import { getUserId, getUsersRanking } from "../controllers/usersController.js";

const usersRouter = Router()

usersRouter.get('/users/ranking', getUsersRanking)
usersRouter.get('/users/:id', getUserId)


export default usersRouter