import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  getByStatus: {
    params: Joi.object().keys({
      status: Joi.string().required().valid('RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO'),
    })
  },
  postPedido: {
    payload: Joi.object({
      cliente: Joi.string(),
      status: Joi.string().required().valid('RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO'),
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
        cliente: Joi.string(),
        status: Joi.string().required().valid('RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO'),
        itensPedido: Joi.array().items(Joi.object({
          idProduto: Joi.string().required(),
          quantidade: Joi.number().required()
        }).required()).required(),
        
    })
  },
  updateStatusPedido: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    payload: Joi.object({
        status: Joi.string().required().valid('RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO')  
    })
  }
}
