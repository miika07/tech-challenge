import * as Hapi from '@hapi/hapi'
import Logger from '../../plugins/logger.plugin'
import Config from '../../config/environment.config'
import { SwaggerPlugin } from '../../plugins/swagger.plugin'
import Router from './router'
import * as JWT from 'hapi-auth-jwt2'
import { AppDataSource } from '../data/database/data-source'
import { plugin } from 'hapi-alive';
import { CognitoJwtVerifier } from "aws-jwt-verify";

async function verifyToken(decoded, request) {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-east-1_5WTWlLU5B",
    tokenUse: "access",
    clientId: "t52frj6phsk6mti10u43gjq3b",
  });
  
  try {
      const authorizationHeader = request.headers.authorization;
      if (!authorizationHeader) {
          return { isValid: true };
      }
      
      const token = authorizationHeader.replace('Bearer ', '');
      const payload = await verifier.verify(token);
      
      return { isValid: true, credentials: payload };
  } catch (error) {
      console.error('Failed to verify token:', error);
      return { isValid: false };
  }
}

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
        
            await server.register(JWT)

            server.auth.strategy('jwt', 'jwt', {
              key: false,
              verify: verifyToken
            })

            server.auth.default('jwt')

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


