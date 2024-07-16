import { ItemPedido } from "../../models/itensPedido";
import { CheckoutPedidoResponse, Pedido, Status } from "../../models/pedido";
import PedidosService from "../../../../service/pedidos.service";

export default class PedidoManagerUseCase {

    private servicePedidos: PedidosService = new PedidosService();

    async buscarTodosPedidos(): Promise<Pedido[]> {
        const response = await this.servicePedidos.buscarTodosPedidos();
        return response.data;
    }

    async buscarPedidoPorId(id: string): Promise<Pedido> {
        const response = await this.servicePedidos.buscarPedidosPorId(id);
        return response.data;
    }

    async atualizarStatusPedido(id: string, status: string): Promise<Pedido | undefined> {
        const pedido = await this.servicePedidos.buscarPedidosPorId(id);
        if (pedido) {
            pedido.status = status
            const response = await this.servicePedidos.atualizarPedido(pedido);
            return response.data
        }
        return pedido;
    }


    async buscarPedidosNaoFinalizados(): Promise<Pedido[]> {
        const response = await this.servicePedidos.buscarPedidosNaoFinalizados();
        return response.data;
    }

    async checkoutPedido(idCliente: string, status: string, itensPedido: ItemPedido[], statusPagamento: string): Promise<CheckoutPedidoResponse> {
        const pedido = { cliente: idCliente, status, itensPedido, statusPagamento};
        const response = await this.servicePedidos.criarPedido(pedido);
        return response.data;
    }
}