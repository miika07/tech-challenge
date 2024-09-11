import { ItemPedido } from "../../models/itensPedido";
import { CheckoutPedidoResponse, Pedido, Status } from "../../models/pedido";
import PedidosService from "../../../../service/pedidos.service";
import { RabbitMQClient } from "../../../../infra/rabbitmq/rabbitmqClient";

export default class PedidoManagerUseCase {

    private servicePedidos: PedidosService = new PedidosService();
    constructor(private rabbitMQClient: RabbitMQClient) { }

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

    async analisandoPagamento(pedido: any, idPedido: string, idCliente: string, status: string, itensPedido: ItemPedido[]) {
        let pedido = { cliente: idCliente, status, itensPedido, statusPagamento };

        if (pedido && pedido.status == "APROVADO") {
            const response = await this.atualizarStatusPedido(idPedido, "APROVADO");

            //Enviar para a cozinha
            //Adicionar evento

            return response.data;
        } else {
            throw new Error("Pagamento não aprovado");
        }
    }

    async checkoutPedido(idCliente: string, status: string, itensPedido: ItemPedido[]): Promise<CheckoutPedidoResponse> {
        const statusPagamento = "PENDENTE_PAGAMENTO";
        let pedido = { cliente: idCliente, status, itensPedido, statusPagamento };
        const responsePedido = await this.servicePedidos.criarPedido(pedido);
        const pedidoCriado = responsePedido.data;
        
        //Envia para serviço externo de pagamentos
        await this.rabbitMQClient.publicarEventos('pedidos', { retornoCriacao: responsePedido.data, pedido });

        return pedidoCriado;
    }
}