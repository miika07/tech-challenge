import * as Hapi from '@hapi/hapi'
import Logger from '../plugins/logger.plugin'
import Config from '../config/environment.config'
import HapiSwagger from 'hapi-swagger'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'

export class SwaggerPlugin {
  private static async register (
    server: Hapi.Server,
    plugin: any
  ): Promise<void> {
    Logger.debug('registering: ' + JSON.stringify(plugin))

    return await new Promise((resolve, reject) => {
      server.register(plugin)
      resolve()
    })
  }

  public static async swagger (server: Hapi.Server): Promise<Error | any> {
    try {
      Logger.info('Plugins - Registering swagger-ui')

      await this.register(server, [
        Vision,
        Inert,
        {
          options: Config.plugins.swagger.options,
          plugin: HapiSwagger
        }
      ])
    } catch (error) {
      Logger.info(
        `Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`
      )
    }
  }

  public static async registerAll (server: Hapi.Server): Promise<Error | any> {
    await this.swagger(server)
  }
}
