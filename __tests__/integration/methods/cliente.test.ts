import { route, TestRouteOptions } from '../../common';
import nock from 'nock';
import Config from '../../../src/config/environment.config'

const { url } = Config.apis.clientes

  it('[POST] Adicionar um cliente - 200', async () => {
    const params: TestRouteOptions = {
      method: 'POST',
      url: 'api/cliente',
      basePath: '',
      payload: {
        nome: 'Melina Garcia',
        email: 'melina@test.com.br',
        cpf: '304.206.345-23'
      }
    };
    
    nock(url)
      .post('', params.payload)
      .reply(200, params.payload);

   
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
  });

  it('[POST] Adicionar um cliente com mesmo cpf - 400', async () => {
    const params: TestRouteOptions = {
      method: 'POST',
      url: 'api/cliente',
      basePath: '',
      payload: {
        nome: 'Melina Garcia',
        email: 'melina@test.com.br',
        cpf: '304.206.345-23'
      }
    };

    nock(url)
    .post('', params.payload)
    .reply(400, {error: "cliente já existe"});

    try {
      await route(params);
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.payload.data).toBe('Cliente já existe');
    }
  });


  it('[GET] Buscar cliente por ID - 200', async () => {
    
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente/${"c4e53126-5a73-4ed0-b428-76950ed35b8c"}`,
      basePath: '',
      query: {
        id: "c4e53126-5a73-4ed0-b428-76950ed35b8c"
      }
    };

    nock(url)
    .get(`/${"c4e53126-5a73-4ed0-b428-76950ed35b8c"}`)
    .reply(200, { nome: 'Melina Garcia',
                  email: 'melina@test.com.br',
                  cpf: '304.206.345-23'});

    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
  });

  it('[GET] Buscar cliente por ID inexistente - 404', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente/c4e53126-5a73-4ed0-b428-76950ed35b8c`,
      basePath: '',
    };

    nock(url)
    .get(`/${"c4e53126-5a73-4ed0-b428-76950ed35b8c"}`)
    .reply(404, {error: "Not found"});

    try {
      await route(paramsId);
    } catch (error) {
      expect(error.statusCode).toBe(404);
      expect(error.payload.data).toBe('Not found'); 
    }
   
  });

  it('[GET] Buscar cliente por CPF - 200', async () => {

    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente-cpf/${"304.206.345-23"}`,
      basePath: '',
      query: {
        id: "304.206.345-23"
      }
    };

    const cpf = '304.206.345-23';
    const mockResponse = { nome: 'Melina Garcia', cpf: '304.206.345-23', email: 'melina@test.com.br' };

    // Configurando o mock para a URL e resposta
    nock(url)
      .get(`/cpf/${cpf}`)
      .reply(200, mockResponse);


    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
    expect(payload.cpf).toBe('304.206.345-23');
  });

  it('[GET] Buscar cliente por CPF inexistente - 404', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente-cpf/000.000.000-00`,
      basePath: '',
    };

    const cpf = '000.000.000-00';
    const mockErrorResponse = { error: 'Not found' };

    nock(url)
      .get(`/cpf/${cpf}`)
      .reply(400, mockErrorResponse);

    try {
      await route(paramsId);
    } catch (error) {
      expect(error.statusCode).toBe(404);
      expect(error.payload.data).toBe('Not found');
    }
  });
