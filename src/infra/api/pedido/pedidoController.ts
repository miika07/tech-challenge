import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ItemPedidoEntity } from '../../../core/domain/entities/itemPedido';
import PedidoManagerUseCase from '../../../core/applications/usecases/pedido/pedidoManagerUseCase';

export default class PedidoController {

    //Pedido
    private readonly pedidoManagerUseCase: PedidoManagerUseCase = new PedidoManagerUseCase();

    public buscarTodosPedidos = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pedidoManagerUseCase.buscarTodosPedidos()
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in GET /pedidos: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarPedidoPorID = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pedidoManagerUseCase.buscarPedidoPorId(request.params.id)
            if (data) {
                return h.response(data).code(200);
            }
            return h.response({ error: 'Not found' }).code(404);
        } catch (error) {
            Logger.error(`Error in GET /pedido/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public checkoutPedido = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { cliente: string, status: string, itensPedido: ItemPedidoEntity[], statusPagamento: string };
            const data = await this.pedidoManagerUseCase.checkoutPedido(body.cliente, body.status, body.itensPedido, body.statusPagamento)
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in POST /pedido: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }


    public atualizarStatusPedido = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { status: string };
            const data = await this.pedidoManagerUseCase.atualizarStatusPedido(request.params.id, body.status)
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in PUT /pedido/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarPedidosNaoFinalizados = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pedidoManagerUseCase.buscarPedidosNaoFinalizados()
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in GET /pedidos/nao-finalizados: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }
}