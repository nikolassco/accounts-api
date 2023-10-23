import { Router } from 'express'
import { UsersController } from './controllers/UsersController'

import validateSchema from './middlewares/validateSchema'
import userSignupValidator from './validators/userSignupValidator'

const routes = Router()
const usersController = new UsersController()

routes.post('/register', validateSchema(userSignupValidator), usersController.create)

export default routes
