import * as Hapi from '@hapi/hapi'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'
import PagamentoController from './pagamentoController'

export default class PagamentosRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Pagamentos - Adicionando rotas')

      const controller = new PagamentoController()

      server.route([
        {
          method: 'GET',
          path: '/api/pagamento/{idPedido}',
          options: {
            handler: controller.buscarPagamentoPorID,
            validate: validate.getById,
            description: 'Busca pagamento por pedido',
            tags: ['api', 'pagamentos'],
            auth: {
              mode: "optional"
            }
          }
        }
      ])

      Logger.info('Pagamentos - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
