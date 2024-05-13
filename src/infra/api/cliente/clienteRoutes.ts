import * as Hapi from '@hapi/hapi'
import ClienteController from './clienteController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'

export default class ClienteRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Clientes - Adicionando rotas')

      const controller = new ClienteController()

      server.route([
        {
          method: 'GET',
          path: '/api/clientes',
          options: {
            handler: controller.buscarTodosClientes,
            description: 'Busca todos os clientes',
            tags: ['api', 'clientes'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/api/cliente/{id}',
          options: {
            handler: controller.buscarClientePorID,
            validate: validate.getById,
            description: 'Busca um cliente por id',
            tags: ['api', 'clientes'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/api/cliente-cpf/{cpf}',
          options: {
            handler: controller.buscarClientePorCPF,
            validate: validate.getByCPF,
            description: 'Busca um cliente por cpf',
            tags: ['api', 'clientes'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
            method: 'POST',
            path: '/api/cliente',
            options: {
              handler: controller.adicionarCliente,
              validate: validate.postCliente,
              description: 'Adiciona um cliente',
              tags: ['api', 'clientes'],
              auth: {
              mode: "optional"
            }
            }
        },
        {
            method: 'DELETE',
            path: '/api/cliente/{id}',
            options: {
              handler: controller.deletarCliente,
              validate: validate.getById,
              description: 'Deleta um cliente',
              tags: ['api', 'clientes'],
              auth: {
              mode: "optional"
            }
            }
        },
        {
            method: 'PUT',
            path: '/api/cliente',
            options: {
              handler: controller.atualizarCliente,
              validate: validate.updateCliente,
              description: 'Atualiza um cliente',
              tags: ['api', 'clientes'],
              auth: {
              mode: "optional"
            }
            }
        }
      ])

      Logger.info('Clientes - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
