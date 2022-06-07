import express from 'express'
import cors from 'cors'

import authRouter from './routers/authRouter.js'
import urlsRouter from './routers/urlsRouter.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(authRouter)
app.use(urlsRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is now online`))