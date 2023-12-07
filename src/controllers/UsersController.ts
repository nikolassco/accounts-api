import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'


// https://blog.bossabox.com/arquitetura-de-projeto-node-js-prova-de-balas/


class UsersController {
  create = async (request: Request, response: Response) => {
    const { name, email, password }: User = request.body

    try {
      const userExists: [] = await knex('users').where({ email })

      if (userExists.length > 0) {
        return response.status(400).json({ message: "Usuário já cadastrado." })
      }

      const hashPass = await bcrypt.hash(password, 10)

      const newUser = await knex('users').insert({
        name,
        password: hashPass,
        email
      })
        .returning('*')

      const { password: _, ...registeredUser } = newUser[0]

      return response.status(201).json({ message: registeredUser })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }
  login = async (request: Request, response: Response) => {
    const { email, password }: User = request.body

    try {
      const user = await knex('users').where({ email })

      if (user.length < 1) {
        return response.status(400).json({ message: 'E-mail ou senha inválido(a).' })
      }

      const validPassword = await bcrypt.compare(password, user[0].password)

      if (!validPassword) {
        return response.status(400).json({ message: 'E-mail ou senha inválido.' })
      }

      const token = jwt.sign({ id: user[0].id }, process.env.JWTKEY || '', { expiresIn: '8h' })
      // const token = jwt.sign({ id: user[0].id }, process.env.JWTKEY!, { expiresIn: '8h' }) para ts não checar

      const { password: _, ...userLogged } = user[0]

      return response.status(200).json({ message: { user: userLogged, token } })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }
}

export { UsersController }
