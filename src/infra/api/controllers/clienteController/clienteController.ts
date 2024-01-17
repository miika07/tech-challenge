import * as Hapi from '@hapi/hapi';
import Logger from '../../../../plugins/logger.plugin';
import { ClienteManagerUseCase } from '../../../../domain/usecases/cliente/clienteManager';


export default class ClienteRoutes {
  public static async register(server: Hapi.Server): Promise<void> {

    server.route({
      method: 'GET',
      path: '/clientes',
      handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
        try {
          // Teste de rota cliente + repository
          const novoCliente = await ClienteManagerUseCase.criarCliente('João', 'joao@email.com', '123456789');
          //Deletar tudo antes disso


          return h.response(novoCliente);
        } catch (error) {
          Logger.error(`Error in GET /clientes: ${error.message}`);
          return h.response({ error: 'Internal Server Error' }).code(500);
        }
      },
    });
  }
}