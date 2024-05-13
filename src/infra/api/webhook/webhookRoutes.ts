import * as Hapi from '@hapi/hapi'
import WebhookController from './webhookController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'

export default class WebhookRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Webhook - Adicionando rotas')

      const controller = new WebhookController()

      server.route([
        {
            method: 'POST',
            path: '/api/webhook-pagamento',
            options: {
              handler: controller.webhookPagamento,
              validate: validate.postWebhook,
              description: 'Webhook para pagamento do pedido',
              tags: ['api', 'webhook'],
              auth: {
                mode: "optional"
              }
            }
        }
      ])

      Logger.info('Webhook - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
