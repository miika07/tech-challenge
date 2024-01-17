import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { PedidoManagerUseCase } from '../../../domain/usecases/pedido/pedidoManager';
import { ItemPedidoEntity } from '../../../domain/entities/itemPedido';


export default class PedidoController {
    public static async register(server: Hapi.Server): Promise<void> {

        server.route({
            method: 'GET',
            path: '/pedidos',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<any> => {
                try {
                    //Adicionar lógicas aqui para pedidos.
                    // const pedido = await PedidoManagerUseCase.criarPedido("e41f3680-0412-4a8d-b59a-95be533628b8", "criado");
                    let item = new ItemPedidoEntity();
                    item.idPedido = "4f50699a-4adb-4aad-9de9-a2e93e1b8257";
                    item.idProduto = "409f83f9-d7b1-4f2e-b1e1-78a61b9b530f";
                    item.quantidade = 2;
                    const pedidoAtualiza = await PedidoManagerUseCase.atualizarPedido("4f50699a-4adb-4aad-9de9-a2e93e1b8257", "preparando", [item]);
                    const pedidos = await PedidoManagerUseCase.buscarTodosPedidos();


                    return h.response(pedidos);
                } catch (error) {
                    Logger.error(`Error in GET /pedidos: ${error.message}`);
                    return h.response({ error: 'Internal Server Error' }).code(500);
                }
            },
        });
    }
}