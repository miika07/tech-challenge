import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  postProduto: {
    payload: Joi.object({
      nome: Joi.string().required(),
      descricao: Joi.string().required(),
      preco: Joi.number().required(),
      categoria: Joi.string().required()
    })
  },
  updateProduto: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    payload: Joi.object({
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        preco: Joi.number().required(),
        categoria: Joi.string().required()
    })
  }
}
