import { PagamentoRepositoryAdapter } from "../../../../infra/adapter/pagamento/pagamentoRepositoryAdapter";
import { PedidoRepositoryAdapter } from "../../../../infra/adapter/pedido/pedidoRepositoryAdapter";

export default class WebhookManagerUseCase {

    private adapter: PagamentoRepositoryAdapter = new PagamentoRepositoryAdapter();
    private adapterPedido: PedidoRepositoryAdapter = new PedidoRepositoryAdapter();

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