import { Request, Response, NextFunction } from "express";

const validateSchema = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(request.body)

    next();
  } catch (error: any) {
    return response.status(400).json(error.message)
  }
}

export = validateSchema
