import { route, TestRouteOptions } from '../../common';
import nock from 'nock';
import Config from '../../../src/config/environment.config'

const { url } = Config.apis.produtos;

const mockResponse = [
  {
    id: "c4e53126-5a73-4ed0-b428-76950ed35b8c",
    nome: "x-salada",
    descricao: "Pão, salada, hamburguer, queijo",
    preco: 22.50,
    categoria: "Hamburguer"
  },
  {
    id: "c4e53126-5a73-4ed0-b428-76950ed35djs",
    nome: "Batata M",
    descricao: "batata frita tamanho M",
    preco: 10.50,
    categoria: "Acompanhamentos"
  }
]

  it('[GET] Buscar todos os produtos - 200', async () => {
    const params: TestRouteOptions = {
      method: 'GET',
      url: 'api/produtos',
      basePath: ''
    };

    nock(url)
    .get('')
    .reply(200, mockResponse);
    
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload).toHaveLength(2);
  });

  it('[GET] Buscar produto por ID - 200', async () => {
    const id = '12345';
    const mockResponse = { id: '12345', nome: 'Produto Teste', preco: 99.99 };

    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/produto/${id}`,
      basePath: '',
      query: {
        id
      }
    };
    
    nock(url)
      .get(`/${id}`)
      .reply(200, mockResponse);

    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload.nome).toBe('Produto Teste');
  });

  it('[GET] Buscar produto por Categoria - 200', async () => {
    const categoria = 'Lanches';
    
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/produto/categoria/Lanches`,
      basePath: '',
    };
    
    nock(url)
      .get(`/categoria/${categoria}`)
      .reply(200, mockResponse);

    const { payload, statusCode } = await route(paramsId);
    expect(statusCode).toBe(200);
    expect(payload[0].nome).toBe('x-salada');
  });

  it('[GET] Buscar produto por Categoria - 404', async () => {
    const categoria = 'Lanches';
    
    const paramsId: TestRouteOptions = {
      method: 'GET',
      url: `api/produto/categoria/Lanches`,
      basePath: '',
    };

    const mockErrorResponse = { error: 'Not found' };

    nock(url)
      .get(`/categoria/${categoria}`)
      .reply(404, mockErrorResponse);

    try {
      await route(paramsId);
    } catch (error) {
      expect(error.statusCode).toBe(404);
    }
  });
