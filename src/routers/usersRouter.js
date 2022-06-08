import { Router } from "express";
import { getUserId } from "../controllers/usersController.js";

const usersRouter = Router()

usersRouter.get('/users/:id', getUserId)

export default usersRouter