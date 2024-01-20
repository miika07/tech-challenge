import * as fs from 'fs';
import * as path from 'path';
import { ServerInjectOptions } from '@hapi/hapi';
import * as qs from 'querystring';
import Server from '../src/infra/api/server';
import { AppDataSourceTest } from '../src/infra/data/database/data-source-teste';


interface Route { basePath: string; statusCode: number; headers: any; payload?: { meta: any, records: any[] } | any; }
export interface TestRouteOptions {
  url: string;
  method: 'PUT' | 'GET' | 'POST' | 'DELETE' | 'PATCH';
  query?: any;
  payload?: any;
  headers?: any;
  auth?: boolean;
  basePath?: string;
  seller?: string;
}

export const route = async (parameters: TestRouteOptions): Promise<Route> => {
  const { url, method, query, payload, headers, auth, basePath } = parameters;

  const stringify = query ? `?${qs.stringify(query)}` : '';

  const options: ServerInjectOptions = {
    method,
    url: `${basePath}/${url}${stringify}`,
    headers: {
      ...(auth === undefined && { authorization: `${'stubJWT'}`, }),
      ...headers,
    },
    ...(payload && { payload }),
  };

  const { result, 'headers': responseHeaders, statusCode } = await Server.inject(options);
  return { basePath, payload: result, headers: responseHeaders, statusCode };
};

export const loadFiles = (currentDir, sequence) => {
  const folder = path.resolve(`${currentDir}/methods/`);
  const files = fs.readdirSync(folder);

  const modulePath = (name) => {
    return `${currentDir}/methods/${name}`;
  };
  const existModulePath = (name) => {
    return fs.existsSync(`${currentDir}/methods/${name}`);
  };
  for (let i = 0; i < sequence.length; i++) {
    const item = `${sequence[i]}.test`;
    files.filter((file) => {
      if (file.indexOf(item) >= 0) {
        if (existModulePath(file)) {
          require(modulePath(file));
        } else {
          throw new Error(`File not found: ${file}`);
        }
      }
    });
  }
};

export const requireMethods = (description, currentDir, sequence = ['cliente', 'produto', 'pedido']) => {
  describe(description, () => {

    beforeAll(async () => {
      console.log('Antes de todos os testes - Criando conexão...');
      await AppDataSourceTest.initialize();
    });

    beforeEach(async () => {
      jest.resetModules();
    });

    loadFiles(currentDir, sequence);

    afterAll(async () => {
      console.log('Depois de todos os testes - Fechando');
      await AppDataSourceTest.destroy();
    })
  });
};

export const printIfError = (statusCode: number, statusCodeExpected: number, response: any) => {
  if (Number(statusCode) !== Number(statusCodeExpected)) {
    console.error(JSON.stringify(response));
  }
};
