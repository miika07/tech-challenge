import { PagamentoRepositoryAdapter } from "../../../../infra/adapter/pagamento/pagamentoRepositoryAdapter";
import { PagamentoEntity } from "../../../domain/entities/pagamento";
import { parserPagamento, parserPagamentoDB } from "../../adapters/pagamento";
import { Pedido } from "../../models/pedido";

export default class PagamentoManagerUseCase {

    private adapter: PagamentoRepositoryAdapter = new PagamentoRepositoryAdapter();


    async criarPedido(status: string, idPedido: string): Promise<Pedido> {
        const pedidoDB: PagamentoEntity = parserPagamentoDB(status, idPedido);
        const response = await this.adapter.criarPagamento(pedidoDB)
        return parserPagamento(response);
    }

    async buscarPagamentoPorIdPedido(id: string): Promise<Pedido> {
        const response = await this.adapter.buscarPagamentoPorIdPedido(id);
        return response ? parserPagamento(response) : response;
    }

    async atualizarPagamentoStatus(status: string, idPedido: string): Promise<Pedido | undefined> {
        const pagamento = await this.adapter.buscarPagamentoPorIdPedido(idPedido);
        if (pagamento) {
            pagamento.status = status
            const response = await this.adapter.atualizarPagamentoStatus(pagamento);
            return parserPagamento(response);
        }
        return pagamento;
    }

}