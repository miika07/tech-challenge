import { ItemPedido } from "../../models/itensPedido";
import { CheckoutPedidoResponse, Pedido, Status } from "../../models/pedido";
import PedidosService from "../../../../service/pedidos.service";
import { RabbitMQClient } from "../../../../infra/rabbitmq/rabbitmqClient";

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

    async analisandoPagamento(pedidoEvento: any) {
        const rabbitMQClient = new RabbitMQClient();
        await rabbitMQClient.criarConexaoRabbitMq();
        console.log(pedidoEvento);
        if (pedidoEvento && pedidoEvento.statusPagamento == "APROVADO") {
            // const response = await this.atualizarStatusPedido(pedidoEvento.retornoCriacao.idPedido, "APROVADO");
            const response = "teste";
            console.log("Evento 3 - EnviarPedidoCozinha");
            await rabbitMQClient.publicarEventosRoutingKey('exchange','enviarPedidoCozinha', { "type": "enviarPedidoCozinha", pedidoEvento, response });
            return response;
        } else {
            throw new Error("Pagamento não aprovado");
        }
    }

    async checkoutPedido(idCliente: string, status: string, itensPedido: ItemPedido[], statusPagamentoPg): Promise<CheckoutPedidoResponse> {
        const rabbitMQClient = new RabbitMQClient();
        await rabbitMQClient.criarConexaoRabbitMq();

        let statusPagamento = "PENDENTE_PAGAMENTO";
        let pedido = { cliente: idCliente, status, itensPedido, statusPagamento };
        // const returnData = await this.servicePedidos.criarPedido(pedido);
        // let responsePedido = returnData.data;
        let responsePedido = {idPedido: "1", numeroPedido: 1};
        const pedidoCriado = { idPedido: responsePedido.idPedido, numeroPedido: responsePedido.numeroPedido, mensagem: "Pendente pagamento." }

        //Envia para serviço externo de pagamentos
        console.log("Evento 1 - ProcessarPagamento");
        await rabbitMQClient.publicarEventosRoutingKey('exchange','processarPagamento', { statusPagamento, "type": "processarPagamento" });

        return pedidoCriado;
    }
}