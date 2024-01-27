import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ItemPedidoEntity } from '../../../core/domain/entities/itemPedido';
import PedidoManagerUseCase from '../../../core/applications/usecases/pedido/pedidoManagerUseCase';
import { ok } from 'assert';

export default class PedidoController {
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
            if (data){
                return h.response(data).code(200);
              }
              return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /pedido/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarPedidoPorStatus = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pedidoManagerUseCase.buscarPedidoPorStatus(request.params.status);
            if (!data.length) {
                return h.response('Não existem pedidos para esse status').code(404)
            }
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in GET /pedido/status/${request.params.status}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public adicionarPedido = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { cliente: string, status: string, itensPedido: ItemPedidoEntity[] };
            const data = await this.pedidoManagerUseCase.criarPedido(body.cliente, body.status, body.itensPedido)
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in POST /pedido: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public deletarPedido = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pedidoManagerUseCase.deletarPedido(request.params.id)
            return h.response(ok)
        } catch (error) {
            Logger.error(`Error in DELETE /pedido/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public atualizarPedido = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { cliente: string, status: string, itensPedido: [ItemPedidoEntity] };
            const data = await this.pedidoManagerUseCase.atualizarPedido(request.params.id, body.status, body.itensPedido)
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in PUT /pedido/${request.params.id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

}