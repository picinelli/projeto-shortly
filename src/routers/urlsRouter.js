import {Router} from 'express'

import { validateToken } from '../middlewares/validateTokenMiddleware.js'
import { getUrl, postUrl } from '../controllers/urlsController.js'
import { urlSchemaValidate } from '../middlewares/schemasMiddleware.js'

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', urlSchemaValidate, validateToken, postUrl)
urlsRouter.get('/urls/:id', getUrl)

export default urlsRouter