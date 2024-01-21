import { route, TestRouteOptions } from '../../common';

it('[POST] Adicionar um produto - 200', async () => {
    const params: TestRouteOptions = {
      method: 'POST',
      url: 'api/produto',
      basePath: '',
      payload: {
        nome: "x-salada",
        descricao: "Pão, salada, hamburguer, queijo",
        preco: 22.50,
        categoria: "Lanches"
      }
    };
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('x-salada');
  });

  it('[POST] Erro ao adicionar um produto com categoria não válida - 400', async () => {
    const params: TestRouteOptions = {
      method: 'POST',
      url: 'api/produto',
      basePath: '',
      payload: {
        nome: "x-salada",
        descricao: "Pão, salada, hamburguer, queijo",
        preco: 22.50,
        categoria: "Hamburguer"
      }
    };
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(400);
    expect(payload.error).toBe('Bad Request');
    expect(payload.message).toBe('Invalid request payload input');
  });

  it('[GET] Buscar todos os produtos - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/produtos',
      basePath: ''
    };
    
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload).toHaveLength(1);
  });

  it('[GET] Buscar produto por ID - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/produtos',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/produto/${response.payload[0].id}`,
      basePath: '',
      query: {
        id:response.payload.id
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('x-salada');
  });

  it('[GET] Buscar produto por Categoria - 200', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/produto/categoria/Lanches`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload[0].nome).toBe('x-salada');
  });

  it('[GET] Buscar produto por Categoria - 404', async () => {
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/produto/categoria/Bebidas`,
      basePath: '',
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(404);
  });

  it('[PUT] Atualizar produto por ID - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/produtos',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'PUT',
      url: `api/produto/${response.payload[0].id}`,
      basePath: '',
      payload: {
        nome: response.payload[0].nome,
        descricao: response.payload[0].descricao,
        preco: 25.50,
        categoria: response.payload[0].categoria
      }
    };
    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('x-salada');
    expect(payload.preco).toBe(25.50);
  });

  it('[DELETE] Deletar produto por ID - 204', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/produtos',
      basePath: ''
    };
    
    const response = await route(params);
    expect(response.statusCode).toBe(200);

    const paramsId: TestRouteOptions = {
      method: 'DELETE',
      url: `api/produto/${response.payload[0].id}`,
      basePath: ''
    };
    const { statusCode } = await route(paramsId);
    expect(statusCode).toBe(204);

    const responseAfter = await route(params);
    expect(responseAfter.statusCode).toBe(200);
    expect(responseAfter.payload).toHaveLength(0);
  });




