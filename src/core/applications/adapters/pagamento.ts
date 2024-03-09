import { PagamentoEntity } from "../../domain/entities/pagamento";
import { Pagamento, Status } from "../models/pagamento";

export const parserPagamento = (pagamentoDB: PagamentoEntity) : Pagamento => {
    return {
        ...pagamentoDB.id && { id: pagamentoDB.id },
        idPedido: pagamentoDB.idPedido,
        status: Status[pagamentoDB.status]
    }
}

export const parserPagamentoDB = (status: string, idPedido: string): PagamentoEntity => {
    const pagamento = new PagamentoEntity(status, idPedido);
    return pagamento;
}
