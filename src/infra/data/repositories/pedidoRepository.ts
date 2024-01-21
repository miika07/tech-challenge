import { ItemPedidoEntity } from "../../../domain/entities/itemPedido";
import { PedidoEntity } from "../../../domain/entities/pedidos";


export interface PedidoRepositoryInterface {
    criarPedido(idCliente: string, status: string, itensPedido: ItemPedidoEntity[]): Promise<PedidoEntity>;
    buscarTodosPedidos(): Promise<PedidoEntity[]>;
    buscarPedidoPorId(id: string): Promise<PedidoEntity | undefined>;
    buscarPedidoPorStatus(status: string): Promise<PedidoEntity[]>;
    atualizarPedido(id: string, status: string, itensPedido: ItemPedidoEntity[] | []): Promise<PedidoEntity | undefined>;
    deletarPedido(id: string): Promise<boolean>;
}