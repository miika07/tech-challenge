import { ItemPedido } from "./itensPedido";

export enum Status {
    PENDENTE_PAGAMENTO = "Pendente pagamento",
    RECEBIDO = 'Recebido',
    EM_PREPARACAO = 'Em preparação',
    PRONTO = 'Pronto',
    FINALIZADO = 'Finalizado'
}

export class Pedido {
    id?: string;
    idCliente?: string;
    status: string;
    itensPedido?: ItemPedido[];
    numeroPedido?: number;
}

export class CheckoutPedidoResponse {
    idPedido?: string;
    numeroPedido?: number;
}