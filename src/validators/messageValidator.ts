import joi from 'joi'

const messageCreateValidator = joi.object({
  destination: joi.string().length(13).required().messages({
    "any.required": "Destino é obrigatório.",
    "string.empty": "Destino é obrigatório.",
    "string.length": "Destino precisa ter 13 caracteres"
  }),
  description: joi.string().required().messages({
    "any.required": "Descrição é obrigatória.",
    "string.empty": "Descrição é obrigatória.",
  }),
  dueDate: joi.date().required().iso().messages({
    "any.required": "Data é obrigatória",
    "date.format": "Modelo de data aceito AAAA-MM-DD",
  })
  // email: joi.string().email().required().messages({
  // "string.email": "E-mail está em um formato inválido."
  // }),
  // password: joi.string().required().messages({
  // "any.required": "Senha é obrigatória.",
  // "string.empty": "Senha é obrigatória.",
  // })
})


export { messageCreateValidator }
