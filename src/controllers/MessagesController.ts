import { Request, Response } from 'express'
import knex from '../database/connection'
import { Message } from '../models/Message'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import { User } from '../models/user'



// // https://blog.bossabox.com/arquitetura-de-projeto-node-js-prova-de-balas/


class MessagesController {
  create = async (request: Request, response: Response) => {
    const { destination, description, dueDate }: Message = request.body
    // response.send({ description, destination, dueDate })

    try {
      const newMessage: Message = await knex('messages').insert({
        destination,
        description,
        due_date: dueDate
      })
        .returning('*')

      response.status(201).json({ message: newMessage })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }

  getAll = async (request: Request, response: Response) => {

    try {
      const messages = await knex('messages')

      if (messages.length <= 0) {
        return response.status(404).json({ message: 'Nenhuma mensagem adicionada' })
      }

      response.status(201).json({ message: messages })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }

  // getAll = async (request: Request, response: Request) => {
  // try {
  // const messages = await knex('messages')

  // } catch (error) {
  // response.status(500).json({ message: error })
  // }
  // }
}

export { MessagesController }
