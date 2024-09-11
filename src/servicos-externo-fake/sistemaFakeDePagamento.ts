import amqp from 'amqplib';

export default class SistemaFakeDePagamento {

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