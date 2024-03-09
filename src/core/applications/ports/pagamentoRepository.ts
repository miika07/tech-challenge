import { PagamentoEntity } from "../../domain/entities/pagamento";

export interface PagamentoRepositoryInterface {
    criarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
    buscarPagamentoPorIdPedido(idPedido: string): Promise<PagamentoEntity>;
    atualizarPagamentoStatus(pagamento: PagamentoEntity): Promise<PagamentoEntity | undefined>;
}