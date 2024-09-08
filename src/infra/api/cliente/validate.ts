import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  getByCPF: {
    params: Joi.object().keys({
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  },
  postCliente: {
    payload: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  },
  exclusaoCliente: {
    payload: Joi.object({
      nome: Joi.string().required(),
      telefone: Joi.string().required(),
      endereco: Joi.string().required()
    })
  },
  updateCliente: {
    payload: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  }
}
