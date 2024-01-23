import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  getByStatus: {
    params: Joi.object().keys({
      status: Joi.string().required().valid('Recebido', 'Em preparação', 'Pronto', 'Finalizado'),
    })
  },
  postPedido: {
    payload: Joi.object({
      cliente: Joi.string(),
      status: Joi.string().required().valid('Recebido', 'Em preparação', 'Pronto', 'Finalizado'),
      itensPedido: Joi.array().items(Joi.object({
        idProduto: Joi.string().required(),
        quantidade: Joi.number().required()
      }).required()).required()
    })
  },
  updatePedido: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    payload: Joi.object({
        cliente: Joi.string().required(),
        status: Joi.string().required().valid('Recebido', 'Em preparação', 'Pronto', 'Finalizado'),
        itensPedido: Joi.array().items(Joi.object({
          idProduto: Joi.string().required(),
          quantidade: Joi.number().required()
        }).required()).required(),
        
    })
  }
}
