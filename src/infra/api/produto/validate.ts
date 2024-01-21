import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  getByCategoria: {
    params: Joi.object().keys({
      categoria: Joi.string().required().valid('Lanches', 'Acompanhamentos', 'Bebidas')
    })
  },
  postProduto: {
    payload: Joi.object({
      nome: Joi.string().required(),
      descricao: Joi.string().required(),
      preco: Joi.number().required(),
      categoria: Joi.string().required().valid('Lanches', 'Acompanhamentos', 'Bebidas')
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
        categoria: Joi.string().required().valid('Lanches', 'Acompanhamentos', 'Bebidas')
    })
  }
}
