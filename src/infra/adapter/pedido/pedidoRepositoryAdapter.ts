import { Not, Repository } from "typeorm";
import { PedidoRepositoryInterface } from "../../../core/applications/ports/pedidoRepository";
import { ItemPedidoEntity } from "../../../core/domain/entities/itemPedido";
import { PedidoEntity } from "../../../core/domain/entities/pedidos";

export class PedidoRepositoryAdapter implements PedidoRepositoryInterface {

    private pedidoRepository: Repository<PedidoEntity>;
    private itemPedidoRepository: Repository<ItemPedidoEntity>;

    constructor(pedidoRepository: Repository<PedidoEntity>, itemPedidoRepository: Repository<ItemPedidoEntity>) {
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
    }

    async criarPedido(pedido: PedidoEntity): Promise<PedidoEntity> {
        return this.pedidoRepository.save(pedido);
    }

    async buscarTodosPedidos(): Promise<PedidoEntity[]> {
        return this.pedidoRepository.find({
            relations: {
                itensPedido: true
            },
        });
    }

    async buscarPedidoPorId(id: string): Promise<PedidoEntity | undefined> {
        return this.pedidoRepository.findOne({ where: { id: id }, relations: { itensPedido: true } });
    }

    async buscarPedidoPorNumeroPedido(numeroPedido: number): Promise<PedidoEntity | undefined> {
        return this.pedidoRepository.findOne({ where: { numeroPedido: numeroPedido }, relations: { itensPedido: true } });
    }

    async buscarPedidoPorStatus(status: string): Promise<PedidoEntity[]> {
        return this.pedidoRepository.find({ where: { status: status }, relations: { itensPedido: true } });
    }

    async atualizarPedido(pedido: PedidoEntity): Promise<PedidoEntity> {
        return this.pedidoRepository.save(pedido);
    }

    async deletarPedido(id: string): Promise<boolean> {
        const result = await this.pedidoRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

    async deletarItensPedido(itensPedido): Promise<ItemPedidoEntity[]> {
        const result = itensPedido.forEach(element => {
            return this.itemPedidoRepository.remove(element);
        });
        return result;
    }

    async buscarPedidosNaoFinalizados(): Promise<PedidoEntity[]> {
        const result = this.pedidoRepository.find({
            where: [
                { status: Not("PENDENTE") },
                { status: Not("FINALIZADO") }
            ],
            relations: { itensPedido: true },
            order: { status: 'ASC', updatedAt: 'ASC' },
        });
        return result;
    }
}