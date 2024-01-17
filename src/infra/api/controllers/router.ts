import * as Hapi from '@hapi/hapi'
import Logger from '../../../plugins/logger.plugin'
import ClienteRoutes from './clienteController/clienteController';

export default class Router {
  public static async loadRoutes (server: Hapi.Server): Promise<any> {
    Logger.info('Router - Start adding routes')

    await ClienteRoutes.register(server);

    Logger.info('Router - Finish adding routes')
  }
}
