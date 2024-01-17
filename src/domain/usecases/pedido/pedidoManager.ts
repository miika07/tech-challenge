import { AppDataSource } from "../../../infra/data/database/data-source";
import { PedidoRepositoryInterface } from "../../../infra/data/repositories/pedidoRepository";
import { PedidoEntity } from "../../entities/pedidos";
import { ItemPedidoEntity } from "../../entities/itemPedido";


export const PedidoManagerUseCase: PedidoRepositoryInterface = AppDataSource.getRepository(PedidoEntity).extend({
    async criarPedido(idCliente: string, status: string): Promise<PedidoEntity> {
        const pedido = new PedidoEntity();
        pedido.idCliente = idCliente;
        pedido.status = status;
        return this.save(pedido);
    },

    async buscarTodosPedidos(): Promise<PedidoEntity[]> {
        return this.find({
            relations: {
                itensPedido: true
            },
        });
    },

    async buscarPedidoPorId(id: string): Promise<PedidoEntity | undefined> {
        return this.findOne({ where: { id: id }, relations: { itensPedido: true } });
    },

    async atualizarPedido(id: string, status: string = '', itensPedido: ItemPedidoEntity[]): Promise<PedidoEntity | undefined> {
        const pedidoExistente = await this.findOne({ where: { id: id }, relations: { itensPedido: true } });

        if (pedidoExistente) {
            
            if (status != '') {
                pedidoExistente.status = status;
            }

            pedidoExistente.itensPedido = itensPedido;

            return this.save(pedidoExistente);
        }

        return undefined;
    },

    async deletarPedido(id: string): Promise<boolean> {
        const result = await this.delete(id);
        return result.affected !== undefined && result.affected > 0;
    },
});
