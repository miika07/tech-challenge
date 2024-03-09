import * as Joi from 'joi'

export default {
  postWebhook: {
    payload: Joi.object({
      idPedido: Joi.string().required(),
      statusPagamento: Joi.string().required(),
    })
  }
}
