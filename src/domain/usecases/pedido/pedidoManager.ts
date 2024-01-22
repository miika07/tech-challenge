import { AppDataSource } from "../../../infra/data/database/data-source";
import { AppDataSourceTest } from "../../../infra/data/database/data-source-teste";
import { PedidoRepositoryInterface } from "../../../infra/data/repositories/pedidoRepository";
import { PedidoEntity } from "../../entities/pedidos";
import { ItemPedidoEntity } from "../../entities/itemPedido";


export default class PedidoUseCases implements PedidoRepositoryInterface {
    private repository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(PedidoEntity)
        : AppDataSource.getRepository(PedidoEntity);

    private itemPedidoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(ItemPedidoEntity)
        : AppDataSource.getRepository(ItemPedidoEntity);

    async criarPedido(idCliente: string, status: string, itensPedido: ItemPedidoEntity[]): Promise<PedidoEntity> {
        const pedido = new PedidoEntity(idCliente, status, itensPedido);
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

    async buscarPedidoPorStatus(status: string): Promise<PedidoEntity[]> {
        return this.repository.find({ where: { status: status }, relations: { itensPedido: true } });
    }

    async atualizarPedido(id: string, status: string = '', itensPedido: ItemPedidoEntity[]): Promise<PedidoEntity | undefined> {
        const pedidoExistente = await this.repository.findOne({ where: { id: id }, relations: { itensPedido: true } });
        const pedidosOriginal = pedidoExistente.itensPedido;

        if (pedidoExistente) {

            if (status != '') {
                pedidoExistente.status = status;
            }

            let listaAtualizadaItens: ItemPedidoEntity[] = [];

            itensPedido.forEach(item => {

                let itemAtualizado: ItemPedidoEntity;

                let itemExistente = pedidoExistente.itensPedido.find(existe => {
                    let obj: any = existe.idProduto;
                    console.log(item.idProduto == obj.id);
                    if (item.idProduto == obj.id) return existe;
                });

                if (itemExistente) {
                    itemAtualizado = itemExistente;
                    itemAtualizado.quantidade = item.quantidade;
                } else {
                    itemAtualizado = new ItemPedidoEntity();
                    itemAtualizado.idPedido = pedidoExistente.id;
                    itemAtualizado.idProduto = item.idProduto;
                    itemAtualizado.quantidade = item.quantidade;
                }

                listaAtualizadaItens.push(itemAtualizado);
            });
            pedidoExistente.itensPedido = listaAtualizadaItens;

            let retorno = this.repository.save(pedidoExistente);

            /**remove itens que não tem mais pedido, pois o save não remove 
            esses itens altomaticamente do database, 
            apenas remove a ligação entre pedido e item pedido.**/

            let listaRemover = pedidosOriginal.filter(item => !pedidoExistente.itensPedido.includes(item));
            listaRemover.forEach(element => {
                this.itemPedidoRepository.remove(element);
            });

            return retorno;
        }

        return undefined;
    }

    async deletarPedido(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}
