import { ItemPedido } from "./itensPedido";

export interface Pedido {
    id?: string;
    idCliente?: string;
    status: string;
    itemPedido?: ItemPedido[];
    numeroPedido?: number;
}