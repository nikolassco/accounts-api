import { Router } from 'express'
import { UsersController } from './controllers/UsersController'

import validateSchema from './middlewares/validateSchema'
import { userCreateValidator, userLoginValidator } from './validators/userValidator'

const routes = Router()
const usersController = new UsersController()

routes.post('/register', validateSchema(userCreateValidator), usersController.create)
routes.post('/login', validateSchema(userLoginValidator), usersController.login)

export default routes
