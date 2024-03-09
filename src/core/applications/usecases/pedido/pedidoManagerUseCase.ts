import { PedidoRepositoryAdapter } from "../../../../infra/adapter/pedido/pedidoRepositoryAdapter";
import { PedidoEntity } from "../../../domain/entities/pedidos";
import { parserPedidosComDescricao, parserCheckoutPedido, parserItems, parserNewPedidoDB, parserPedido, parserPedidoDB, parserPedidos } from "../../adapters/pedido";
import { ItemPedido } from "../../models/itensPedido";
import { CheckoutPedidoResponse, Pedido, Status } from "../../models/pedido";
import PagamentoManagerUseCase from "../pagamento/pagamentoManagerUseCase";

export default class PedidoManagerUseCase {

    private adapter: PedidoRepositoryAdapter = new PedidoRepositoryAdapter();
    private pagamentoUseCase: PagamentoManagerUseCase = new PagamentoManagerUseCase();


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

    async atualizarPedido(id: string, status: string, itensPedido: ItemPedido[]): Promise<Pedido | undefined> {
        const pedido = await this.adapter.buscarPedidoPorId(id);
        if (pedido) {
            const itensPedidoParsed = parserItems(id, itensPedido,pedido.itensPedido);
            const pedidoDB = parserPedidoDB(pedido.id, pedido.idCliente, status, itensPedidoParsed.itensPedidoDB, pedido.numeroPedido);
            const response = await this.adapter.atualizarPedido(pedidoDB);
            await this.adapter.deletarItensPedido(itensPedidoParsed.itensRemover);
            return parserPedido(response);
        }
        
        return pedido;
    }

    async atualizarStatusPedido(id: string, status: string): Promise<Pedido | undefined> {
        const pedido = await this.adapter.buscarPedidoPorId(id);
        if (pedido) {
            pedido.status = status
            const response = await this.adapter.atualizarPedido(pedido);
            return parserPedido(response);
        }
        return pedido;
    }

    async deletarPedido(id: string): Promise<boolean> {
        return this.adapter.deletarPedido(id);
    }

    async buscarPedidosNaoFinalizados(): Promise<Pedido[]> {
        const response = await this.adapter.buscarPedidosNaoFinalizados();
        const pedidosComParse = parserPedidosComDescricao(response);

        const listaPronto = pedidosComParse.filter(objeto => objeto.status === Status.PRONTO);
        const listaEmPreparacao = pedidosComParse.filter(objeto => objeto.status === Status.EM_PREPARACAO);
        const listaRecebido = pedidosComParse.filter(objeto => objeto.status === Status.RECEBIDO);

        const result = listaPronto.concat(listaEmPreparacao, listaRecebido);

        return result;
    }
    
    async checkoutPedido(idCliente: string, status: string, itensPedido: ItemPedido[], statusPagamento: string): Promise<CheckoutPedidoResponse>{
        const pedidoDB: PedidoEntity = parserNewPedidoDB(idCliente, status, itensPedido);
        const response = await this.adapter.criarPedido(pedidoDB);

        await this.pagamentoUseCase.criarPagamento(statusPagamento, response.id)
        return parserCheckoutPedido(response);
    }
}