import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  postPedido: {
    payload: Joi.object({
      cliente: Joi.string().required(),
      status: Joi.string().required(),
      itensPedido: Joi.array().items(Joi.object({
        idProduto: Joi.string().required(),
        quantidade: Joi.number().required()
      })).required()
    })
  },
  updatePedido: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    payload: Joi.object({
        cliente: Joi.string().required(),
        status: Joi.string().required(),
        itensPedido: Joi.array().items(Joi.object({
          idProduto: Joi.string().required(),
          quantidade: Joi.number().required()
        })).required(),
        
    })
  }
}
