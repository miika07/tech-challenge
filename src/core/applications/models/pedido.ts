import { ItemPedido } from "./itensPedido";

export enum Status {
    RECEBIDO = 'Recebido',
    EM_PREPARACAO = 'Em preparação',
    PRONTO = 'Pronto',
    FINALIZADO = 'Finalizado'
}

export interface Pedido {
    id?: string;
    idCliente?: string;
    status: string;
    itensPedido?: ItemPedido[];
    numeroPedido?: number;
}