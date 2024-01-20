import { AppDataSource } from "../../../infra/data/database/data-source";
import { AppDataSourceTest } from "../../../infra/data/database/data-source-teste";
import { PedidoRepositoryInterface } from "../../../infra/data/repositories/pedidoRepository";
import { PedidoEntity } from "../../entities/pedidos";
import { ItemPedidoEntity } from "../../entities/itemPedido";


export default class PedidoUseCases implements PedidoRepositoryInterface {
    private repository = process.env.NODE_ENV == 'test' 
    ? AppDataSourceTest.getRepository(PedidoEntity) 
    : AppDataSource.getRepository(PedidoEntity);

        async criarPedido(idCliente: string, status: string): Promise<PedidoEntity> {
                const pedido = new PedidoEntity();
                pedido.idCliente = idCliente;
                pedido.status = status;
                return this.repository.save(pedido);
        }

        async buscarTodosPedidos(): Promise<PedidoEntity[]> {
        return this.repository.find({
            relations: {
                itensPedido: true
            },
        });
        }

            async buscarPedidoPorId(id: string): Promise<PedidoEntity | undefined> {
        return this.repository.findOne({ where: { id: id }, relations: { itensPedido: true } });
    }

        async atualizarPedido(id: string, status: string = '', itensPedido: ItemPedidoEntity[]): Promise<PedidoEntity | undefined> {
        const pedidoExistente = await this.repository.findOne({ where: { id: id }, relations: { itensPedido: true } });

        if (pedidoExistente) {
            
            if (status != '') {
                pedidoExistente.status = status;
            }

            pedidoExistente.itensPedido = itensPedido;

            return this.repository.save(pedidoExistente);
        }

        return undefined;
    }

        async deletarPedido(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}
