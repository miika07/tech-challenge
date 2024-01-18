import * as Hapi from '@hapi/hapi'
import PedidoController from './pedidoController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'

export default class PedidoRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Pedidos - Adicionando rotas')

      const controller = new PedidoController()

      server.route([
        {
          method: 'GET',
          path: '/api/pedidos',
          options: {
            handler: controller.buscarTodosPedidos,
            description: 'Busca todos os pedidos',
            tags: ['api', 'pedidos']
            // auth: 'jwt'
          }
        },
        {
          method: 'GET',
          path: '/api/pedido/{id}',
          options: {
            handler: controller.buscarPedidoPorID,
            validate: validate.getById,
            description: 'Busca um pedido por id',
            tags: ['api', 'pedidos'],
            //auth: 'jwt'
          }
        },
        {
            method: 'POST',
            path: '/api/pedido',
            options: {
              handler: controller.adicionarPedido,
              validate: validate.postPedido,
              description: 'Adiciona um pedido',
              tags: ['api', 'pedidos'],
              //auth: 'jwt'
            }
        },
        {
            method: 'DELETE',
            path: '/api/pedido/{id}',
            options: {
              handler: controller.deletarPedido,
              validate: validate.getById,
              description: 'Deleta um pedido',
              tags: ['api', 'pedidos'],
              //auth: 'jwt'
            }
        },
        {
            method: 'PUT',
            path: '/api/pedido/{id}',
            options: {
              handler: controller.atualizarPedido,
              validate: validate.updatePedido,
              description: 'Atualiza um pedido',
              tags: ['api', 'pedidos'],
              //auth: 'jwt'
            }
        }
      ])

      Logger.info('Pedidos - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
