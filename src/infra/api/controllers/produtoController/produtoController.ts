import * as Hapi from '@hapi/hapi';
import Logger from '../../../../plugins/logger.plugin';
import { ProdutoManagerUseCase } from '../../../../domain/usecases/produto/produtoManager';


export default class ProdutoController {
    public static async register(server: Hapi.Server): Promise<void> {

        server.route({
            method: 'GET',
            path: '/produtos',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
                try {
                    //Adicionar lógicas aqui para produtos.
                    // const produtos = await ProdutoManagerUseCase.criarProduto("hamburguer", "carne e queijo", 10, "lanche");
                    const produtos = await ProdutoManagerUseCase.buscarTodosProdutos();


                    return h.response(produtos);
                } catch (error) {
                    Logger.error(`Error in GET /produtos: ${error.message}`);
                    return h.response({ error: 'Internal Server Error' }).code(500);
                }
            },
        });
    }
}