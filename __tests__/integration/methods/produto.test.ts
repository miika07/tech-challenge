// import { route, TestRouteOptions } from '../../common';

//   it('[GET] Buscar todos os produtos - 200', async () => {
//     const params: TestRouteOptions = {
//       method: 'GET',
//       url: 'api/produtos',
//       basePath: ''
//     };
    
//     const { payload, statusCode } = await route(params);
//     expect(statusCode).toBe(200);
//     expect(payload).toHaveLength(1);
//   });

//   it('[GET] Buscar produto por ID - 200', async () => {
//     const params: TestRouteOptions = {
//       method: 'GET',
//       url: 'api/produtos',
//       basePath: ''
//     };
    
//     const response = await route(params);
//     expect(response.statusCode).toBe(200);

//     const paramsId: TestRouteOptions = {
//       method: 'GET',
//       url: `api/produto/${response.payload[0].id}`,
//       basePath: '',
//       query: {
//         id:response.payload.id
//       }
//     };
//     const { payload, statusCode } = await route(paramsId);
//     expect(statusCode).toBe(200);
//     expect(payload.nome).toBe('x-salada');
//   });

//   it('[GET] Buscar produto por Categoria - 200', async () => {
//     const paramsId: TestRouteOptions = {
//       method: 'GET',
//       url: `api/produto/categoria/Lanches`,
//       basePath: '',
//     };
//     const { payload, statusCode } = await route(paramsId);
//     expect(statusCode).toBe(200);
//     expect(payload[0].nome).toBe('x-salada');
//   });

//   it('[GET] Buscar produto por Categoria - 404', async () => {
//     const paramsId: TestRouteOptions = {
//       method: 'GET',
//       url: `api/produto/categoria/Bebidas`,
//       basePath: '',
//     };
//     const { payload, statusCode } = await route(paramsId);
//     expect(statusCode).toBe(404);
//   });
