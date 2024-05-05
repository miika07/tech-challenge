import { Repository } from "typeorm";
import { PagamentoRepositoryInterface } from "../../../core/applications/ports/pagamentoRepository";
import { PagamentoEntity } from "../../../core/domain/entities/pagamento";

export class PagamentoRepositoryAdapter implements PagamentoRepositoryInterface {

    private pagamentoRepository: Repository<PagamentoEntity>;

    constructor(pagamentoRepository: Repository<PagamentoEntity>) {
        this.pagamentoRepository = pagamentoRepository;
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