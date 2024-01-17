import * as Hapi from '@hapi/hapi'
import Logger from '../../../plugins/logger.plugin'
import ClienteController from './clienteController/clienteController';
import ProdutoController from './produtoController/produtoController';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<any> {
        Logger.info('Router - Start adding routes')

        await ClienteController.register(server);
        await ProdutoController.register(server);

        Logger.info('Router - Finish adding routes')
    }
}
