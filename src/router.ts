import * as Hapi from '@hapi/hapi'
//import StarWarsRoutes from './api/star-wars/routes'
import Logger from './plugins/logger.plugin'

export default class Router {
  public static async loadRoutes (server: Hapi.Server): Promise<any> {
    Logger.info('Router - Start adding routes')

    //await new StarWarsRoutes().register(server)

    Logger.info('Router - Finish adding routes')
  }
}
