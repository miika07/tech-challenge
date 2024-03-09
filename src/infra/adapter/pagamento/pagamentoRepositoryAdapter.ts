import { Repository } from "typeorm";
import { PagamentoRepositoryInterface } from "../../../core/applications/ports/pagamentoRepository";
import { AppDataSource } from "../../data/database/data-source";
import { AppDataSourceTest } from "../../data/database/data-source-teste";
import { PagamentoEntity } from "../../../core/domain/entities/pagamento";

export class PagamentoRepositoryAdapter implements PagamentoRepositoryInterface {

    private pagamentoRepository: Repository<PagamentoEntity>;

    constructor() {
        this.pagamentoRepository = process.env.NODE_ENV == 'test'
            ? AppDataSourceTest.getRepository(PagamentoEntity)
            : AppDataSource.getRepository(PagamentoEntity);
    }

    async criarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
        return this.pagamentoRepository.save(pagamento);
    }

    async buscarPagamentoPorIdPedido(id: string): Promise<PagamentoEntity | undefined> {
        return this.pagamentoRepository.findOne({ where: { idPedido: id } });
    }

    async atualizarPagamentoStatus(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
        return this.pagamentoRepository.save(pagamento);
    }

}