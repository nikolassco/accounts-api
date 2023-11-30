import { Router } from 'express'
import { UsersController } from './controllers/UsersController'

import validateSchema from './middlewares/validateSchema'
import userCreateValidator from './validators/userCreateValidator'

const routes = Router()
const usersController = new UsersController()

routes.post('/register', validateSchema(userCreateValidator), usersController.create)

export default routes
