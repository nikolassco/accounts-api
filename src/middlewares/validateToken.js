const knex = require('../database/connection')
const jwt = require('jsonwebtoken')

const verifyJwt = async (request, response, next) => {
  const { authorization } = request.headers
  if (!authorization) {
    return response.status(401).json({ message: 'Não autorizado' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.JWTKEY)

    const user = await knex('users').where({ id }).first()

    if (!user) {
      return response.status(401).json({ message: 'Não autorizado' })
    }

    const { password: _, ...userLogged } = user

    request.user = userLogged

    next()
  } catch (error) {
    return response.status(401).json({ message: 'Não autorizado' })
  }
}

module.exports = verifyJwt
