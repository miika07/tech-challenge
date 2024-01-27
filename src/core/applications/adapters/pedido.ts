import { ItemPedidoEntity } from "../../domain/entities/itemPedido";
import { PedidoEntity } from "../../domain/entities/pedidos";
import { ItemPedido } from "../models/itensPedido";
import { Pedido } from "../models/pedido";

export const parserNewItensPedidoDB = (idProduto: string, quantidade: number): ItemPedidoEntity => {
    const itemPedidoDB = new ItemPedidoEntity(idProduto, quantidade);
    return itemPedidoDB;
}

export const parserItemPedido = (itemPedidoDB: ItemPedidoEntity): ItemPedido => {
    return {
        ...itemPedidoDB.id && { id: itemPedidoDB.id },
        idPedido: itemPedidoDB.idPedido,
        idProduto: itemPedidoDB.idProduto,
        quantidade: itemPedidoDB.quantidade
    }
}

export const parserItems = (itensPedido: ItemPedido[], itensPedidoDB: ItemPedidoEntity[]) => {
    // ver o que tem na pedidodb e na itens pedido e atualizar a quantidade
    itensPedidoDB.forEach(itens => {
        const pedidoExistente = itensPedido.find((item) => item.idProduto === itens.idProduto);
        if(pedidoExistente){
            itens.quantidade = pedidoExistente.quantidade
        }
    })
    // ver o que não tem na pedidosdb e criar uma nova
    itensPedido.

    // ver o que tem na pedidos db e não tem na pedidos e deletar
    return {itensPedidosDB: lffkf,
    itensremover: []}
}

export const parserNewPedidoDB = (idCliente: string, status: string, itensPedido: ItemPedido[]): PedidoEntity => {
    const itensPedidoDB: ItemPedidoEntity[] = itensPedido.map(item => parserNewItensPedidoDB(item.idProduto, item.quantidade));
    const produto = new PedidoEntity(idCliente, status, itensPedidoDB);
    return produto;
}

export const parserPedidoDB = (id: string, idCliente: string, status: string, itensPedido: ItemPedidoEntity[], numeroPedido: number): PedidoEntity => {
    return {
        id,
        idCliente,
        status,
        itensPedido,
        numeroPedido
    }
}

export const parserPedido = (pedidoDB: PedidoEntity) : Pedido => {
    return {
        ...pedidoDB.id && { id: pedidoDB.id },
        ...pedidoDB.idCliente && { idCliente: pedidoDB.idCliente }, 
        status: pedidoDB.status,
        itemPedido: pedidoDB.itensPedido.map(item => parserItemPedido(item)),
        numeroPedido: pedidoDB.numeroPedido
    }
}

export const parserPedidos = (pedidosDB: PedidoEntity[]) : Pedido[] => {
    const pedidos: Pedido[] = [];
    pedidosDB.forEach((pedidoDB) => {
        pedidos.push({
            ...pedidoDB.id && { id: pedidoDB.id },
            ...pedidoDB.idCliente && { idCliente: pedidoDB.idCliente }, 
            status: pedidoDB.status,
            itemPedido: pedidoDB.itensPedido.map(item => parserItemPedido(item)),
            numeroPedido: pedidoDB.numeroPedido
        })
    })
    return pedidos;
}