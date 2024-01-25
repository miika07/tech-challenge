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
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(400);
    expect(payload.error).toBe('Cliente já existe');
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

  it('[GET] Buscar cliente por ID inexistente - 404', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente/c4e53126-5a73-4ed0-b428-76950ed35b8c`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(404);
    expect(payload.error).toBe('Not found');
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

  it('[GET] Buscar cliente por CPF inexistente - 404', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/cliente-cpf/305.234.211-34`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(404);
    expect(payload.error).toBe('Not found');
  });

  it('[PUT] Atualizar cliente - 200', async () => {
    const paramsId: TestRouteOptions = {
      method: 'PUT',
      url: `api/cliente`,
      basePath: '',
      payload: {
        nome: 'Melina Carniel',
        email: 'melina@gmail.com.br',
        cpf: '304.206.345-23'
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Melina Carniel');
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
