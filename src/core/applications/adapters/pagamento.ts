import { PagamentoEntity } from "../../domain/entities/pagamento";
import { Pagamento } from "../models/pagamento";

export const parserPagamento = (pagamentoDB: PagamentoEntity) : Pagamento => {
    return {
        ...pagamentoDB.id && { id: pagamentoDB.id },
        idPedido: pagamentoDB.idPedido,
        status: pagamentoDB.status
    }
}

export const parserPagamentoDB = (status: string, idPedido: string): PagamentoEntity => {
    const pagamento = new PagamentoEntity(status, idPedido);
    return pagamento;
}
