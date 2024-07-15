import { PedidoEntity } from "../../../domain/entities/pedidos";
import { parserPedidosComDescricao, parserCheckoutPedido, parserNewPedidoDB, parserPedido, parserPedidos } from "../../adapters/pedido";
import { ItemPedido } from "../../models/itensPedido";
import { CheckoutPedidoResponse, Pedido, Status } from "../../models/pedido";
import PedidosService from "../../../../service/pedidos.service";

export default class PedidoManagerUseCase {

    private servicePedidos: PedidosService = new PedidosService();

    async buscarTodosPedidos(): Promise<Pedido[]> {
        const response = await this.servicePedidos.buscarTodosPedidos();
        return parserPedidos(response);
    }

    async buscarPedidoPorId(id: string): Promise<Pedido> {
        const response = await this.servicePedidos.buscarPedidosPorId(id);
        return response ? parserPedido(response) : response;
    }

    async atualizarStatusPedido(id: string, status: string): Promise<Pedido | undefined> {
        const pedido = await this.servicePedidos.buscarPedidosPorId(id);
        if (pedido) {
            pedido.status = status
            const response = await this.servicePedidos.atualizarPedido(pedido);
            return parserPedido(response);
        }
        return pedido;
    }


    async buscarPedidosNaoFinalizados(): Promise<Pedido[]> {
        const response = await this.servicePedidos.buscarPedidosNaoFinalizados();
        const pedidosComParse = parserPedidosComDescricao(response);

        const listaPronto = pedidosComParse.filter(objeto => objeto.status === Status.PRONTO);
        const listaEmPreparacao = pedidosComParse.filter(objeto => objeto.status === Status.EM_PREPARACAO);
        const listaRecebido = pedidosComParse.filter(objeto => objeto.status === Status.RECEBIDO);

        const result = listaPronto.concat(listaEmPreparacao, listaRecebido);

        return result;
    }

    async checkoutPedido(idCliente: string, status: string, itensPedido: ItemPedido[], statusPagamento: string): Promise<CheckoutPedidoResponse> {
        const pedidoDB: PedidoEntity = parserNewPedidoDB(idCliente, status, itensPedido);
        const response = await this.servicePedidos.criarPedido(pedidoDB);
        return parserCheckoutPedido(response);
    }
}