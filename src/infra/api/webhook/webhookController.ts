import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import WebhookManagerUseCase from '../../../core/applications/usecases/webhook/webhookManagerUseCase';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import { AppDataSource } from '../../data/database/data-source';
import { PedidoEntity } from '../../../core/domain/entities/pedidos';
import { PagamentoEntity } from '../../../core/domain/entities/pagamento';
import { PagamentoRepositoryAdapter } from '../../adapter/pagamento/pagamentoRepositoryAdapter';
import { PedidoRepositoryAdapter } from '../../adapter/pedido/pedidoRepositoryAdapter';
import { ItemPedidoEntity } from '../../../core/domain/entities/itemPedido';

export default class WebhookController {

    private pedidoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(PedidoEntity)
        : AppDataSource.getRepository(PedidoEntity);
    private pagamentoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(PagamentoEntity)
        : AppDataSource.getRepository(PagamentoEntity);
    private itemPedidoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(ItemPedidoEntity)
        : AppDataSource.getRepository(ItemPedidoEntity);

    private pagamentoAdapter = new PagamentoRepositoryAdapter(this.pagamentoRepository);
    private pedidoAdapter: PedidoRepositoryAdapter = new PedidoRepositoryAdapter(this.pedidoRepository, this.itemPedidoRepository);

    private readonly webhookUseCase: WebhookManagerUseCase = new WebhookManagerUseCase(this.pagamentoAdapter, this.pedidoAdapter);

    public webhookPagamento = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { idPedido: string, statusPagamento: string };
            await this.webhookUseCase.atualizarStatusPedido(body.idPedido, body.statusPagamento)
            return h.response(ok)
        } catch (error) {
            Logger.error(`Error in POST /webhook: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

}