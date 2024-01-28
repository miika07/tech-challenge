import * as Hapi from '@hapi/hapi'
import Logger from '../../plugins/logger.plugin'
import Config from '../../config/environment.config'
import { SwaggerPlugin } from '../../plugins/swagger.plugin'
import Router from './router'
// import * as JWT from 'hapi-auth-jwt2'
import { AppDataSource } from '../data/database/data-source'
import { plugin } from 'hapi-alive';



const server = new Hapi.Server({
    port: Config.port
});

// tslint:disable-next-line
(async () => {
  try {
    const isTestEnvironment = process.env.NODE_ENV
    Logger.info(isTestEnvironment)
    if(isTestEnvironment != 'test'){
        AppDataSource.initialize()
            .then(() => {
                console.log("Iniciou o database");
            })
            .catch((error) => console.log(error))
            }
        
            // await Server._instance.register(JWT)

            // Server._instance.auth.strategy('jwt', 'jwt', {
            //   key: 'stubJWT',
            //   validate
            // })

            // Server._instance.auth.default('jwt')
            await server.register({
              plugin,
              options: {
                healthCheck: () => {
                  return { status: 'OK' };
                },
              },
            });
            await SwaggerPlugin.registerAll(server)
            await Router.loadRoutes(server)

            await server.start()

            Logger.info(
                `Server - Up and running at http://${Config.host}:${Config.port}`
            )
            Logger.info(
                `Server - Visit http://${Config.host}:${Config.port}/documentation for Swagger docs`
            )

            return server;
    
  } catch (error) {
    console.error('Server failed to start 8(');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();

export default server;


