import { route, TestRouteOptions } from '../../common';


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
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
  });

  it('[GET] Buscar todos os clientes - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/clientes',
      basePath: ''
    };
    
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload).toHaveLength(1);
  });

  it('[GET] Buscar cliente por ID - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/clientes',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente/${response.payload[0].id}`,
      basePath: '',
      query: {
        id:response.payload.id
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
  });

  it('[GET] Buscar cliente por CPF - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/clientes',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente-cpf/${response.payload[0].cpf}`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
    expect(payload.cpf).toBe('304.206.345-23');
  });

  it('[PUT] Atualizar cliente por ID - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/clientes',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'PUT',
      url: `api/cliente/${response.payload[0].id}`,
      basePath: '',
      payload: {
        nome: response.payload[0].nome,
        email: 'melina@gmail.com.br',
        cpf: response.payload[0].cpf
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Garcia');
    expect(payload.email).toBe('melina@gmail.com.br');
    expect(payload.cpf).toBe('304.206.345-23');
  });

  it('[DELETE] Deletar cliente por ID - 204', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/clientes',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'DELETE',
      url: `api/cliente/${response.payload[0].id}`,
      basePath: ''
    };
    const { statusCode } = await route(paramsId);
    expect(statusCode).toBe(204);

    const responseAfter = await route(params);
    expect(responseAfter.statusCode).toBe(200);
    expect(responseAfter.payload).toHaveLength(0);
  });
