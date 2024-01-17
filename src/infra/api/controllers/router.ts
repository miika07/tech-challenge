import * as Hapi from '@hapi/hapi'
import Logger from '../../../plugins/logger.plugin'
import ClienteController from './clienteController/clienteController';
import ProdutoController from './produtoController/produtoController';
import PedidoController from './pedidoController/pedidoController';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<any> {
        Logger.info('Router - Start adding routes')

        await ClienteController.register(server);
        await ProdutoController.register(server);
        await PedidoController.register(server);

        Logger.info('Router - Finish adding routes')
    }
}
