import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ItemPedidoEntity } from '../../../core/domain/entities/itemPedido';
import PedidoManagerUseCase from '../../../core/applications/usecases/pedido/pedidoManagerUseCase';
import { ok } from 'assert';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import { AppDataSource } from '../../data/database/data-source';
import { PedidoRepositoryAdapter } from '../../adapter/pedido/pedidoRepositoryAdapter';
import PagamentoManagerUseCase from '../../../core/applications/usecases/pagamento/pagamentoManagerUseCase';
import { PagamentoRepositoryAdapter } from '../../adapter/pagamento/pagamentoRepositoryAdapter';
import { PagamentoEntity } from '../../../core/domain/entities/pagamento';
import { PedidoEntity } from '../../../core/domain/entities/pedidos';

export default class PedidoController {

    //Repositories
    private pedidoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(PedidoEntity)
        : AppDataSource.getRepository(PedidoEntity);
    private itemPedidoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(ItemPedidoEntity)
        : AppDataSource.getRepository(ItemPedidoEntity);
    private pagamentoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(PagamentoEntity)
        : AppDataSource.getRepository(PagamentoEntity);
    
    //Pagamento
    private pagamentoAdapter = new PagamentoRepositoryAdapter(this.pagamentoRepository);
    private pagamentoUseCase = new PagamentoManagerUseCase(this.pagamentoAdapter);

    //Pedido
    private adapter: PedidoRepositoryAdapter = new PedidoRepositoryAdapter(this.pedidoRepository, this.itemPedidoRepository);
    private readonly pedidoManagerUseCase: PedidoManagerUseCase = new PedidoManagerUseCase(this.adapter, this.pagamentoUseCase);

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