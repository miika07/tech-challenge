import { PedidoRepositoryInterface } from "../../ports/pedidoRepository";
import { PedidoRepositoryAdapter } from "../../../../infra/adapter/pedido/pedidoRepositoryAdapter";
import { ItemPedidoEntity } from "../../../domain/entities/itemPedido";
import { PedidoEntity } from "../../../domain/entities/pedidos";


export default class PedidoManagerUseCase {

    private adapter: PedidoRepositoryAdapter;

    constructor() {
        this.adapter = new PedidoRepositoryAdapter();
    }

    async criarPedido(idCliente: string, status: string, itensPedido: ItemPedidoEntity[]): Promise<PedidoEntity> {
        return this.adapter.criarPedido(idCliente, status, itensPedido);
    }

    async buscarTodosPedidos(): Promise<PedidoEntity[]> {
        return this.adapter.buscarTodosPedidos();
    }

    async buscarPedidoPorId(id: string): Promise<PedidoEntity | undefined> {
        return this.adapter.buscarPedidoPorId(id);
    }

    async buscarPedidoPorStatus(status: string): Promise<PedidoEntity[]> {
        return this.adapter.buscarPedidoPorStatus(status);
    }

    async atualizarPedido(id: string, status: string = '', itensPedido: ItemPedidoEntity[]): Promise<PedidoEntity | undefined> {
        return this.adapter.atualizarPedido(id, status, itensPedido);
    }

    async deletarPedido(id: string): Promise<boolean> {
        return this.adapter.deletarPedido(id);
    }
}