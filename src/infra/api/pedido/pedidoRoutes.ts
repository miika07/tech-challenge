import * as Hapi from '@hapi/hapi'
import PedidoController from './pedidoController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'

export default class PedidoRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
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
            tags: ['api', 'pedidos'],
            auth: {
              mode: "optional"
            }
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
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/api/pedido/status/{status}',
          options: {
            handler: controller.buscarPedidoPorStatus,
            validate: validate.getByStatus,
            description: 'Busca pedidos por status',
            tags: ['api', 'pedidos'],
            auth: {
              mode: "optional"
            }
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
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'POST',
          path: '/api/checkout-pedido',
          options: {
            handler: controller.checkoutPedido,
            validate: validate.postCheckoutPedido,
            description: 'Checkout do pedido',
            tags: ['api', 'pedidos'],
            auth: {
              mode: "optional"
            }
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
              auth: {
              mode: "optional"
            }
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
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'PUT',
          path: '/api/pedido/atualizar-status/{id}',
          options: {
            handler: controller.atualizarStatusPedido,
            validate: validate.updateStatusPedido,
            description: 'Atualiza status do pedido',
            tags: ['api', 'pedidos'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/api/pedidos/nao-finalizados',
          options: {
            handler: controller.buscarPedidosNaoFinalizados,
            description: 'Busca os pedidos que estão em andamento ainda.',
            tags: ['api', 'pedidos'],
            auth: {
              mode: "optional"
            }
          }
        }

      ])

      Logger.info('Pedidos - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
