import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  postCliente: {
    payload: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  },
  updateCliente: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    payload: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  }
}
