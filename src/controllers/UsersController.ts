import { Request, Response } from 'express'


// https://blog.bossabox.com/arquitetura-de-projeto-node-js-prova-de-balas/


class UsersController {
  create = async (request: Request, response: Response) => {
    try {

      console.log(request.body)


      // DICA: HTTP STATUS CODE FOI FEITO PARA SER USADO ;) #pelamordedeus
      response.status(201).send()
    } catch (error) {
      response.status(400).json(`erro ${error}`)
    }
  }
}

export { UsersController }
