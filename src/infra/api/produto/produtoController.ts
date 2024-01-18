import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import ProdutoUseCases from '../../../domain/usecases/produto/produtoManager';
import { ok } from 'assert';

export default class ProdutoController {
    private readonly produtoManagerUseCase:ProdutoUseCases  = new ProdutoUseCases()

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
          return h.response(data)
        } catch (error) {
            Logger.error(`Error in GET /produtos/${request.params.id}: ${error.message}`);
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
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in PUT /produtos/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
      }
}