import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  },
  postClient: {
    payload: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required(),
      // Adicione outros campos e regras de validação conforme necessário
    })
  }
}
