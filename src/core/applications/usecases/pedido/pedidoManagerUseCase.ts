import { PedidoRepositoryAdapter } from "../../../../infra/adapter/pedido/pedidoRepositoryAdapter";
import { ItemPedidoEntity } from "../../../domain/entities/itemPedido";
import { PedidoEntity } from "../../../domain/entities/pedidos";
import { parserItemPedido, parserItems, parserNewPedidoDB, parserPedido, parserPedidoDB, parserPedidos } from "../../adapters/pedido";
import { ItemPedido } from "../../models/itensPedido";
import { Pedido } from "../../models/pedido";

export default class PedidoManagerUseCase {

    private adapter: PedidoRepositoryAdapter = new PedidoRepositoryAdapter();


    async criarPedido(idCliente: string, status: string, itensPedido: ItemPedido[]): Promise<Pedido> {
        const pedidoDB: PedidoEntity = parserNewPedidoDB(idCliente, status, itensPedido);
        const response = await this.adapter.criarPedido(pedidoDB)
        return parserPedido(response);
    }

    async buscarTodosPedidos(): Promise<Pedido[]> {
        const response = await this.adapter.buscarTodosPedidos();
        return parserPedidos(response);
    }

    async buscarPedidoPorId(id: string): Promise<Pedido> {
        const response = await this.adapter.buscarPedidoPorId(id);
        return response ? parserPedido(response) : response;
    }

    async buscarPedidoPorStatus(status: string): Promise<Pedido[]> {
        const response = await this.adapter.buscarPedidoPorStatus(status);
        return response ? parserPedidos(response) : response;
    }

    async atualizarPedido(id: string, status: string = '', itensPedido: ItemPedido[]): Promise<Pedido | undefined> {
        const pedido = await this.adapter.buscarPedidoPorId(id);
        if (pedido) {
            const itensPedidoParsed = parserItems(id, itensPedido,pedido.itensPedido);
            const pedidoDB = parserPedidoDB(pedido.id, pedido.idCliente, status, itensPedidoParsed.itensPedidoDB, pedido.numeroPedido);
            const response = await this.adapter.atualizarPedido(pedidoDB);
            const removerItensDB = this.adapter.deletarItensPedido(itensPedidoParsed.itensRemover);
            return parserPedido(response);
        }
        
        return pedido;
    }

    async deletarPedido(id: string): Promise<boolean> {
        return this.adapter.deletarPedido(id);
    }
}