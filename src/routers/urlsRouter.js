import {Router} from 'express'

import { validateToken } from '../middlewares/validateTokenMiddleware.js'
import { postUrl } from '../controllers/urlsController.js'
import { urlSchemaValidate } from '../middlewares/schemasMiddleware.js'

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', urlSchemaValidate, validateToken, postUrl)

export default urlsRouter