import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      idPedido: Joi.string().required()
    })
  }
}
