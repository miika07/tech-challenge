import * as Hapi from '@hapi/hapi'
import ProdutoController from './produtoController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'

export default class ProdutoRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Produtos - Adicionando rotas')

      const controller = new ProdutoController()

      server.route([
        {
          method: 'GET',
          path: '/api/produtos',
          options: {
            handler: controller.buscarTodosProdutos,
            description: 'Busca todos os produtos',
            tags: ['api', 'produtos']
            // auth: 'jwt'
          }
        },
        {
          method: 'GET',
          path: '/api/produto/{id}',
          options: {
            handler: controller.buscarProdutoPorID,
            validate: validate.getById,
            description: 'Busca um produto por id',
            tags: ['api', 'produtos'],
            //auth: 'jwt'
          }
        },
        {
          method: 'GET',
          path: '/api/produto/categoria/{categoria}',
          options: {
            handler: controller.buscarProdutoPorCategoria,
            validate: validate.getByCategoria,
            description: 'Busca produtos por categoria',
            tags: ['api', 'produtos'],
            //auth: 'jwt'
          }
        },
        {
            method: 'POST',
            path: '/api/produto',
            options: {
              handler: controller.adicionarProduto,
              validate: validate.postProduto,
              description: 'Adiciona um produto',
              tags: ['api', 'produtos'],
              //auth: 'jwt'
            }
        },
        {
            method: 'DELETE',
            path: '/api/produto/{id}',
            options: {
              handler: controller.deletarProduto,
              validate: validate.getById,
              description: 'Deleta um produto',
              tags: ['api', 'produtos'],
              //auth: 'jwt'
            }
        },
        {
            method: 'PUT',
            path: '/api/produto/{id}',
            options: {
              handler: controller.atualizarProduto,
              validate: validate.updateProduto,
              description: 'Atualiza um produto',
              tags: ['api', 'produtos'],
              //auth: 'jwt'
            }
        }
      ])

      Logger.info('Produtos - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
