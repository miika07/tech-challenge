import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import ProdutoManagerUseCases from '../../../core/applications/usecases/produto/produtoManagerUseCase';

export default class ProdutoController {
    private readonly produtoManagerUseCase:ProdutoManagerUseCases  = new ProdutoManagerUseCases()

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
          if (data){
            return h.response(data).code(200);
          }
          return h.response({ error: 'Not found'}).code(404);
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

      public adicionarProduto = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
      ): Promise<any> => {
        try {
          const body = request.payload as { nome: string, descricao: string, preco: number, categoria: string };
          const data = await this.produtoManagerUseCase.criarProduto(body.nome, body.descricao, body.preco, body.categoria)
          return h.response(data)
        } catch (error) {
            Logger.error(`Error in POST /produtos: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
      }

      public deletarProduto = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
      ): Promise<any> => {
        try {
            const data = await this.produtoManagerUseCase.deletarProduto(request.params.id)
            return h.response(ok)
        } catch (error) {
            Logger.error(`Error in DELETE /produtos/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
      }

      public atualizarProduto = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
      ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, descricao: string, preco: number, categoria: string };
            const data = await this.produtoManagerUseCase.atualizarProduto(request.params.id, body.nome, body.descricao, body.preco, body.categoria)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in PUT /produtos/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
      }
}