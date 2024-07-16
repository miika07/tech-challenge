import { route, TestRouteOptions } from '../../common';
import nock from 'nock';
import Config from '../../../src/config/environment.config'

const { url } = Config.apis.pedidos

it('[GET] Buscar pedidos - 200', async () => {
    const params: TestRouteOptions = {
        method: 'GET',
        url: 'api/pedidos',
        basePath: '',
    };

    nock(url)
        .get('')
        .reply(204);
    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(204);
});

it('[GET] Buscar pedido por ID - 200', async () => {
    const pedidoId = '12345';
    const expectedResponse = {
        id: pedidoId,
        status: 'Recebido',
        cliente: 'Cliente 1',
        itensPedido: [
            { idProduto: 'prod1', quantidade: 2 },
            { idProduto: 'prod2', quantidade: 1 },
        ],
    };

    const params: TestRouteOptions = {
        method: 'GET',
        url: `api/pedido/${pedidoId}`,
        basePath: '',
    };

    nock(url)
        .get(`/${pedidoId}`)
        .reply(200, expectedResponse);

    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload).toEqual(expectedResponse);
});


it('[GET] Buscar pedidos não finalizados - 200', async () => {
    const expectedResponse = {
        pedidos: [
            { id: '1', status: 'em andamento', cliente: 'Cliente 1' },
            { id: '2', status: 'em andamento', cliente: 'Cliente 2' }
        ]
    };

    const params: TestRouteOptions = {
        method: 'GET',
        url: 'api/pedidos/nao-finalizados',
        basePath: '',
    };

    nock(url)
        .get('/status')
        .reply(200, expectedResponse);

    const { payload, statusCode } = await route(params);
    expect(statusCode).toBe(200);
    expect(payload).toEqual(expectedResponse);
});