import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import ProdutoManagerUseCases from '../../../core/applications/usecases/produto/produtoManagerUseCase';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import { AppDataSource } from '../../data/database/data-source';
import { ProdutoEntity } from '../../../core/domain/entities/produto';
import ProdutoRepositoryAdapter from '../../adapter/produto/produtoRepositoryAdapter';

export default class ProdutoController {

  private produtoRepository = process.env.NODE_ENV == 'test'
    ? AppDataSourceTest.getRepository(ProdutoEntity)
    : AppDataSource.getRepository(ProdutoEntity);
  private adapter: ProdutoRepositoryAdapter = new ProdutoRepositoryAdapter(this.produtoRepository);
  private readonly produtoManagerUseCase: ProdutoManagerUseCases = new ProdutoManagerUseCases(this.adapter);

  public buscarTodosProdutos = async (
    request: Hapi.Request, h: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const data = await this.produtoManagerUseCase.buscarTodosProdutos()
      return h.response(data)
    } catch (error) {
      Logger.error(`Error in GET /produtos: ${error.message}`);
      return h.response({ error: 'Internal Server Error' }).code(500)
    }
  }

  public buscarProdutoPorID = async (
    request: Hapi.Request, h: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const data = await this.produtoManagerUseCase.buscarProdutoPorId(request.params.id)
      if (data) {
        return h.response(data).code(200);
      }
      return h.response({ error: 'Not found' }).code(404);
    } catch (error) {
      Logger.error(`Error in GET /produtos/${request.params.id}: ${error.message}`);
      return h.response({ error: 'Internal Server Error' }).code(500)
    }
  }

  public buscarProdutoPorCategoria = async (
    request: Hapi.Request, h: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const data = await this.produtoManagerUseCase.buscarProdutoPorCategoria(request.params.categoria)
      if (!data.length) {
        return h.response('Não encontrado nenhum produto para essa categoria').code(404)
      }
      return h.response(data)
    } catch (error) {
      Logger.error(`Error in GET /produtos/categoria/${request.params.categoria}: ${error.message}`);
      return h.response({ error: 'Internal Server Error' }).code(500)
    }
  }

}