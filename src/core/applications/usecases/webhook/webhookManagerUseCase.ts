import { PagamentoRepositoryAdapter } from "../../../../infra/adapter/pagamento/pagamentoRepositoryAdapter";
import { PedidoRepositoryAdapter } from "../../../../infra/adapter/pedido/pedidoRepositoryAdapter";

export default class WebhookManagerUseCase {

    private adapter: PagamentoRepositoryAdapter;
    private adapterPedido: PedidoRepositoryAdapter;

    constructor(adapter: PagamentoRepositoryAdapter, adapterPedido: PedidoRepositoryAdapter){
        this.adapter = adapter;
        this.adapterPedido = adapterPedido
    }

    async atualizarStatusPedido(idPedido: string, statusPagamento: string): Promise<Boolean> {
        const pagamento = await this.adapter.buscarPagamentoPorIdPedido(idPedido);
        if (pagamento) {
            pagamento.status = statusPagamento
            await this.adapter.atualizarPagamentoStatus(pagamento);
            const pedido = await this.adapterPedido.buscarPedidoPorId(idPedido);
            if(pedido && statusPagamento === 'APROVADO'){
                pedido.status = 'RECEBIDO';
                await this.adapterPedido.atualizarPedido(pedido);
            }
            return true;
        }
        return false;
    }
}