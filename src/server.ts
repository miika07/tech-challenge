import * as Hapi from '@hapi/hapi'
import Logger from './plugins/logger.plugin'
import Config from './config/environment.config'
import { SwaggerPlugin } from './plugins/swagger.plugin'
import Router from './router'
import * as JWT from 'hapi-auth-jwt2'

const validate = async function (): Promise<any> {
  return { isValid: true }
}
export default class Server {
  private static _instance: Hapi.Server

  public static async start (): Promise<Hapi.Server> {
    try {
      Server._instance = new Hapi.Server({
        port: Config.port
      })
      await Server._instance.register(JWT)

      Server._instance.auth.strategy('jwt', 'jwt', {
        key: 'stubJWT',
        validate
      })

      Server._instance.auth.default('jwt')

      await SwaggerPlugin.registerAll(Server._instance)
      await Router.loadRoutes(Server._instance)

      await Server._instance.start()

      Logger.info(
        `Server - Up and running at http://${Config.host}:${Config.port}`
      )
      Logger.info(
        `Server - Visit http://${Config.host}:${Config.port}/documentation for Swagger docs`
      )

      return Server._instance
    } catch (error) {
      Logger.info(`Server - There was something wrong: ${error}`)

      throw error
    }
  }

  public static async stop (): Promise<any> {
    Logger.info('Server - Stopping execution')

    return Server._instance.stop()
  }

  public static async recycle (): Promise<Hapi.Server> {
    Logger.info('Server - Recycling instance')

    await Server.stop()

    return await Server.start()
  }

  public static instance (): Hapi.Server {
    return Server._instance
  }

  public static async inject (
    options: string | Hapi.ServerInjectOptions
  ): Promise<Hapi.ServerInjectResponse> {
    return Server._instance.inject(options)
  }
}
