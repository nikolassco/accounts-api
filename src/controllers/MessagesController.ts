import { Request, Response } from 'express'
import knex from '../database/connection'
import { Message } from '../models/Message'

class MessagesController {
  create = async (request: Request, response: Response) => {
    let { destination, description, dueDate }: Message = request.body

    destination += '@c.us'

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

  getAll = async (_: Request, response: Response) => {

    try {
      const messages = await knex('messages')

      if (messages.length <= 0) {
        return response.status(404).json({ message: 'Nenhuma mensagem adicionada' })
      }

      response.status(200).json({ message: messages })
    } catch (error) {
      response.status(500).json({ message: error })
    }
  }
}

export { MessagesController }
