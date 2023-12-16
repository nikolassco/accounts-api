import { Router } from 'express'
import { MessagesController } from './controllers/MessagesController'
import { UsersController } from './controllers/UsersController'

import validateSchema from './middlewares/validateSchema'
import { messageCreateValidator } from './validators/messageValidator'
const verifyJwt = require('./middlewares/validateToken')
import { userCreateValidator, userLoginValidator } from './validators/userValidator'

const routes = Router()
const usersController = new UsersController()
const messagesController = new MessagesController()

routes.post('/register', validateSchema(userCreateValidator), usersController.create)
routes.post('/login', validateSchema(userLoginValidator), usersController.login)

routes.use(verifyJwt)

routes.get('/ola', (req, res) => {
  res.send('ola')
})

routes.post('/message', validateSchema(messageCreateValidator), messagesController.create)
routes.get('/messages', messagesController.getAll)

export default routes
