import {Router} from 'express'

import { signup, signin } from '../controllers/signupController.js'
import { signUpSchemaValidate } from '../middlewares/schemasMiddleware.js'

const authRouter = Router()

authRouter.post('/signup', signUpSchemaValidate, signup)
authRouter.post('/signin', signin)

export default authRouter